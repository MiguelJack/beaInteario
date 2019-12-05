<?php

// DB table to use
$table = 'kit';
 
// Table's primary key
$primaryKey = 'codigoKit';
 
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'codigoKit', 'dt' => 0 ),
    array( 'db' => 'TX1',  'dt' => 1 ),
    array( 'db' => 'RX1',   'dt' => 2 ),
    array( 'db' => 'RX3', 'dt' => 3 ),
    array( 'db' => 'TX3', 'dt' => 4 )

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