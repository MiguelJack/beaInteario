$( document ).ready(function() {
    cargarCategorias();
});

var arrayEmpresa = [];
var arrayEmpresaNombre = [];
var arrayUser = [];
var arrayInstalacion = [];
var tablaInstalacion;

function cargarCategorias(){
	var salida = '<select class="form-control" tabindex="0" id="sCategoria" onclick="cargarOpciones();">';  
    salida += '<option value="0">Tecnico</option>';
    salida += '<option value="1">Empresa</option>';
    salida += "</select>";
    $("#cbCategoria").html(salida);
    cargarOpciones();
}

function cargarOpciones(){
	var opcion;
	switch (document.getElementById('sCategoria').selectedIndex){
		case 0:
			opcion = "cargarUsuarios";
			break;
		case 1:
			opcion = "cargarEmpresas";
			break;
		default:
			break;
	}
	var parametros = {
        opcion : opcion
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuestacargarOpciones    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarOpciones(r){
	switch (document.getElementById('sCategoria').selectedIndex){
		case 0:
			cargarTecnicos(r);
			break;
		case 1:
			cargarEmpresas(r);
			break;
		default:
			break;
	}
}

function cargarEmpresas(r){
	try{
	    var doc = JSON.parse(r);
	    var salida = '<select class="form-control" tabindex="-1" id="sOpciones" onclick="cargarInstalaciones();">';  
	    salida += '<option disabled selected value=0>Escoja una opcion</opcion>';  
	    $("#cbOpcion").html("");                
	    for (var i = 0; i < doc.length; i++) {
	        var j = i;
	        var obj = doc[i];
	        salida += '<option value="'+i+'">'+obj.Nombre+'</option>';
	        arrayEmpresa[i] = obj.ID;
	        arrayEmpresaNombre[i] = obj.Nombre;
	    }
	    salida += "</select>";
	    $("#cbOpcion").html(salida);
	}catch(e){
        alert('No hay empresas registradas en el sistema');
        document.getElementById('sOpciones').value = -1;
    }
}

function cargarTecnicos(r){
    try{
        var doc = JSON.parse(r);
        var salida = '<select class="form-control" tabindex="-1" id="sOpciones" onclick="cargarInstalaciones();">';   
        salida += '<option disabled selected value=0>Escoja una opcion</opcion>';                  
        $("#cbOpcion").html("");
        for (var i = 0; i < doc.length; i++) {
            var j = i;
            var obj = doc[i];
            salida += '<option value="'+i+'">'+obj.nombre+" "+obj.apellido1+" "+obj.apellido2+'</option>';
            arrayUser[i] = obj.user;
        }
        salida += "</select>";
        $("#cbOpcion").html(salida);
    }catch(e){
        alert('No hay tecnicos registrados en el sistema');
        document.getElementById('sOpciones').value = -1;
    }
}

function cargarInstalaciones(){
	var opcion;
	switch (document.getElementById('sCategoria').selectedIndex){
		case 0:
			opcion = "cargarInstalacionesTecnico";
			id = arrayUser[document.getElementById('sOpciones').selectedIndex -1]
			break;
		case 1:
			opcion = "cargarInstalacionesEmpresa";
			id = arrayEmpresa[document.getElementById('sOpciones').selectedIndex -1]
			break;
		default:
			break;
	}
	var parametros = {
        opcion : opcion,
        id : id
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuestacargarInstalaciones    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarInstalaciones(r){
	if (document.getElementById('sOpciones').selectedIndex != 0) {
	    var doc = JSON.parse(r); 
	    if (doc.length != 0) {          
	        tablaInstalacion = $('#tablaInstalacion').DataTable();
	        tablaInstalacion.clear();
	        for (var i = 0; i < doc.length; i++) {
	            var obj = doc[i]; 
	            arrayInstalacion[i] = obj.ID;
	            tablaInstalacion.row.add([
	                obj.Tecnico+" "+obj.apellido1+" "+obj.apellido2,
	                obj.Empresa,
	                obj.Placa,
	                obj.codigoKit+" "+obj.TX1+" "+obj.RX1+" "+obj.RX3+" "+obj.TX3,
	                obj.Fecha
	            ]).draw(false);
	        }
	    }else{
	        alert("No hay instalaciones programadas");
	        limpiar();
	    }
	}
}

function limpiar(){
	document.getElementById('sOpciones').selectedIndex = -1;
	try{
		tablaInstalacion.clear();
		tablaInstalacion.draw();
	}catch(e){

	}
}