'use strict';

function Command( screen, path )
{
    var history = /^ *history *;?$/;
    var clear   = /^ *clear *;?$/;
    var help    = /^ *help *;?$/;
    var date    = /^ *date *;?$/;
    var df      = /^ *df *;?$/;
    var bc      = /^ *BC=(#[a-f0-9]{3,6})? *;?$/i;
    var fs      = /^ *FS=([1-9][0-9])? *;?$/;

    // storing each command as the history of the terminal
    this.histories = [];
    this.h_index   = 0;

    // for checking if a command is valid or NOT
    this.check = function( command )
    {
        if( clear.exec( command ) )
        {
            this.clear();
        }
        else
        if( df.exec( command ) )
        {
            this.df();
        }
        else
        if( history.exec( command ) )
        {
            this.history();
        }
        else
        if( bc.exec( command ) )
        {
            var color = bc.exec( command )[ 1 ];
            if( color === undefined  )
            {
                screen.background();
                text( 'reset to default' );
                screen.newline();
            }
            else
            {
                screen.background( color );
            }
        }
        else
        if( fs.exec( command ) )
        {
            var size = fs.exec( command )[ 1 ];
            if( size === undefined )
            {
                screen.font_size();
                text( 'reset to default' );
                screen.newline();
                text( 'Range is from 10 to 99. Default is 15px.' );
                screen.newline();
            }
            else
            {
                screen.font_size( size );
            }
        }
        else
        if( date.exec( command ) )
        {
            text( Date() );
            screen.newline();
        }
        else
        if( help.exec( command ) )
        {
            this.help();
        }
        else
        if( command !== '' )
        {
            text( command + ': command not found' );
            screen.newline();
        }
    }

    // handle Alter key
    this.alter = function( char )
    {
        switch( char )
        {
            // Alter + l: off/on console.log()
            case 'l':
            if( enable_log === true )
            {
                console.log( 'console log was disabled.' );
                enable_log = false;
            }
            else
            {
                console.log( 'console log was enabled.' );
                enable_log = true;
            }
            break;

            // open new tab and goes to my githup account
            case 'g':
            window.open( 'https://github.com/k-five', '_blank').focus();
            break;

            // open new tab and goes to source code on github.com
            case 'L':
            license();
            screen.hide_cursor();
            screen.prompt( path.get() );
            screen.add( 'SPAN', 'row' );
            screen.cursor();
            screen.newline();
            break;

            case 's':
            window.open( 'https://github.com/k-five/jsMyAdmin', '_blank').focus();
            break;

            // go to the top
            case 't':
            window.scrollTo( 0, 0 );
            break;

            // go to the bottom
            case 'b':
            window.scrollTo( 0, document.body.scrollHeight );
            break;

            default:
            break;
        }
    }

    // handle Control + key
    this.control = function( char )
    {
        switch( char )
        {
            // clear the screen
            case 'l':
            screen.clear()
            screen.prompt( path.get() );
            screen.add( 'SPAN', 'row', screen.line_buffer );
            screen.cursor();
            screen.newline();

            // set init.js
            if( enable_log )
            {
                console.log( 'clear the screen with Control + L' );
            }
            break;

            // print help, equivalent to type: help
            case 'h':
            this.help();

            screen.hide_cursor();
            screen.prompt( path.get() );
            screen.add( 'SPAN', 'row' );
            screen.cursor();
            screen.newline();
            break;

            default:
            break;
        }
    }

    this.shift = function( char )
    {

    }

    this.clear = function()
    {
        screen.clear()

        screen.prompt( path.get() );
        screen.add( 'SPAN', 'row' );
        screen.cursor();
        screen.newline();

        if( enable_log )
        {
            console.log( 'clear the screen with clear command' );
        }

    }

    // for teasing monospace fonts family
    this.df = function()
    {
        var df =
            [
                'Filesystem     1K-blocks     Used Available Use% Mounted on',
                'udev             1011376        0   1011376   0% /dev',
                'tmpfs             206316     8956    197360   5% /run',
                '/dev/sda3      196730180 25927424 160786400  14% /',
                'tmpfs            1031568      596   1030972   1% /dev/shm',
                'tmpfs               5120        4      5116   1% /run/lock',
                'tmpfs            1031568        0   1031568   0% /sys/fs/cgroup',
                'tmpfs             206316       60    206256   1% /run/user/1000'
            ];

        print( df );
    }

    this.history = function()
    {
        var length = this.histories.length;

        if( length > 0 )
        {
            var index = 0;
            while( index < length )
            {
                text( ( index + 1 ) + ': ' + this.histories[ index ] );

                screen.newline();
                ++index;
            }
        }
    }

    this.help = function()
    {
        var h =
            [
                'cmd:     arg:     des:',
                '......................',
                'BC=      Yes      set/reset Background Color',
                'FS=      Yes      set/reset Font Size',
                'df       No       dumpy file-system report',
                'date     No       print date in GMT',
                'help     No       print (this) help',
                'clear    No       clear the screen',
                'history  No       print all entered commands',
                '',
                'login    Yes      for login into an account',
                'exit     No       exit from current logged in',
                'table    Yes      an alias for [select * from table-name]',
                'For others, press "Tab" to see them',
                '',
                'some shortcuts:',
                '..................',
                'Control + l       clear the screen',
                'Control + h       print help',
                'Alter   + t       go to the top',
                'Alter   + b       go to the bottom',
                'Alter   + l       enable/disable console.log()',
                'Alter   + s       source code on the github.com',
                'Alter   + L       print license (= Alter + Shift + l)',
            ];

        print( h );

        var guide = doc.id( 'guide' );
        if( guide !== null )
        {
            doc.id( 'terminal' ).removeChild( guide );
        }

        var copyright = doc.id( 'copyright' );
        if( copyright === null )
        {
            copyright = document.createElement( 'SPAN' );
            copyright.innerHTML = '<p id="copyright">help: ctrl-h | top: alt-t | bottom: alt-b</p>'
            // copyright.innerHTML = '<p id="copyright">help: ctrl-h | top: alt-t | bottom: alt-b</br>jsMyAdmin Copyright &copy; '
                // + ( ( Date().toString().split( ' ' ) )[3] )
                // + ' Shakiba <sup><a href="https://github.com/k-five/jsMyAdmin" target="_blank">source</a></sup></p>';
            document.body.appendChild( copyright );
        }
    }

    function license()
    {
        var l =
            [
                '▒█▀▄▀█ ▀█▀ ▀▀█▀▀',
                '▒█▒█▒█ ▒█░ ░▒█░░',
                '▒█░░▒█ ▄█▄ ░▒█░░',
                'jsMyAdmin copyright (C) 2018 Shakiba',
                'https://github.com/k-five/jsMyAdmin',
            ];

        print( l );
    }

    function text( string, class_name )
    {
        var span = document.createElement( 'SPAN' );

        var contents = document.createTextNode( string );
        span.appendChild( contents );

        doc.id( 'terminal' ).appendChild( span );
        span.classList.add( ( ( class_name === undefined ) ? 'text' : class_name ) );
    }

    function print( contents )
    {
        var length = contents.length;
        var index = 0;

        while( index < length )
        {
            text( contents[ index ] );
            screen.newline();
            ++index;
        }
    }
}
console.log( 'Command.js was loaded.' );
