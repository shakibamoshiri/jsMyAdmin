"use strict";

function Table()
{
    var njson = 0;
    var ntable = 0;
    var nth = 0;
    var ntr = 0;
    var ntd = 0;

    this.init = function ()
    {
        njson = 0;
        ntable = 0;
        nth = 0;
        ntr = 0;
        ntd = 0;
    }

    this.prepare = function()
    {
        var div = document.createElement( 'DIV' );
        doc.id( 'terminal' ).appendChild( div );
        div.classList.add( 'json' );
        ++njson;
    }

    this.create = function ( tag, class_name, to, text )
    {
        if( text === undefined )
        {
            text = '';
        }

        switch( tag )
        {
            case 'TABLE':
            var table = document.createElement( tag );
            table.border = '0';
            doc.class( to )[ njson - 1 ].appendChild( table );
            table.classList.add( class_name );
            ++ntable;
            break;

            case 'TR':
            var tr = document.createElement( tag );
            doc.class( to )[ ntable - 1 ].appendChild( tr );
            tr.classList.add( class_name );
            ++ntr;
            break;

            case 'TH':
            var th = document.createElement( tag );
            doc.class( to )[ ntr - 1 ].appendChild( th );

            var contents = document.createTextNode( text );
            th.appendChild( contents );

            th.classList.add( class_name );
            ++nth;
            break;

            case 'TD':
            var table = doc.class( 'table' )[ ntable - 1 ];
            table.border = '1';
            var td = document.createElement( tag );

            var contents = document.createTextNode( text );
            td.appendChild( contents );

            doc.class( to )[ ntr - 1 ].appendChild( td );
            td.classList.add( class_name );
            ++ntd;
            break;
        }
    }
}
console.log( 'Table.js was loaded.' );
