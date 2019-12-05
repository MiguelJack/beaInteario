<?php

// DB table to use
$table = <<<EOT
 (
    SELECT 
        c.cod, 
        c.lote,
        c.fechaRegistro,
        c.tipo_componente,
        c.Estado,
        c.IMEI,
        t.nombre
    FROM componentes c 
    INNER JOIN tipo_componente t ON c.tipo_componente = t.id

 ) temp
EOT;
 
// Table's primary key
$primaryKey = 'cod';
 
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'cod', 'dt' => 0 ),
    array( 'db' => 'nombre',  'dt' => 1 ),
    array( 'db' => 'lote',   'dt' => 2 ),
    array( 'db' => 'fechaRegistro', 'dt' => 3 ),
    array( 'db' => 'Estado', 'dt' => 4 ),
    array( 'db' => 'IMEI', 'dt' => 5 ),
    array( 'db' => 'tipo_componente', 'dt' => 6 )

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