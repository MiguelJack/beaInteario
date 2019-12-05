<?php

// DB table to use
$table = <<<EOT
 (
    SELECT 
        placa, 
        nombre,
        ID_Empresa
    FROM bus 

 ) temp
EOT;
 
// Table's primary key
$primaryKey = 'placa';
 
$columns = array(
    array( 'db' => 'placa', 'dt' => 0 ),
    array( 'db' => 'nombre',  'dt' => 1 ),
    array( 'db' => 'ID_Empresa',  'dt' =>  2)
);
 
// SQL server connection information
$sql_details = array(
    'user' => 'root',
    'pass' => '',
    'db'   => 'bea',
    'host' => '127.0.0.1'
);
 

 
require( 'ssp.class.php' );
 
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);