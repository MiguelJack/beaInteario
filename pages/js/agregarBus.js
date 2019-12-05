$( document ).ready(function() {
    cargarEmpresas();
});

var arrayEmpresa = [];

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
	var salida = '<select class="form-control" tabindex="-1" id="sEmpresa">';                   
	$("#cbEmpresa").html("");
	for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.Nombre+'</option>';
        arrayEmpresa[i] = obj.ID;
        //console.log(arrayfamiliaridad[i]);
    }
    salida += "</select>";
    $("#cbEmpresa").html(salida);
}

function agregarBus(){
    var id = arrayEmpresa[document.getElementById('sEmpresa').selectedIndex];
    var parametros = {
        opcion : "agregarBus",
        txtPlaca: $('#txtPlaca').val(),
        txtNombre: $('#txtNombre').val(),
        id : id
    };

    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuestaagregarBus    // Función que se ejecuta cuando el servidor responde
                          );
}

function siRespuestaagregarBus(r){
    limpiar();
    alert(r);
}

function limpiar(){
    document.getElementById('txtNombre').value = "";
    document.getElementById('txtPlaca').value = "";
}

$( "#busForm" ).submit(function( event ) {
    agregarBus();
    return false;
});