<?php

// DB table to use
$table = 'sim';
 
// Table's primary key
$primaryKey = 'numeroTelefono';
 
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'numeroTelefono', 'dt' => 0 ),
    array( 'db' => 'pin',  'dt' => 1 ),
    array( 'db' => 'puk',   'dt' => 2 ),
    array( 'db' => 'codigo', 'dt' => 3 ),
    array( 'db' => 'fechaRegistro', 'dt' => 4 ),
    array( 'db' => 'Estado', 'dt' => 5 )

);
 
// SQL server connection information
$sql_details = array(
    'user' => 'root',
    'pass' => '',
    'db'   => 'bea',
    'host' => '127.0.0.1'
);
 
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
 
require( 'ssp.class.php' );
 
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);