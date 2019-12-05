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

	case 'revisarComponente':
		$componente = $_POST['componente'];
		$mysqli->query("SET @componente  = " . "'" . $mysqli->real_escape_string($componente) . "'");
		$salida = "";
		$resultado = $mysqli->query("CALL revisarExistenciaComponente(@componente)");
		$data=$resultado->fetch_array();
		$total = $data['total'];
		$mysqli->close();
		if($total != 0) // si entra quiere decir que el componente existe pasa a comprobar si se esta usando
		{
			$mysqli2 = new mysqli($servername, $username, $password,$DBName);
			$mysqli2->query("SET @componente  = " . "'" . $mysqli2->real_escape_string($componente) . "'");
			$resultado2 = $mysqli2->query("CALL revisarUsoComponente(@componente)");
			$data2=$resultado2->fetch_array();
			$total2 = $data2['total'];
			$mysqli2->close();
			if($total2 != 0) // si entra quiere decir que el componente esta en uso
			{
				$salida = 'uso';
			}else{
				$salida = 'existe';
			}
		}else{
			$salida = 'nuevo';

		}

		echo $salida;
	break;

	case 'agregarBarraBase':

		$serie = $_POST['serie'];
		$kit = $_POST['kit'];
		$lote = $_POST['lote'];
		$fecha = $_POST['fecha'];
		$tipo = $_POST['tipo'];

		$mysqli->query("SET @serie  = " . "'" . $mysqli->real_escape_string($serie) . "'");
		$mysqli->query("SET @kit  = " . "'" . $mysqli->real_escape_string($kit) . "'");
		$mysqli->query("SET @lote  = " . "'" . $mysqli->real_escape_string($lote) . "'");
		$mysqli->query("SET @fecha  = " . "'" . $mysqli->real_escape_string($fecha) . "'");
		$mysqli->query("SET @tipo  = " . "'" . $mysqli->real_escape_string($tipo) . "'");


		if(!$mysqli->query("CALL crearBarraBase(@serie,@kit,@lote,@fecha,@tipo)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo al agregar barra');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Barra agregada";
	break;

	case 'agregarTX1':

		$serie = $_POST['serie'];


		$mysqli->query("SET @serie  = " . "'" . $mysqli->real_escape_string($serie) . "'");

		if(!$mysqli->query("CALL crearBarraTX1(@serie)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo al crear campos a la barra TX1');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componentes agregados a la barra TX1";
	break;

	case 'editarTX1':

		$serie = $_POST['serie'];
		$ktx = $_POST['ktx'];
		$modem = $_POST['modem'];
		$pro1 = $_POST['pro1'];
		$pro2 = $_POST['pro2'];
		$max1 = $_POST['max1'];
		$max2 = $_POST['max2'];

		$mysqli->query("SET @serie  = " . "'" . $mysqli->real_escape_string($serie) . "'");
		
		if($ktx ==""){
			$mysqli->query("SET @ktx  = null");
		}else{
			$mysqli->query("SET @ktx  = " . "'" . $mysqli->real_escape_string($ktx) . "'");
		}

		if($modem ==""){
			$mysqli->query("SET @modem  = null");
		}else{
			$mysqli->query("SET @modem  = " . "'" . $mysqli->real_escape_string($modem) . "'");
		}

		if($pro1 ==""){
			$mysqli->query("SET @pro1  = null");
		}else{
			$mysqli->query("SET @pro1  = " . "'" . $mysqli->real_escape_string($pro1) . "'");
		}

		if($pro2 ==""){
			$mysqli->query("SET @pro2  = null");
		}else{
			$mysqli->query("SET @pro2  = " . "'" . $mysqli->real_escape_string($pro2) . "'");
		}

		if($max1 ==""){
			$mysqli->query("SET @max1  = null");
		}else{
			$mysqli->query("SET @max1  = " . "'" . $mysqli->real_escape_string($max1) . "'");
		}

		if($max2 ==""){
			$mysqli->query("SET @max2  = null");
		}else{
			$mysqli->query("SET @max2  = " . "'" . $mysqli->real_escape_string($max2) . "'");
		}

		if(!$mysqli->query("CALL editarTX1(@serie,@ktx,@modem,@pro1,@pro2,@max1,@max2)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo al agregar componetes a la barra TX1');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componentes agregados a la barra TX1";
	break;


	case 'editarRX':
		$serie = $_POST['serie'];
		$duplex1 = $_POST['duplex1'];
		$duplex2 = $_POST['duplex2'];
		$pro = $_POST['pro'];
		$centroCarga = $_POST['centroCarga'];
		$tar = $_POST['tar'];

		$mysqli->query("SET @serie  = " . "'" . $mysqli->real_escape_string($serie) . "'");

		if($duplex1 ==""){
			$mysqli->query("SET @duplex1  = NULL");
		}else{
			$mysqli->query("SET @duplex1  = " . "'" . $mysqli->real_escape_string($duplex1) . "'");
		}

		if($duplex2 ==""){
			$mysqli->query("SET @duplex2  = NULL");
		}else{
			$mysqli->query("SET @duplex2  = " . "'" . $mysqli->real_escape_string($duplex2) . "'");
		}

		if($pro ==""){
			$mysqli->query("SET @pro  = NULL");
		}else{
			$mysqli->query("SET @pro  = " . "'" . $mysqli->real_escape_string($pro) . "'");
		}

		if($centroCarga ==""){
			$mysqli->query("SET @centroCarga  = NULL");
		}else{
			$mysqli->query("SET @centroCarga  = " . "'" . $mysqli->real_escape_string($centroCarga) . "'");
		}

		if($tar ==""){
			$mysqli->query("SET @tar  = NULL");
		}else{
			$mysqli->query("SET @tar  = " . "'" . $mysqli->real_escape_string($tar) . "'");
		}

		if(!$mysqli->query("CALL editarRX(@serie,@duplex1,@duplex2,@pro,@centroCarga,@tar)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo al editar componetes a la barra');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componentes editados en la barra";
	break;

	case 'agregarRX':
		$serie = $_POST['serie'];

		$mysqli->query("SET @serie  = " . "'" . $mysqli->real_escape_string($serie) . "'");

		if(!$mysqli->query("CALL crearBarraRX(@serie)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400  Fallo al crear campos a la barra');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componentes agregados a la barra";
	break;


	case 'editarTX3':

		$serie = $_POST['serie'];
		$pro1 = $_POST['pro1'];
		$pro2 = $_POST['pro2'];

		$mysqli->query("SET @serie  = " . "'" . $mysqli->real_escape_string($serie) . "'");

		if($pro1 ==""){
			$mysqli->query("SET @pro1  = NULL");
		}else{
			$mysqli->query("SET @pro1  = " . "'" . $mysqli->real_escape_string($pro1) . "'");
		}

		if($pro2 ==""){
			$mysqli->query("SET @pro2  = NULL");
		}else{
			$mysqli->query("SET @pro2  = " . "'" . $mysqli->real_escape_string($pro2) . "'");
		}


		if(!$mysqli->query("CALL editarTX3(@serie,@pro1,@pro2)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo al agregar componetes a la barra');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componentes agregados a la barra";
	break;

	case 'agregarTX3':

		$serie = $_POST['serie'];

		$mysqli->query("SET @serie  = " . "'" . $mysqli->real_escape_string($serie) . "'");


		if(!$mysqli->query("CALL crearBarraTX3(@serie)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo al crear campos a la barra');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componentes agregados a la barra";
	break;

	case 'crearKit':
		$kit = $_POST['kit'];
		$TX1 = $_POST['TX1'];
		$RX1 = $_POST['RX1'];
		$RX3 = $_POST['RX3'];
		$TX3 = $_POST['TX3'];

		$mysqli->query("SET @kit  = " . "'" . $mysqli->real_escape_string($kit) . "'");

		if($TX1 ==""){
			$mysqli->query("SET @TX1  = NULL");
		}else{
			$mysqli->query("SET @TX1  = " . "'" . $mysqli->real_escape_string($TX1) . "'");
		}

		if($RX1 ==""){
			$mysqli->query("SET @RX1  = NULL");
		}else{
			$mysqli->query("SET @RX1  = " . "'" . $mysqli->real_escape_string($RX1) . "'");
		}

		if($RX3 ==""){
			$mysqli->query("SET @RX3  = NULL");
		}else{
			$mysqli->query("SET @RX3  = " . "'" . $mysqli->real_escape_string($RX3) . "'");
		}

		if($TX3 ==""){
			$mysqli->query("SET @TX3  = NULL");
		}else{
			$mysqli->query("SET @TX3  = " . "'" . $mysqli->real_escape_string($TX3) . "'");
		}
		if(!$mysqli->query("CALL crearKit(@kit,@TX1,@RX1,@RX3,@TX3)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Fallo al crear kit');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componentes agregados a la barra";
	break;
	case  'cargarBarra':
		$serie = $_POST['serie'];
		$mysqli->query("SET @serie  = " . "'" . $mysqli->real_escape_string($serie) . "'");
		$resultado = $mysqli->query("CALL cargarBarra(@serie)");
		$json = array();
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
	    echo json_encode($json);
	break;
	default:
		# code...
		break;
}


?>