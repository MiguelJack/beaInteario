$( document ).ready(function() {
    cargarEmpresas();
});

var arrayEmpresa = [];
var arrayEmpresaNombre = [];
var arrayBuses = [];
var tablaBuses;

function cargarEmpresas(){
	var parametros = {
		opcion : "cargarEmpresas"
	}

	var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
	                     parametros,    	                       
	                     siRespuestacargarEmpresas    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarEmpresas(r){
	var doc = JSON.parse(r);
	var salida = '<select class="form-control" tabindex="-1" id="sEmpresa" onclick="cargarEmpresa();" required>'; 
    salida += '<option disabled selected value>Escoja una opcion</opcion>';                   
	$("#cbEmpresa").html("");
	for (var i = 0; i < doc.length; i++) {
        var j = i+1;
        var obj = doc[i];
        salida += '<option value="'+j+'">'+obj.Nombre+'</option>';
        arrayEmpresa[i] = obj.ID;
        arrayEmpresaNombre[i] = obj.Nombre;
    }
    salida += "</select>";
    $("#cbEmpresa").html(salida);
}

function cargarEmpresa(){
    var id=1;
    if (document.getElementById('sEmpresa').selectedIndex != 0) {
        id = arrayEmpresa[document.getElementById('sEmpresa').selectedIndex-1];    
    }
    var parametros = {
        opcion : "cargarEmpresa",
        id : id
    };

    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuestacargarEmpresa    // Función que se ejecuta cuando el servidor responde
                          ); 
}

function siRespuestacargarEmpresa(r){
    var doc = JSON.parse(r);         
    var obj = doc[0];     
    document.getElementById('txtTelefono').value = obj.Telefono;
    document.getElementById('txtCorreo').value = obj.Correo;
    document.getElementById('txtDireccion').value = obj.Direccion;
    cargarBuses();
}

function cargarBuses(){
    if (document.getElementById('sEmpresa').selectedIndex != 0) {
        var id = arrayEmpresa[document.getElementById('sEmpresa').selectedIndex-1];    
        var parametros = {
            opcion : "mostrarBuses",
            id : id
        };

        // Realizar la petición
        var post = $.post(
                              "php/mysql.php",    // Script que se ejecuta en el servidor
                              parametros,                              
                              siRespuestacargarBuses    // Función que se ejecuta cuando el servidor responde
                              ); 
    }
}

function siRespuestacargarBuses(r){
    try{
        var doc = JSON.parse(r);             
        tablaBuses = $('#tablaBuses').DataTable();
        tablaBuses.clear();
        for (var i = 0; i < doc.length; i++) {
            var obj = doc[i]; 
            arrayBuses[i] = obj.Placa;
            tablaBuses.row.add([
                obj.Placa,
                obj.Nombre,
                '<button class="btn btn-danger" onclick="mostrarBus('+i+')" >Mostrar</button>'
            ]).draw(false);
        }
    }catch(e){
        alert("La empresa "+arrayEmpresaNombre[document.getElementById('sEmpresa').selectedIndex-1]+" no tiene buses registrados");
        document.getElementById('sEmpresa').value = 0;
        limpiar();
    }
}

function mostrarBus(busID){
    localStorage.setItem("busPlaca",arrayBuses[busID]);
    localStorage.setItem("empresaID",arrayEmpresa[document.getElementById('sEmpresa').selectedIndex]);
    setTimeout("location.href='mostrarBus.html'",0);
}

function limpiar(){
    document.getElementById('txtTelefono').value = "";
    document.getElementById('txtCorreo').value = "";
    document.getElementById('txtDireccion').value = "";
    tablaBuses.clear();
    tablaBuses.draw();
}
