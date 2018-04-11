"use strict";

// function Sql( screen, path, mytable )
function Sql()
{
    var login  = /^ *login *(?:(\w+)  *(\w+)  *([^ ]+)  *(\w+)) *;?$/i;
    var exit   = /^ *exit *;?$/;
    var table  = /^ *table *(\w+) *;?$/;

    var table_list_flag = false;
    var table_list = [];

    var address = '';
    var username = '';
    var password = '';
    var database = '';

    var connection = false;

    this.check = function( line )
    {
        if( enable_log )
        {
            console.log( 'sql.check: "' + line + '"' );
        }

        if( line !== '' )
        {
            if( login.exec( line ) )
            {
                var lists = login.exec( line );
                var length = lists.length;
                var index = 1;
                var args = [ 'command: ', 'address: ', 'username: ', 'password: ', 'database: ' ];
                while( index < length )
                {
                    text( index + ' ' + args[ index ] + lists[ index ] );
                    screen.newline();
                    ++index;
                }
                screen.newline();

                // if users try to log-in when they already have logged-in
                if( connection === true )
                {
                    text( 'you already logged in, to: ' + username + ' ' + database );
                    screen.newline();
                    text( 'for new connection try: exit command and then login' );
                    screen.newline();
                    return false;
                    // this return is to notify the main.js (= case 'Enter': ) when it has to decide either
                    // prints new prompt or not
                    // see: case 'Enter': in main.js
                }
                // if they are not logged-in then
                else
                if( lists[ 4 ] !== undefined && connection === false )
                {
                    address  = encodeURIComponent( lists[ 1 ] );
                    username = encodeURIComponent( lists[ 2 ] );
                    password = encodeURIComponent( lists[ 3 ] );
                    database = encodeURIComponent( lists[ 4 ] );

                    this.login( address, username, password, database );
                    return true;
                }
            }
            else
            if( line.search( /^ *login/ ) === 0 )
            {
                text( 'usage: login [address] [username] [password] [database]' );
                screen.newline();
                return false;
            }
            else
            if( exit.exec( line ) )
            {
                if( this.exit() === true )
                {
                    path.root.table = {};
                    table_list = [];
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            if( line.search( /^ *exit/ ) === 0 )
            {
                text( 'usage: exit' );
                screen.newline();
                return false;
            }
            else
            if( table.exec( line ) )
            {
                var array = table.exec( line );
                // console.log(  table_list );
                if( table_list.length > 0 )
                {
                    if( table_list.includes( array[ 1 ] ) )
                    {
                        var options = '?addr=' + address + '&user=' + username + '&pass=' + password + '&data=' + database;

                        // a convenient way for printing contents of a table, like table t1
                        // which is equal to: select * from t1;
                        request( 'request.php', options , '&query=select * from ' + table_list[ table_list.indexOf( array[ 1 ] ) ] );
                        return true;
                    }
                    if( array[ 1 ] === 'list' )
                    {
                        var index = 0;
                        var length = table_list.length;
                        while( index < length )
                        {
                            text( 1 + index + '. ' + table_list[ index ] );
                            screen.newline();
                            ++index;
                        }
                        return false;
                    }
                    else
                    {
                        text( 'you have these tables:' );
                        screen.newline();
                        text( table_list.join( ', ' ) );
                        screen.newline();
                        return false;
                    }
                }
                else
                {
                    // if( line.search( /^ *table +list/ ) === 0 )
                    if( array[ 1 ] === 'list' )
                    {
                        text( 'list is empty. After logging in, try: "show tables;"' );
                    }
                    else
                    {
                        text( 'table "' + array[ 1 ] +  '" was not found. Perhaps list is empty' );
                    }
                    screen.newline();
                }
                return false;
            }
            else
            if( line.search( /^ *table/ ) === 0 )
            {
                text( 'usage: table ["table-name"|list]' );
                screen.newline();
                return false;
            }
            else
            if( line.endsWith( ';' ) === true )
            {
                // user has NOT logged-in
                if( connection === false )
                {
                    text( 'you have NOT logged in' );
                    screen.newline();
                    text( 'first log in then try a query' );
                    screen.newline();
                    return false;;
                }
                else
                {
                    var options = '?addr=' + address + '&user=' + username + '&pass=' + password + '&data=' + database;

                    if( line.search( /^ *show +tables *; *$/i ) === 0 )
                    {
                        table_list_flag = true;
                    }

                    request( 'request.php', options , '&query=' + line );
                    return true;
                }
            }
            else                                // if /; *#/ was not found
            if( line.split( / +/g ).length >= 2 )
            {
                text( 'sql command requires explicit [;] at the end' );
                screen.newline();
                return false;
            }
            else
            {
                // here we could NOT find the appropriate command so we go to Command.js
                command.check( line );
                return false;
            }
        }
    };

    // handle login command
    this.login = function( addr, user, pass, data )
    {
        var options = '?addr=' + addr + '&user=' + user + '&pass=' + pass + '&data=' + data;

        if( enable_log )
        {
            console.log( 'login.options: ', options );
        }

        request( 'connect.php', options, '' );
    };

    this.exit = function()
    {
        if( connection === true )
        {
            var options = '?exit=true';
            request( 'connect.php', options, '' );
            return true;
        }
        else
        {
            text( 'you have not logged in yet. try to log in' );
            screen.newline();
            return false;
        }
    }

    // for printing text to the screen
    function text( string, class_name )
    {
        var span = document.createElement( 'SPAN' );

        var contents = document.createTextNode( string );
        span.appendChild( contents );

        doc.id( 'terminal' ).appendChild( span );
        span.classList.add( ( ( class_name === undefined ) ? 'text' : class_name ) );
    };

    // request to the web server
    function request( file, options, command )
    {
        var xhr;
        if( window.XMLHttpRequest )
        {
            xhr = new XMLHttpRequest();
        }
        // for IE5 and IE6
        else
        {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function()
        {
            if( this.readyState == 4 && this.status == 200 )
            {
                if( enable_log )
                {
                    console.log( 'status: ' + this.status );
                }

                var json = JSON.parse( this.responseText );

                // we have errors
                if( json[ 0 ][ 0 ] === '' )
                {
                    var row_max = json.length;

                    if( row_max === 1 )
                    {
                        text( json[ 0 ].toString().split( ',' ).join( '' ), 'failure' );
                        screen.newline();
                    }
                    else
                    {
                        for( var row = 0; row < row_max; ++row )
                        {
                            text( json[ row ].toString().split( ',' ).join( '' ), json[ row ][ 2 ] );
                            screen.newline();
                        }
                    }

                    if( enable_log || 1)
                    {
                        console.log( 'sql connection:', json );
                    }

                    var login_result = json[ row_max - 1 ];
                    if( login_result[ 0 ] === username && login_result[ 2 ] === database )
                    {
                        // reset pwd for new user-name and database name
                        path.pwd = [];
                        connection = true;
                        path.user = '# ';
                        path.pwd.push( username );
                        path.pwd.push( database );
                        text( 'do NOT refresh the page; otherwise you will be logged out!', 'note' );
                        screen.newline();
                    }

                }
                else // after exit
                if( json[ 0 ] === '' )
                {
                    text( json[ 1 ] );
                    path.pwd = [ 'username', 'database' ];
                    connection = false;
                    path.user = '$ ';

                    address = '';
                    username = '';
                    password = '';
                    database = '';

                    screen.newline();
                }
                else
                {
                    if( enable_log )
                    {
                        console.log( 'sql query:', json );
                    }

                    // add div for our table
                    json_table.prepare();

                    // add table tag with class-name: json
                    json_table.create( 'TABLE', 'table', 'json' );

                    // check if any sql error has occurred
                    var query_error = false;
                    var row_max = json.length;

                    // should be at least 2 row in json file
                    if( row_max > 1 )
                    {
                        // iterate over fist dimension
                        for( var row = 0; row < row_max - 1; ++row )
                        {
                            var array = json[ row ];
                            var array_max = array.length;

                            // if there is an error break the for-loop
                            if( array[ 0 ] === 'ERROR ' )
                            {
                                query_error = true;
                                text( array[ 1 ] );
                                break;
                            }

                            // if there is no error append tr for each row
                            json_table.create( 'TR', 'tr', 'table' );

                            // iterate over each row TH is for column name
                            // and TD is for regular rows
                            for( var column = 0; column < array_max; ++column )
                            {
                                // the first row is column name of the table
                                if( row == 0 )
                                {
                                    json_table.create( 'TH', 'th', 'tr', array[ column ] );
                                }
                                else
                                {
                                    json_table.create( 'TD', 'td', 'tr', array[ column ] );

                                    // insert table name to table object in Path.js
                                    if( table_list_flag === true )
                                    {
                                        // console.log( 'table-list-flag is true' );
                                        // array[ 0 ] is name of tables
                                        table_list.push( array[ 0 ] );
                                    }
                                }
                            }
                        } // end of for-loop

                        screen.newline();
                        if( table_list_flag === true )
                        {
                            var index = 0;
                            var  max = table_list.length;
                            while( index < max )
                            {
                                path.root.table[ table_list[ index ] ] = 'table-name';
                                path.root.select[ table_list[ index ] ] = 'table-name';
                                path.root.insert[ table_list[ index ] ] = 'table-name';
                                path.root.update[ table_list[ index ] ] = 'table-name';
                                path.root.delete[ table_list[ index ] ] = 'table-name';

                                ++index;
                            }
                            table_list_flag = false;
                        }
                    } // end of: if( row_max > 1 )

                    // when an error has occurred we do not print $mysqli->affected_rows
                    // but when we have no errors so we also have:
                    // 1. X, row[s] in set
                    // 2. Query OK, X row[s] affected
                    if( query_error === false )
                    {
                        // single print
                        // text( json[ row_max - 1 ] );
                        //
                        // print in multiline usually 2 lines
                        // for errors splits words but for row-in-set and Query-OK has no effect
                        var errors = json[ row_max - 1 ].join ( '' ).split( '; ' );
                        var length = errors.length;
                        var index = 0;
                        while( index < length )
                        {
                            text( errors[ index ] );
                            screen.newline();
                            ++index;
                        }
                    }
                }

                screen.hide_cursor();
                screen.prompt( path.get() );
                screen.add( 'SPAN', 'row' );
                screen.cursor();
                screen.newline();

                if( enable_log )
                {
                    console.log(  this.responseText );
                    console.log( 'respond type:', this.responseType );
                    console.log( 'respond URL', this.responseURL );
                    console.log( 'status TEXT', this.statusText );
                }
            } // end of: if( this.readyState == 4 && this.status == 200 )
        }; // end of: xhr.onreadystatechange = function()

        xhr.open( 'GET', './php/' + file + options + command , true );
        xhr.send();
    }
}
console.log( 'Sql.js was loaded.' );
