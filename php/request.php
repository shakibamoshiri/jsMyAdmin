<?php

/* define( 'br', '<br />' );
 * define( 'newline', "\n" );
 * */

include( 'connect.php' );

// when we are here it means connection is "true" and we have logged in
// so we are ready to try a query
if( isset( $_REQUEST[ 'query' ] ) )
{
    $query =  $_REQUEST[ 'query' ];

    // $query = "SELECT * from t1";
    // $query = "show tables;";
    /* $pattern = '/^ *select /i';*/

    // store column name of a table in there variable
    $column_name = [];
    if( $result = $mysqli->query( $query ) )
    {
        // pman mysqli_query: Performs a query on the database
        // Returns FALSE on failure.
        // For successful SELECT, SHOW, DESCRIBE or EXPLAIN queries mysqli_query(3) will return a mysqli_result object.
        // For other successful queries  mysqli_query(3)  will return TRUE.

        // Thus when the return value is "false" it means we have result-set
        if( is_bool( $result ) === false )
        {
            // get field information for all columns
            // here we only care about column-name
            while ( $field_info = $result->fetch_field() )
            {
                array_push( $column_name, $field_info->name );
            }

            // store all columns name of a table
            // $colum_name is an array here
            $json[] = $column_name;

            // then fetch associative array for the rest of a table
            while( $row = $result->fetch_array( MYSQLI_NUM ) )
            {
                // earh $row is an array
                $json[] = $row;
            }

            $affected_row = $mysqli->affected_rows;
            $json [] = [ $affected_row , ( $affected_row > 1 ? " rows" : " row" ) . " in set" ];

            // free result set
            $result->free();
        }
        else // for DELETE, INSERT, etc
        {
            // Query OK, 1 row affected
            // Query OK, 1 row affected
            // Query OK, 2 rows affected
            $affected_row = $mysqli->affected_rows;
            $json [] = [ "Query OK", " ". $affected_row . ( $affected_row > 1 ? " rows" : " row" ) . " affected" ];
        }
    }
    else
    {
        // ERROR xxxx
        $json[] = [ "ERROR " . $mysqli->errno, " " . $mysqli->error ];
    }

    echo json_encode( $json );
} // end of isset

$mysqli->close();
exit();

?>
