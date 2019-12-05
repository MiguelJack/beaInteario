<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$DBName = "bea";

//conecta
$mysqli = new mysqli($servername, $username, $password,$DBName);
$mysqli->set_charset("utf8");
if(!$mysqli) {
    header('HTTP/1.1 400 Bad Request');
    die();
}

$opcion = $_POST['opcion'];

switch ($opcion) {

	case  'cargarTipoComponente':
		$resultado = $mysqli->query("CALL cargarTiposComponente()");
		$json = array();
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
	    echo json_encode($json);
	break;
	case 'agregarComponente':
		$codigo = $_POST['txtCodigo'];
		$fecha = $_POST['txtFecha'];
		$estado = $_POST['txtEstado'];
		$lote = $_POST['txtlote'];
		$imei = $_POST['txtIMEI'];
		$tipo = $_POST['txtTipoComponente'];
		$mysqli->query("SET @codigo  = " . "'" . $mysqli->real_escape_string($codigo) . "'");
		$mysqli->query("SET @fecha  = " . "'" . $mysqli->real_escape_string($fecha) . "'");
		$mysqli->query("SET @estado  = " . "'" . $mysqli->real_escape_string($estado) . "'");
		$mysqli->query("SET @lote  = " . "'" . $mysqli->real_escape_string($lote) . "'");
		$mysqli->query("SET @imei  = " . "'" . $mysqli->real_escape_string($imei) . "'");
		$mysqli->query("SET @tipo  = " . "'" . $mysqli->real_escape_string($tipo) . "'");

		if(!$mysqli->query("CALL agregarComponente(@codigo,@estado,@fecha,@lote,@tipo,@imei)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 El componente ya existe');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componente agregado";
	break;
	case 'editarComponente':
		$codigo = $_POST['txtCodigo'];
		$fecha = $_POST['txtFecha'];
		$estado = $_POST['txtEstado'];
		$lote = $_POST['txtlote'];
		$imei = $_POST['txtIMEI'];
		$tipo = $_POST['txtTipoComponente'];
		$mysqli->query("SET @codigo  = " . "'" . $mysqli->real_escape_string($codigo) . "'");
		$mysqli->query("SET @fecha  = " . "'" . $mysqli->real_escape_string($fecha) . "'");
		$mysqli->query("SET @estado  = " . "'" . $mysqli->real_escape_string($estado) . "'");
		$mysqli->query("SET @lote  = " . "'" . $mysqli->real_escape_string($lote) . "'");
		$mysqli->query("SET @imei  = " . "'" . $mysqli->real_escape_string($imei) . "'");
		$mysqli->query("SET @tipo  = " . "'" . $mysqli->real_escape_string($tipo) . "'");

		if(!$mysqli->query("CALL editarComponente(@codigo,@estado,@fecha,@lote,@tipo,@imei)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo editar componente');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componente editado";
	break;
	case 'eliminarComponente':
		$codigo = $_POST['txtCodigo'];
		$mysqli->query("SET @codigo  = " . "'" . $mysqli->real_escape_string($codigo) . "'");

		if(!$mysqli->query("CALL eliminarComponente(@codigo)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo eliminar componente');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componente eliminado";
	break;

	default:
		# code...
		break;
}


?>