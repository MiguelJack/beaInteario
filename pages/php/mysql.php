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

	case 'agregarEmpresa':
		$nombre = $_POST['txtNombre'];
		$telefono = $_POST['txtTelefono'];
		$correo = $_POST['txtCorreo'];
		$direccion = $_POST['txtDireccion'];
		$mysqli->query("SET @nombre  = " . "'" . $mysqli->real_escape_string($nombre) . "'");
		$mysqli->query("SET @telefono  = " . "'" . $mysqli->real_escape_string($telefono) . "'");
		$mysqli->query("SET @correo  = " . "'" . $mysqli->real_escape_string($correo) . "'");
		$mysqli->query("SET @direccion  = " . "'" . $mysqli->real_escape_string($direccion) . "'");
		if(!$mysqli->query("CALL agregarEmpresa (@nombre,@telefono,@correo,@direccion)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Es posible que la empresa ya exista');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Empresa agregada";
	break;

	case  'cargarEmpresas':
		$resultado = $mysqli->query("CALL cargarEmpresas()");
		$json = array();
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case  'cargarEmpresa':
		$id = $_POST['id'];
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		$resultado = $mysqli->query("CALL cargarEmpresa (@id)");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case 'editarEmpresa':
		$id = $_POST['id'];
		$nombre = $_POST['txtNombre'];
		$telefono = $_POST['txtTelefono'];
		$correo = $_POST['txtCorreo'];
		$direccion = $_POST['txtDireccion'];
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		$mysqli->query("SET @nombre  = " . "'" . $mysqli->real_escape_string($nombre) . "'");
		$mysqli->query("SET @telefono  = " . "'" . $mysqli->real_escape_string($telefono) . "'");
		$mysqli->query("SET @correo  = " . "'" . $mysqli->real_escape_string($correo) . "'");
		$mysqli->query("SET @direccion  = " . "'" . $mysqli->real_escape_string($direccion) . "'");
		if(!$mysqli->query("CALL editarEmpresa (@id,@nombre,@telefono,@correo,@direccion)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Es posible que la empresa ya exista');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Empresa actualizada";
	break;

	case 'agregarBus':
		$placa = $_POST['txtPlaca'];
		$nombre = $_POST['txtNombre'];
		$id = $_POST['id'];
		$mysqli->query("SET @placa  = " . "'" . $mysqli->real_escape_string($placa) . "'");
		$mysqli->query("SET @nombre  = " . "'" . $mysqli->real_escape_string($nombre) . "'");
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		if(!$mysqli->query("CALL agregarBus (@placa,@nombre,@id)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Es posible que ya exista un bus con la misma placa');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Bus agregado";
	break;
	
	case  'cargarBuses':
		$resultado = $mysqli->query("CALL cargarBuses()");
		$json = array();
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case  'cargarBus':
		$placa = $_POST['placa'];
		$mysqli->query("SET @placa  = " . "'" . $mysqli->real_escape_string($placa) . "'");
		$resultado = $mysqli->query("CALL cargarBus (@placa)");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case 'editarBus':
		$placa = $_POST['placa'];
		$nombre = $_POST['txtNombre'];
		$id = $_POST['id'];
		$mysqli->query("SET @placa  = " . "'" . $mysqli->real_escape_string($placa) . "'");
		$mysqli->query("SET @nombre  = " . "'" . $mysqli->real_escape_string($nombre) . "'");
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		if(!$mysqli->query("CALL editarBus (@placa,@nombre,@id)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Es posible que el bus ya exista');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Bus actualizado";
	break;

	case  'filtrarBuses':
		$id = $_POST['id'];
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		$resultado = $mysqli->query("CALL filtrarBuses (@id)");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case  'filtrarBusesNoKit':
		$id = $_POST['id'];
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		$resultado = $mysqli->query("CALL filtrarBusesNoKit (@id)");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case  'obtenerBusesNoKit':
		$resultado = $mysqli->query("CALL obtenerBusesNoKit ()");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case  'obtenerPass':
		$user = $_POST['txtUser'];
		$pass = $_POST['txtPass'];
		$mysqli->query("SET @user  = " . "'" . $mysqli->real_escape_string($user) . "'");
		$mysqli->query("SET @pass  = " . "'" . $mysqli->real_escape_string($pass) . "'");
		$resultado = $mysqli->query("CALL obtenerPass (@user,@pass)");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case 'agregarUsuario':
		$nombre = $_POST['txtNombre'];
		$apellidoUno = $_POST['txtApellidoUno'];
		$apellidoDos = $_POST['txtApellidoDos'];
		$user = $_POST['txtUser'];
		$pass = $_POST['txtPass'];
		$telefono = $_POST['txtTelefono'];
		$correo = $_POST['txtCorreo'];
		$mysqli->query("SET @nombre  = " . "'" . $mysqli->real_escape_string($nombre) . "'");
		$mysqli->query("SET @apellidoUno  = " . "'" . $mysqli->real_escape_string($apellidoUno) . "'");
		$mysqli->query("SET @apellidoDos  = " . "'" . $mysqli->real_escape_string($apellidoDos) . "'");
		$mysqli->query("SET @user  = " . "'" . $mysqli->real_escape_string($user) . "'");
		$mysqli->query("SET @pass  = " . "'" . $mysqli->real_escape_string($pass) . "'");
		$mysqli->query("SET @telefono  = " . "'" . $mysqli->real_escape_string($telefono) . "'");
		$mysqli->query("SET @correo  = " . "'" . $mysqli->real_escape_string($correo) . "'");
		if(!$mysqli->query("CALL agregarUsuario (@nombre,@apellidoUno,@apellidoDos,@user,@pass,@telefono,@correo)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Es posible que el usuario ya exista');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Tecnico agregado";
	break;

	case 'editarUsuario':
		$nombre = $_POST['txtNombre'];
		$apellidoUno = $_POST['txtApellidoUno'];
		$apellidoDos = $_POST['txtApellidoDos'];
		$user = $_POST['txtUser'];
		$pass = $_POST['txtPass'];
		$telefono = $_POST['txtTelefono'];
		$correo = $_POST['txtCorreo'];
		$mysqli->query("SET @nombre  = " . "'" . $mysqli->real_escape_string($nombre) . "'");
		$mysqli->query("SET @apellidoUno  = " . "'" . $mysqli->real_escape_string($apellidoUno) . "'");
		$mysqli->query("SET @apellidoDos  = " . "'" . $mysqli->real_escape_string($apellidoDos) . "'");
		$mysqli->query("SET @user  = " . "'" . $mysqli->real_escape_string($user) . "'");
		$mysqli->query("SET @pass  = " . "'" . $mysqli->real_escape_string($pass) . "'");
		$mysqli->query("SET @telefono  = " . "'" . $mysqli->real_escape_string($telefono) . "'");
		$mysqli->query("SET @correo  = " . "'" . $mysqli->real_escape_string($correo) . "'");
		if(!$mysqli->query("CALL editarUsuario (@nombre,@apellidoUno,@apellidoDos,@user,@pass,@telefono,@correo)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Es posible que el usuario ya exista');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Tecnico actualizado";
	break;

	case  'cargarUsuario':
		$user = $_POST['user'];
		$mysqli->query("SET @user  = " . "'" . $mysqli->real_escape_string($user) . "'");
		$resultado = $mysqli->query("CALL cargarUsuario (@user)");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case 'hacerAdmin':
		$user = $_POST['txtUser'];
		$mysqli->query("SET @user  = " . "'" . $mysqli->real_escape_string($user) . "'");
		if(!$mysqli->query("CALL hacerAdmin (@user)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Ha ocurrido un error');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Un tecnico ha sido promovido a administrador";
	break;

	case 'quitarAdmin':
		$user = $_POST['txtUser'];
		$mysqli->query("SET @user  = " . "'" . $mysqli->real_escape_string($user) . "'");
		if(!$mysqli->query("CALL quitarAdmin (@user)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Ha ocurrido un error');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Se le ha revocado a un administrador los permisos";
	break;

	case  'mostrarBuses':
		$id = $_POST['id'];
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		$resultado = $mysqli->query("CALL mostrarBuses (@id)");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case  'cargarKit':
		$placa = $_POST['placa'];
		$mysqli->query("SET @placa  = " . "'" . $mysqli->real_escape_string($placa) . "'");
		$resultado = $mysqli->query("CALL cargarKit (@placa)");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case  'cargarBarra':
		$barra = $_POST['barra'];
		$mysqli->query("SET @barra  = " . "'" . $mysqli->real_escape_string($barra) . "'");
		$resultado = $mysqli->query("CALL cargarBarra (@barra)");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case  'cargarComponente':
		$codigo = $_POST['codigo'];
		$mysqli->query("SET @codigo  = " . "'" . $mysqli->real_escape_string($codigo) . "'");
		$resultado = $mysqli->query("CALL cargarComponente(@codigo)");
		$json = array();
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
	    echo json_encode($json);
	break;

	case  'cargarKitsDisponibles':
		$resultado = $mysqli->query("CALL obtenerKitsDisponibles ()");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case  'cargarUsuarios':
		$resultado = $mysqli->query("CALL obtenerUsuarios ()");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case 'programarInstalacion':
		$placa = $_POST['placa'];
		$kit = $_POST['kit'];
		$tecnico = $_POST['tecnico'];
		$txtFecha = $_POST['txtFecha'];
		$mysqli->query("SET @placa  = " . "'" . $mysqli->real_escape_string($placa) . "'");
		$mysqli->query("SET @kit  = " . "'" . $mysqli->real_escape_string($kit) . "'");
		$mysqli->query("SET @tecnico  = " . "'" . $mysqli->real_escape_string($tecnico) . "'");
		$mysqli->query("SET @txtFecha  = " . "'" . $mysqli->real_escape_string($txtFecha) . "'");
		if(!$mysqli->query("CALL programarInstalacion (@placa,@kit,@tecnico,@txtFecha)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Ha ocurrido un error');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Instalacion Programada";
	break;

	case 'asignarKit':
		$placa = $_POST['placa'];
		$kit = $_POST['kit'];
		$mysqli->query("SET @placa  = " . "'" . $mysqli->real_escape_string($placa) . "'");
		$mysqli->query("SET @kit  = " . "'" . $mysqli->real_escape_string($kit) . "'");
		if(!$mysqli->query("CALL asignarBus (@placa,@kit)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Ha ocurrido un error');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Kit asignado";
	break;

	case  'cargarComponentes':
		$resultado = $mysqli->query("CALL obtenerComponentesDisponibles ()");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case  'cargarSimDisponibles':
		$resultado = $mysqli->query("CALL obtenerSimDisponible ()");
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
		echo json_encode($json) ;
	break;

	case 'asignarSim':
		$placa = $_POST['placa'];
		$sim = $_POST['sim'];
		$mysqli->query("SET @placa  = " . "'" . $mysqli->real_escape_string($placa) . "'");
		$mysqli->query("SET @sim  = " . "'" . $mysqli->real_escape_string($sim) . "'");
		if(!$mysqli->query("CALL asignarBus (@placa,@sim)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Ha ocurrido un error');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Sim asignado";
	break;

	case 'programarMantenimiento':
		$tecnico = $_POST['tecnico'];
		$placa = $_POST['placa'];
		$barra = $_POST['barra'];
		$componenteViejo = $_POST['componenteViejo'];
		$componenteNuevo = $_POST['componenteNuevo'];
		$fecha = $_POST['fecha'];
		$mysqli->query("SET @tecnico  = " . "'" . $mysqli->real_escape_string($tecnico) . "'");
		$mysqli->query("SET @placa  = " . "'" . $mysqli->real_escape_string($placa) . "'");
		$mysqli->query("SET @barra  = " . "'" . $mysqli->real_escape_string($barra) . "'");
		$mysqli->query("SET @componenteViejo  = " . "'" . $mysqli->real_escape_string($componenteViejo) . "'");
		$mysqli->query("SET @componenteNuevo  = " . "'" . $mysqli->real_escape_string($componenteNuevo) . "'");
		$mysqli->query("SET @fecha  = " . "'" . $mysqli->real_escape_string($fecha) . "'");
		if(!$mysqli->query("CALL programarMantenimiento (@tecnico,@placa,@barra,@componenteViejo,@componenteNuevo,@fecha)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Ha ocurrido un error');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Mantenimiento Programado";
	break;

	case 'asignarComponente':
		$componenteViejo = $_POST['componenteViejo'];
		$componenteNuevo = $_POST['componenteNuevo'];
		$mysqli->query("SET @componenteViejo  = " . "'" . $mysqli->real_escape_string($componenteViejo) . "'");
		$mysqli->query("SET @componenteNuevo  = " . "'" . $mysqli->real_escape_string($componenteNuevo) . "'");
		if(!$mysqli->query("CALL asignarComponente (@componenteViejo,@componenteNuevo)"))
		{
    		if($mysqli) $mysqli->close(); // Close DB connection
    		header('HTTP/1.1 400 Ha ocurrido un error');
    		die();
		}
		if($mysqli) $mysqli->close();
		echo "Componente asignado";
	break;

	case  'cargarInstalacionesTecnico':
		$id = $_POST['id'];
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		$resultado = $mysqli->query("CALL cargarInstalacionesTecnico(@id)");
		$json = array();
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
	    echo json_encode($json);
	break;

	case  'cargarInstalacionesEmpresa':
		$id = $_POST['id'];
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		$resultado = $mysqli->query("CALL cargarInstalacionesEmpresa(@id)");
		$json = array();
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
	    echo json_encode($json);
	break;

	case  'cargarMantenimientosTecnico':
		$id = $_POST['id'];
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		$resultado = $mysqli->query("CALL cargarMantenimientosTecnico(@id)");
		$json = array();
		while($row = $resultado->fetch_array()){
			$json[] = $row;
		}
	    echo json_encode($json);
	break;

	case  'cargarMantenimientosEmpresa':
		$id = $_POST['id'];
		$mysqli->query("SET @id  = " . "'" . $mysqli->real_escape_string($id) . "'");
		$resultado = $mysqli->query("CALL cargarMantenimientosEmpresa(@id)");
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