<?php

// array for store the result of sql query
$json = [];
$connection = false;

// check for users errors and exit
function user_error_handler( $level, $message, $file, $line, $context )
{
    //$json [] = [ "", "ERROR: level[", $level, "] ", $message, " ", $file, " ", $line, " ", $context ];
    $json [] = [ "", "ERROR: level[", $level, "] ", $message ];
    echo json_encode( $json );
    exit();
}

// check for exception errors and exit
function user_exceptoin_handler( $exception )
{
    $json [] = [ "", "ERROR: exception => ", $exception->getMessage() ];
    echo json_encode( $json );
    exit();
}

set_error_handler( 'user_error_handler' );
set_exception_handler( 'user_exceptoin_handler' );

/* $addr   = 'localhost';
 * $user   = 'user2';
 * $pass   = 'pass2';
 * $data   = 'db2';
 */

// when the command is "exit" then exit
if( isset( $_REQUEST[ 'exit' ] ) )
{
    $json = [ "", "bye" ];
    echo json_encode( $json );
    exit();
}

if( isset( $_REQUEST[ 'query' ] ) )
{
    // when a request contains word: 'query' it means we already checked
    // username and password and database so we let the uses goes to request.php
    $connection = true;
}

$addr = $_REQUEST[ 'addr' ]; // address
$user = $_REQUEST[ 'user' ]; // user-name
$pass = $_REQUEST[ 'pass' ]; // password
$data = $_REQUEST[ 'data' ]; // database

$mysqli = new mysqli( $addr, $user, $pass );

if( $mysqli->connect_error )
{
    $json[] = [ "", "connection: ", "failure" ];
}
else
{
    $json[] = [ "", "connection: ", "success" ];
}

// select a database
$sql_command = "use " . $data;

if( $mysqli->query( $sql_command ) === true )
{
    $json[] = [ "", "select database: ", "success" ];

    // when the select a database is success then we are
    // storing user-name and database name as the last row
    // in our $json variable, then Command.js will check if
    // they are the same as username and database variable or not
    // if yes then we will know that connection is correct and
    // we let the user try a query
    $json[] = [ $user, " ", $data ]; // Ex: user1, ' ', db1
    // for more see:
    // xhr.onreadystatechange = function() in Command.js
}
else
{
    $json[] = [ "", "select database: ", "failure" ];
}


if( $connection === false )
{
    echo json_encode( $json );
    $mysqli->close();
    exit();
}
// when the connection is "true" empty $josn variable
$json = [];

// from this point we are going to use "request.php"
?>
