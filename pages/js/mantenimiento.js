$( document ).ready(function() {
    cargarEmpresas();
    cargarUsuarios();
    cargarComponentes();
});

var arrayEmpresa = [];
var arrayEmpresaNombre = [];
var arrayBus = [];
var arrayUser = [];
var arrayKit = [];
var arrayComponente = [];
var tablaComponentes;
var barra = 'TX1';

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
    var salida = '<select class="form-control" tabindex="-1" id="sEmpresa" onclick="filtrarBuses();">';  
    salida += '<option value="-1">Todos</option>';                  
    $("#cbEmpresaFiltrar").html("");
    for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.Nombre+'</option>';
        arrayEmpresa[i] = obj.ID;
        arrayEmpresaNombre[i] = obj.Nombre;
    }
    salida += "</select>";
    $("#cbEmpresa").html(salida);
    filtrarBuses();
}

function cargarBuses(){
    var parametros = {
        opcion : "cargarBuses"
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuestacargarBuses    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarBuses(r){
    var doc = JSON.parse(r);
    var salida = '<select class="form-control" tabindex="-1" id="sBus" onclick="cargarKit();">';    
    salida += '<option disabled selected value=0>Escoja una opcion</opcion>';                
    $("#cbBus").html("");
    for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.Placa+"  "+obj.Nombre+'</option>';
        arrayBus[i] = obj.Placa;
        //console.log(arrayfamiliaridad[i]);
    }
    salida += "</select>";
    $("#cbBus").html(salida);
}

function filtrarBuses(){
    var index = document.getElementById('sEmpresa').selectedIndex;
    if (index == 0) {
        cargarBuses();
    } else {
        index = index -1;
        var id = arrayEmpresa[index];
        var parametros = {
            opcion : "filtrarBuses",
            id : id
        }

        var post = $.post(
                             "php/mysql.php",    // Script que se ejecuta en el servidor
                             parametros,                               
                             siRespuestafiltrarBuses    // Función que se ejecuta cuando el servidor responde
                             );
        }
}

function siRespuestafiltrarBuses(r){
    try{
        arrayBus = [];
        removeOptions('sBus');
        //console.log("largo "+doc.length);
        var doc = JSON.parse(r);
        var salida = '<select class="form-control" tabindex="-1" id="sBus" onclick="cargarKit();">';  
        salida += '<option disabled selected value=0>Escoja una opcion</opcion>';                  
        $("#cbBus").html("");
        for (var i = 0; i < doc.length; i++) {
            var j = i;
            var obj = doc[i];
            salida += '<option value="'+i+'">'+obj.Placa+"  "+obj.Nombre+'</option>';
            arrayBus[i] = obj.Placa;
            //console.log(arrayfamiliaridad[i]);
        }
        salida += "</select>"; 
        $("#cbBus").html(salida);
    }catch(e){
        alert("La empresa "+ arrayEmpresaNombre[document.getElementById('sEmpresa').selectedIndex-1] + " no tiene buses disponibles");
        document.getElementById('sEmpresa').value = -1;
        filtrarBuses();
    }
}

function removeOptions(box){
    var selectbox = document.getElementById(box);
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function cargarUsuarios(){
    var parametros = {
        opcion : "cargarUsuarios"
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuestacargarUsuarios    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarUsuarios(r){
    try{
        var doc = JSON.parse(r);
        var salida = '<select class="form-control" tabindex="-1" id="sUser">';   
        salida += '<option disabled selected value=0>Escoja una opcion</opcion>';                  
        $("#cbTecnico").html("");
        for (var i = 0; i < doc.length; i++) {
            var j = i;
            var obj = doc[i];
            salida += '<option value="'+i+'">'+obj.nombre+" "+obj.apellido1+" "+obj.apellido2+'</option>';
            arrayUser[i] = obj.user;
        }
        salida += "</select>";
        $("#cbTecnico").html(salida);
    }catch(e){
        alert('No hay tecnicos registrados en el sistema');
        document.getElementById('sUser').value = -1;
    }
}

function cargarComponentes(){
    var parametros = {
        opcion : "cargarComponentes"
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuestacargarComponentes    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarComponentes(r){
    try{
        var doc = JSON.parse(r);             
        tablaComponentes = $('#tablaComponentes').DataTable();
        tablaComponentes.clear();
        for (var i = 0; i < doc.length; i++) {
            var obj = doc[i]; 
            arrayComponente[i] = obj.cod;
            tablaComponentes.row.add([
                obj.cod,
                obj.lote,
                obj.fechaRegistro,
                obj.Estado,
                obj.IMEI,
                obj.claveCorta,
                obj.claveLarga,
                '<button class="btn btn-danger" onclick="usarComponente(\''+obj.cod+'\')" >Usar</button>'
            ]).draw(false);
        }
    }catch(e){
        alert("No hay componentes disponibles");
    }
}

function cambiarComponente(tipoComponente,cod){
    document.getElementById('txtBarra').value = barra;
    document.getElementById('txtTipoComponente').value = tipoComponente;
    switch(cod){
        case '8kTX1':
            document.getElementById('txtComponenteViejo').value = document.getElementById('8kTX1').value;
            break;
        case 'MODEM':
            document.getElementById('txtComponenteViejo').value = document.getElementById('modemTX1').value;
            break;
        case 'PROTX1':
            document.getElementById('txtComponenteViejo').value = document.getElementById('pro').value;
            break;
        case 'PRO2TX1':
            document.getElementById('txtComponenteViejo').value = document.getElementById('pro2').value;
            break;
        case 'MAXTX1':
            document.getElementById('txtComponenteViejo').value = document.getElementById('inputMAX').value;
            break;
        case 'MAX2TX1':
            document.getElementById('txtComponenteViejo').value = document.getElementById('inputMAX2').value;
            break;
        case 'Duplex1RX1':
            document.getElementById('txtComponenteViejo').value = document.getElementById('duplex1RX1').value;
            break;
        case 'Duplex2RX1':
            document.getElementById('txtComponenteViejo').value = document.getElementById('duplex2RX1').value;
            break;
        case 'PRORX1':
            document.getElementById('txtComponenteViejo').value = document.getElementById('proRX1').value;
            break;
        case 'centroCargaRX1':
            document.getElementById('txtComponenteViejo').value = document.getElementById('centroCargaRX1').value;
            break;
        case 'tarRX1':
            document.getElementById('txtComponenteViejo').value = document.getElementById('tarRX1').value;
            break;
        case 'Duplex1RX2':
            document.getElementById('txtComponenteViejo').value = document.getElementById('duplex1RX2').value;
            break;
        case 'Duplex2RX2':
            document.getElementById('txtComponenteViejo').value = document.getElementById('duplex2RX2').value;
            break;
        case 'PRORX2':
            document.getElementById('txtComponenteViejo').value = document.getElementById('proRX2').value;
            break;
        case 'centroCargaRX2':
            document.getElementById('txtComponenteViejo').value = document.getElementById('centroCargaRX2').value;
            break;
        case 'tarRX2':
            document.getElementById('txtComponenteViejo').value = document.getElementById('tarRX2').value;
            break;
        case 'PRO1TX3':
            document.getElementById('txtComponenteViejo').value = document.getElementById('pro1TX3').value;
            break;
        case 'PRO2TX3':
            document.getElementById('txtComponenteViejo').value = document.getElementById('pro2TX3').value;
            break;
        default:
            break;
    }
}

function usarComponente(cod){
    document.getElementById('txtComponenteNuevo').value = cod;
}

function revisarDatos(){
    if (document.getElementById('sUser').selectedIndex == 0) {
        alert("Debe seleccionar un tecnico");
        return false;
    }else{
        if (document.getElementById('sBus').selectedIndex == 0) {
            alert("Debe seleccionar un bus");
            return false;
        }else{
            if (document.getElementById('txtComponenteViejo').value == "") {
                alert("Debe seleccionar un componente a cambiar");
                return false;
            } else {
                if (document.getElementById('txtComponenteNuevo').value == "") {
                    alert("Debe seleccionar un componente a instalar");
                    return false;
                }else{
                    if (document.getElementById('txtFecha').value == "") {
                        alert("Debe ingresar una fecha");
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function programarMantenimiento(){
    if (revisarDatos()) {
        var barraCod;
        switch (barra){
            case 'TX1':
                barraCod = arrayKit[1];
                break;
            case 'RX1':
                barraCod = arrayKit[2];
                break;
            case 'RX3':
                barraCod = arrayKit[3];
                break;
            case 'TX3':
                barraCod = arrayKit[4];
                break;
            default:
                break;
        }
        var tecnico = arrayUser[document.getElementById('sUser').selectedIndex -1];
        var placa = arrayBus[document.getElementById('sBus').selectedIndex -1];
        var parametros = {
            opcion : "programarMantenimiento",
            tecnico : tecnico,
            placa : placa,
            barra : barraCod,
            componenteViejo : $('#txtComponenteViejo').val(),
            componenteNuevo : $('#txtComponenteNuevo').val(),
            fecha : $('#txtFecha').val()
        };
        var post = $.post(
                                  "php/mysql.php",    // Script que se ejecuta en el servidor
                                  parametros,                              
                                  siRespuestaprogramarMantenimiento    // Función que se ejecuta cuando el servidor responde
                                  );
    }
}

function siRespuestaprogramarMantenimiento(r){
    alert("El mantenimiento ha sido programado");
    asignarComponente();
}

function asignarComponente(){
    var parametros = {
        opcion : "asignarComponente",
        componenteViejo : $('#txtComponenteViejo').val(),
        componenteNuevo : $('#txtComponenteNuevo').val()
    };
    var post = $.post(
                              "php/mysql.php",    // Script que se ejecuta en el servidor
                              parametros,                              
                              siRespuestaasignarComponente    // Función que se ejecuta cuando el servidor responde
                              );  
}

function siRespuestaasignarComponente(r){
    limpiar();
}

function cargarKit(){
    if (document.getElementById('sBus').selectedIndex != 0) {
        placa = arrayBus[document.getElementById('sBus').selectedIndex-1];
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
}

function siRespuestacargarKit(r){
    try{
        var doc = JSON.parse(r);
        var obj = doc[0];
        arrayKit[0] = obj.codigoKit;
        arrayKit[1] = obj.TX1;
        arrayKit[2] = obj.RX1;
        arrayKit[3] = obj.RX3;
        arrayKit[4] = obj.TX3;
        cargarBarras();
    }catch(e){
        alert("El bus con placa "+ arrayBus[document.getElementById('sBus').selectedIndex-1] + " no tiene kit asignado");
        document.getElementById('sBus').value = 0;
    }
}

function cargarBarras(){
    //var salida = '<ul class="nav nav-tabs"><li class="active"><a href="#tabTX1" data-toggle="tab">TX1</a></li><li><a href="#tabRX1" data-toggle="tab">RX1</a></li><li><a href="#tabRX3" data-toggle="tab">RX3</a></li><li><a href="#tabTX3" data-toggle="tab">TX3</a></li></ul><div class="tab-content"><div class="tab-pane fade in active" id="tabTX1"></div><div class="tab-pane fade" id="tabRX1"></div><div class="tab-pane fade" id="tabRX3"></div><div class="tab-pane fade" id="tabTX3"></div></div>';
    for (var i = 1; i <= 4; i++) {
        cargarBarra(arrayKit[i]);
    }
}

function cargarBarra(ID){
    var parametros = {
        opcion : "cargarBarra",
        barra: ID
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuestacargarBarra    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarBarra(r){
    var doc = JSON.parse(r);
    var tipoBarra = doc[0].tipoBarra;
    switch(tipoBarra){
        case '1':
            document.getElementById('serieTX1').value = arrayKit[1];
            document.getElementById('8kTX1').value = doc[0].componenteCod;
            obtenerClaves(doc[0].componenteCod);
            document.getElementById('modemTX1').value = doc[1].componenteCod;
            obtenerIMEI(doc[1].componenteCod);
            document.getElementById('pro').value = doc[2].componenteCod;
            document.getElementById('pro2').value = doc[3].componenteCod;   
            document.getElementById('inputMAX').value = doc[4].componenteCod;   
            document.getElementById('inputMAX2').value = doc[5].componenteCod;
            break;
        case '2':
            document.getElementById('serieRX1').value = arrayKit[2];
            document.getElementById('duplex1RX1').value = doc[0].componenteCod;
            document.getElementById('duplex2RX1').value = doc[1].componenteCod;
            document.getElementById('proRX1').value = doc[2].componenteCod;
            document.getElementById('centroCargaRX1').value = doc[3].componenteCod;
            document.getElementById('tarRX1').value = doc[4].componenteCod;
            break;
        case '3':
            document.getElementById('serieRX2').value = arrayKit[3];
            document.getElementById('duplex1RX2').value = doc[0].componenteCod;
            document.getElementById('duplex2RX2').value = doc[1].componenteCod;
            document.getElementById('proRX2').value = doc[2].componenteCod;
            document.getElementById('centroCargaRX2').value = doc[3].componenteCod;
            document.getElementById('tarRX2').value = doc[4].componenteCod;
            break;
        case '4':
            document.getElementById('serieTX3').value = arrayKit[4];
            document.getElementById('pro1TX3').value = doc[0].componenteCod;
            document.getElementById('pro2TX3').value = doc[1].componenteCod;
            break;
    }
}

function obtenerClaves(codigoComponente){
    var parametros = {
    opcion : "cargarComponente",
    codigo : codigoComponente
    }
    var post = $.post(
                         "php/componentes.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         respuestaObtenerClaves    // Función que se ejecuta cuando el servidor responde
                         );

}


function respuestaObtenerClaves(r){
    var doc = JSON.parse(r);
    document.getElementById('claveCortaTX1').value = doc[0].claveCorta;
    document.getElementById('claveLargaTX1').value = doc[0].claveLarga;
}

function obtenerIMEI(codigoComponente){
    var parametros = {
    opcion : "cargarComponente",
    codigo : codigoComponente
    }
    var post = $.post(
                         "php/componentes.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         respuestaObtenerIMEI    // Función que se ejecuta cuando el servidor responde
                         );

}

function respuestaObtenerIMEI(r){
    var doc = JSON.parse(r);
    document.getElementById('imeiModem').value = doc[0].IMEI;
}

function selectBarra(tipo){
    barra = tipo;
}

function limpiar(){
    barra = 'TX1';
    document.getElementById('txtComponenteViejo').value = "";
    document.getElementById('txtComponenteNuevo').value = "";
    document.getElementById('txtBarra').value = "";
    document.getElementById('txtTipoComponente').value = "";
    document.getElementById('serieTX1').value = "";
    document.getElementById('8kTX1').value = "";
    document.getElementById('claveCortaTX1').value = "";
    document.getElementById('claveLargaTX1').value = "";
    document.getElementById('modemTX1').value = "";
    document.getElementById('imeiModem').value = "";
    document.getElementById('pro').value = "";
    document.getElementById('pro2').value = "";   
    document.getElementById('inputMAX').value = "";   
    document.getElementById('inputMAX2').value = "";
    document.getElementById('serieRX1').value = "";
    document.getElementById('duplex1RX1').value = "";
    document.getElementById('duplex2RX1').value = "";
    document.getElementById('proRX1').value = "";
    document.getElementById('centroCargaRX1').value = "";
    document.getElementById('tarRX1').value = "";
    document.getElementById('serieRX2').value = "";
    document.getElementById('duplex1RX2').value = "";
    document.getElementById('duplex2RX2').value = "";
    document.getElementById('proRX2').value = "";
    document.getElementById('centroCargaRX2').value = "";
    document.getElementById('tarRX2').value = "";
    document.getElementById('serieTX3').value = "";
    document.getElementById('pro1TX3').value = "";
    document.getElementById('pro2TX3').value = "";
    cargarEmpresas();
    cargarComponentes();
    cargarUsuarios();
}