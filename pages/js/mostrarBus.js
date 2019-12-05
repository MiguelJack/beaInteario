var placa = localStorage.getItem("busPlaca");
var empresa = localStorage.getItem("empresaID");

$( document ).ready(function() {
    cargarEmpresas();
});

var arrayBus = [];
var arrayEmpresa = [];
var arrayEmpresaNombre = [];
var tablaBuses;
var codigoKit;

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
	var salida = '<select class="form-control" tabindex="-1" id="sEmpresa" onclick="cargarBuses();">';  
    salida += '<option disabled selected value=0>Escoja una opcion</opcion>';                  
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
    if (empresa.localeCompare("") != 0) {
        setEmpresa(empresa);
        cargarBuses();
    }
}

function cargarBuses(){
    if (document.getElementById('sEmpresa').selectedIndex != 0) {
        var id = arrayEmpresa[document.getElementById('sEmpresa').selectedIndex-1];    
        var parametros = {
            opcion : "filtrarBuses",
            id : id
        }

        var post = $.post(
                             "php/mysql.php",    // Script que se ejecuta en el servidor
                             parametros,                               
                             siRespuestacargarBuses    // Función que se ejecuta cuando el servidor responde
                             );
    }
}

function siRespuestacargarBuses(r){
    try{
        arrayBus = [];
        removeOptions();
        //console.log("largo "+doc.length);
        var doc = JSON.parse(r);
        var salida = '<select class="form-control" tabindex="-1" id="sBus" onclick="cargarBus();">';    
        salida += '<option disabled selected value=0>Escoja una opcion</opcion>';                 
        $("#cbBus").html("");
        for (var i = 0; i < doc.length; i++) {
            var j = i+1;
            var obj = doc[i];
            salida += '<option value="'+j+'">'+obj.Placa+"  "+obj.Nombre+'</option>';
            arrayBus[i] = obj.Placa;
            //console.log(arrayfamiliaridad[i]);
        }
        salida += "</select>"; 
        $("#cbBus").html(salida);
        if (placa.localeCompare("") != 0) {
            setBus(placa);
            cargarBus();
        }
    }catch(e){
        alert("La empresa "+ arrayEmpresaNombre[document.getElementById('sEmpresa').selectedIndex-1] + " no tiene buses registrados");
        document.getElementById('sEmpresa').value = 0;
        limpiar(0);
    }
}

function cargarBus(){
    if (document.getElementById('sBus').selectedIndex != 0) {
        placa = arrayBus[document.getElementById('sBus').selectedIndex-1];
        var parametros = {
            opcion : "cargarBus",
            placa : placa
        };

        // Realizar la petición
        var post = $.post(
                              "php/mysql.php",    // Script que se ejecuta en el servidor
                              parametros,                              
                              siRespuestacargarBus    // Función que se ejecuta cuando el servidor responde
                              );
    } 
}

function siRespuestacargarBus(r){
    var doc = JSON.parse(r);         
    var obj = doc[0];     
    document.getElementById('txtNombre').value = obj.Nombre;
    cargarKit();
}

function cargarKit(){
    var parametros = {
        opcion : "cargarKit",
        placa : placa
    };

    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuestacargarKit    // Función que se ejecuta cuando el servidor responde
                          ); 
}

function siRespuestacargarKit(r){
    try{
        var doc = JSON.parse(r);             
        tablaKit = $('#tablaKit').DataTable();
        tablaKit.clear();
        var obj = doc[0];
        codigoKit = obj.codigoKit;
        tablaKit.row.add([
                'TX1',
                obj.TX1,
                '<button class="btn btn-danger" onclick="mostrarBarra(\''+obj.TX1+'\')" >Mostrar</button>'
            ]).draw(false);
        tablaKit.row.add([
                'RX1',
                obj.RX1,
                '<button class="btn btn-danger" onclick="mostrarBarra(\''+obj.RX1+'\')" >Mostrar</button>'
            ]).draw(false);
        tablaKit.row.add([
                'RX2',
                obj.RX3,
                '<button class="btn btn-danger" onclick="mostrarBarra(\''+obj.RX3+'\')" >Mostrar</button>'
            ]).draw(false);
        tablaKit.row.add([
                'TX3',
                obj.TX3,
                '<button class="btn btn-danger" onclick="mostrarBarra(\''+obj.TX3+'\')" >Mostrar</button>'
            ]).draw(false);
    }catch(e){
        alert("El bus con placa "+ arrayBus[document.getElementById('sBus').selectedIndex-1] + " no tiene kit asignado");
        document.getElementById('sBus').value = 0;
        limpiar(1);
    }
    placa = "";
    localStorage.setItem("busPlaca","");
    localStorage.setItem("empresa","");
}

function setEmpresa(id){
    var index=0;
    for (var i = 0; i <= arrayEmpresa.length; i++) {
        if (id == arrayEmpresa[i]) {
            index = i;
        }
    }
    document.getElementById('sEmpresa').value = index;
}

function setBus(placa){
    var index=0;
    for (var i = 0; i <= arrayBus.length; i++) {
        if (placa == arrayBus[i]) {
            index = i;
        }
    }
    document.getElementById('sBus').value = index+1;
}

function removeOptions(){
    var selectbox = document.getElementById('sBus');
    for(var i = arrayBus.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function limpiar(r){
    if(r==0){
        document.getElementById('sEmpresa').value = 0;
        removeOptions();
        var salida = '<select class="form-control" tabindex="-1" id="sBus" onclick="cargarBus();">';    
        salida += '<option disabled selected value=0>Escoja una opcion</opcion></select>'; 
        $("#cbBus").html(salida);
    }
    document.getElementById('txtNombre').value = "";
    document.getElementById('sBus').value = 0;
    placa="";
    empresa="";
    tablaKit.clear();
    tablaKit.draw();
}

function mostrarBarra(barraID){
    alert(barraID);
    localStorage.setItem("barraCodigo",barraID);
    localStorage.setItem("kitCodigo",codigoKit); 
    setTimeout("location.href='mostrarBarra.html'",0);
}