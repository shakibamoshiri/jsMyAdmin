'use strict';

function Path()
{
    // this.PATH = '/home/guest/bin/';
    this.user = '$ ';
    this.path_delimiter = '::';
    this.pwd =
        [
            'username',
            'database',
        ];

    this.get = function()
    {
        return this.pwd.join( this.path_delimiter ) + this.user;
    }

    // all command and sub-commands
    this.root =
        {
            bin :
            {
                'select'  : 'sql-cmd',
                'update'  : 'sql-cmd',
                'create'  : 'sql-cmd',
                'delete'  : 'sql-cmd',
                'drop'    : 'sql-cmd',
                'show'    : 'sql-cmd',
                'insert'  : 'sql-cmd',
                'alter'   : 'sql-cmd',

                'login'   : 'bash-cmd',
                'exit'    : 'bash-cmd',

                'history' : 'bash-cmd',
                'table'   : 'bash-cmd',
                'clear'   : 'bash-cmd',
                'help'    : 'bash-cmd',
                'date'    : 'bash-cmd',
                'df'      : 'bash-cmd',
                'BC='     : 'bash-cmd',
                'FS='     : 'bash-cmd',
            },

            // it will be initialized after first run of: [show tables;]
            // name of tables is inserted into this object
            table :
            {
                // 'list is empty'   : 'table-name',
            },

            login :
            {
                '127.0.0.1' : 'sql-cmd2',
                'localhost' : 'sql-cmd2',
            },

            select :
            {
                'LOCK IN SHARE MODE' : 'sql-cmd2',
                'SQL_CALC_FOUND_ROWS' : 'sql-cmd2',
                'SQL_BUFFER_RESULT' : 'sql-cmd2',
                'SQL_SMALL_RESULT' : 'sql-cmd2',
                'SQL_BIG_RESULT' : 'sql-cmd2',
                'HIGH_PRIORITY' : 'sql-cmd2',
                'STRAIGHT_JOIN' : 'sql-cmd2',
                'CHARACTER SET' : 'sql-cmd2',
                'INTO DUMPFILE' : 'sql-cmd2',
                'SQL_NO_CACHE' : 'sql-cmd2',
                'INTO OUTFILE' : 'sql-cmd2',
                'DISTINCTROW' : 'sql-cmd2',
                'WITH ROLLUP' : 'sql-cmd2',
                'FOR UPDATE' : 'sql-cmd2',
                'DISTINCT' : 'sql-cmd2',
                'SQL_CACHE' : 'sql-cmd2',
                'PARTITION' : 'sql-cmd2',
                'PROCEDURE' : 'sql-cmd2',
                'GROUP BY' : 'sql-cmd2',
                'OFFSET' : 'sql-cmd2',
                'HAVING' : 'sql-cmd2',
                'LIMIT' : 'sql-cmd2',
                'WHERE' : 'sql-cmd2',
                'FROM' : 'sql-cmd2',
                'DESC' : 'sql-cmd2',
                'INTO' : 'sql-cmd2',
                'ALL' : 'sql-cmd2',
                'ASC' : 'sql-cmd2',
            },

            insert :
            {
                'HIGH_PRIORITY' : 'sql-cmd2',
                'LOW_PRIORITY' : 'sql-cmd2',
                'PARTITION' : 'sql-cmd2',
                'DUPLICATE' : 'sql-cmd2',
                'DEFAULT' : 'sql-cmd2',
                'UPDATE' : 'sql-cmd2',
                'SELECT' : 'sql-cmd2',
                'VALUES' : 'sql-cmd2',
                'IGNORE' : 'sql-cmd2',
                'VALUE' : 'sql-cmd2',
                'INTO' : 'sql-cmd2',
                'SET' : 'sql-cmd2',
                'KEY' : 'sql-cmd2',
                'ON' : 'sql-cmd2',
            },

            delete :
            {
                'LOW_PRIORITY' : 'sql-cmd2',
                'PARTITION' : 'sql-cmd2',
                'ORDER BY' : 'sql-cmd2',
                'IGNORE' : 'sql-cmd2',
                'QUICK' : 'sql-cmd2',
                'WHERE' : 'sql-cmd2',
                'LIMIT' : 'sql-cmd2',
                'FROM' : 'sql-cmd2',

            },

            update :
            {
                'LOW_PRIORITY' : 'sql-cmd2',
                'ORDER BY' : 'sql-cmd2',
                'DEFAULT' : 'sql-cmd2',
                'IGNORE' : 'sql-cmd2',
                'LIMIT' : 'sql-cmd2',
                'WHERE' : 'sql-cmd2',
                'SET' : 'sql-cmd2',
            },

            show :
            {
                'SPROCEDURE STATUS' : 'sql-cmd2',
                'CREATE PROCEDURE' : 'sql-cmd2',
                'CREATE DATABASE' : 'sql-cmd2',
                'CREATE FUNCTION' : 'sql-cmd2',
                'FUNCTION STATUS' : 'sql-cmd2',
                'RELAYLOG EVENTS' : 'sql-cmd2',
                'CREATE TRIGGER' : 'sql-cmd2',
                'PROCEDURE CODE' : 'sql-cmd2',
                'CHARACTER SET' : 'sql-cmd2',
                'BINLOG EVENTS' : 'sql-cmd2',
                'MASTER STATUS' : 'sql-cmd2',
                'FUNCTION CODE' : 'sql-cmd2',
                'CREATE TABLE' : 'sql-cmd2',
                'COLUMNS FROM' : 'sql-cmd2',
                'CREATE VIEW' : 'sql-cmd2',
                'SLAVE HOSTS' : 'sql-cmd2',
                'PROCESSLIST' : 'sql-cmd2',
                'FOR CHANNEL' : 'sql-cmd2',
                'CREATE EVEN' : 'sql-cmd2',
                'OPEN TABLES' : 'sql-cmd2',
                'GRANTS FOR' : 'sql-cmd2',
                'INDEX FROM' : 'sql-cmd2',
                'PRIVILEGES' : 'sql-cmd2',
                'VARIABLES' : 'sql-cmd2',
                'COLLATION' : 'sql-cmd2',
                'DATABASES' : 'sql-cmd2',
                'FOR QUERY' : 'sql-cmd2',
                'WARNINGS' : 'sql-cmd2',
                'TRIGGERS' : 'sql-cmd2',
                'PROFILES' : 'sql-cmd2',
                'STORAGE' : 'sql-cmd2',
                'PLUGINS' : 'sql-cmd2',
                'SESSION' : 'sql-cmd2',
                'ENGINES' : 'sql-cmd2',
                'PROFILE' : 'sql-cmd2',
                'SESSION' : 'sql-cmd2',
                'MASTER' : 'sql-cmd2',
                'ENGINE' : 'sql-cmd2',
                'GLOBAL' : 'sql-cmd2',
                'STATUS' : 'sql-cmd2',
                'ERRORS' : 'sql-cmd2',
                'EVENTS' : 'sql-cmd2',
                'STATUS' : 'sql-cmd2',
                'TABLES' : 'sql-cmd2',
                'OFFSET' : 'sql-cmd2',
                'STATUS' : 'sql-cmd2',
                'BINARY' : 'sql-cmd2',
                'GLOBAL' : 'sql-cmd2',
                'STATUS' : 'sql-cmd2',
                'TABLE' : 'sql-cmd2',
                'LIMIT' : 'sql-cmd2',
                'MUTEX' : 'sql-cmd2',
                'SLAVE' : 'sql-cmd2',
                'FROM' : 'sql-cmd2',
                'FULL' : 'sql-cmd2',
                'LOGS' : 'sql-cmd2',
                'IN' : 'sql-cmd2',
            },

            create :
            {
                'LOGFILE GROUP' : 'sql-cmd2',
                'FUNCTION UDF' : 'sql-cmd2',
                'TABLESPACE' : 'sql-cmd2',
                'PROCEDURE' : 'sql-cmd2',
                'FUNCTION' : 'sql-cmd2',
                'DATABASE' : 'sql-cmd2',
                'TRIGGER' : 'sql-cmd2',
                'SERVER' : 'sql-cmd2',
                'EVENT' : 'sql-cmd2',
                'INDEX' : 'sql-cmd2',
                'TABLE' : 'sql-cmd2',
                'USER' : 'sql-cmd2',
                'VIEW' : 'sql-cmd2',
            },

            alter :
            {
                'LOGFILE group' : 'sql-cmd2',
                'tablespace' : 'sql-cmd2',
                'PROCEDURE' : 'sql-cmd2',
                'DATABASE' : 'SQL-cmd2',
                'FUNCTION' : 'sql-cmd2',
                'INSTANCE' : 'sql-cmd2',
                'SERVER' : 'sql-cmd2',
                'TABLE' : 'sql-cmd2',
                'EVENT' : 'sql-cmd2',
                'USER' : 'sql-cmd2',
                'VIEW' : 'sql-cmd2',
            },

            drop :
            {
                'FUNCTION udf'  : 'sql-cmd2',
                'TABLESPACE'  : 'sql-cmd2',
                'PROCEDURE'  : 'sql-cmd2',
                'FUNCTION'  : 'sql-cmd2',
                'database'  : 'sql-cmd2',
                'TRIGGER'  : 'sql-cmd2',
                'SERVER'  : 'sql-cmd2',
                'EVENT'  : 'sql-cmd2',
                'INDEX'  : 'sql-cmd2',
                'TABLE'  : 'sql-cmd2',
                'USER'  : 'sql-cmd2',
                'VIEW'  : 'sql-cmd2',
            },
        };

    // return current working directory
    this.cwd = function( name )
    {
        if( name === undefined )
        {
            return this.pwd [ this.pwd.length - 1 ];
        }
        else
        {
            this.pwd.push( name );
            return this.pwd [ this.pwd.length - 1 ];
        }
    }
}
console.log( 'Path.js was loaded.' );
