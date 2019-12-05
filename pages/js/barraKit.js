var listTipo = [];
var tablaComponente;
var tablaKit;
var componenteActual;
var editar = false;
var componentesAct = [];
$( document ).ready(function() {

    tablaComponente = $('#tablaComponentes').DataTable( {
        "scrollX": true,
        "columnDefs": [
            {
                "targets": [ 6 ],
                "visible": false,
                "searchable": false
            }
        ],
        "processing": true,
        "serverSide": true,
        "ajax": "php/tablas/tablaComponentes.php"
        
    } );


    tablaKit = $('#tablKits').DataTable( {
        "scrollX": true,
        "columns": [
            null,
            null,
            null,
            null,
            null,
            {
              "data": null,
              "defaultContent": '<button type="button" class="btn btn-primary" onclick="cargarEditarKit(this)" >Editar</button>'
            }
        ],
        "processing": true,
        "serverSide": true,
        "ajax": "php/tablas/tablaKit.php"
        
    } );

});



function revisarComponente(inputComponente){
    inputComponente.value = inputComponente.value.trim();
    componenteActual = inputComponente;
    $(inputComponente).parent().removeClass('has-error has-edit has-success has-warning'); 

    if(!componentesAct.includes(inputComponente.value)){
        if(inputComponente.value.trim() != ""){
            var parametros = {
                opcion : "revisarComponente",
                componente : inputComponente.value
                }                


            var post = $.post(
                                 "php/kit.php",    // Script que se ejecuta en el servidor
                                 parametros,                               
                                 respuestaRevisarComponente    // Función que se ejecuta cuando el servidor responde
                                 );
        }
    }else{
        $(componenteActual).parent().addClass('has-warning');
    }


}

function respuestaRevisarComponente(r){
    $(componenteActual).parent().removeClass('has-error has-edit has-success has-warning'); 
    switch(r) {
        case 'nuevo':
            $(componenteActual).parent().addClass('has-success');
            break;
        case 'uso':
            $(componenteActual).parent().addClass('has-error');
            break;
        case 'existe':
            $(componenteActual).parent().addClass('has-edit');
            break;
    }
}

function revisar8K(inputComponente){

    inputComponente.value = inputComponente.value.trim();
    componenteActual = inputComponente;
    $(componenteActual).parent().removeClass('has-error has-edit has-success has-warning');
    document.getElementById('claveCortaTX1').value = "";
    document.getElementById('claveLargaTX1').value = "";
    document.getElementById('claveCortaTX1').disabled = false;
    document.getElementById('claveLargaTX1').disabled = false;
    
    if(!componentesAct.includes(inputComponente.value)){
        if(inputComponente.value.trim() != ""){
            var parametros = {
            opcion : "revisarComponente",
            componente : inputComponente.value
            }
            var post = $.post(
                                 "php/kit.php",    // Script que se ejecuta en el servidor
                                 parametros,                               
                                 respuestaRevisarComponente8K    // Función que se ejecuta cuando el servidor responde
                                 );
        }
    }else{
        $(componenteActual).parent().addClass('has-warning');
        obtenerClaves(componenteActual.value);
    }
}

function respuestaRevisarComponente8K(r){
    //Primero limpia el class y los datos
    $(componenteActual).parent().removeClass('has-error has-edit has-success'); 
    document.getElementById('claveCortaTX1').value = "";
    document.getElementById('claveLargaTX1').value = "";
    document.getElementById('claveCortaTX1').disabled = false;
    document.getElementById('claveLargaTX1').disabled = false;

    //cambia el color dependiendo del estado del codigo
    switch(r) {
        case 'nuevo':
            $(componenteActual).parent().addClass('has-success');
            break;
        case 'uso':
            $(componenteActual).parent().addClass('has-error');
            break;
        case 'existe':
            $(componenteActual).parent().addClass('has-edit');
            
            obtenerClaves(componenteActual.value);
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
    for (var i = 0; i < doc.length; i++) {
        var obj = doc[i];
        document.getElementById('claveCortaTX1').value = obj.claveCorta;
        document.getElementById('claveLargaTX1').value = obj.claveLarga;
        document.getElementById('claveCortaTX1').disabled = true;
        document.getElementById('claveLargaTX1').disabled = true;
    }
}

function revisarIMEI(inputComponente){

    inputComponente.value = inputComponente.value.trim();
    componenteActual = inputComponente;
    $(componenteActual).parent().removeClass('has-error has-edit has-success has-warning');
    document.getElementById('imeiModem').value = "";
    document.getElementById('imeiModem').disabled = false;

    if(!componentesAct.includes(inputComponente.value)){
        if(inputComponente.value.trim() != ""){
            var parametros = {
            opcion : "revisarComponente",
            componente : inputComponente.value
            }
            var post = $.post(
                                 "php/kit.php",    // Script que se ejecuta en el servidor
                                 parametros,                               
                                 respuestaRevisarComponenteIMEI    // Función que se ejecuta cuando el servidor responde
                                 );
        }
    }else{
        $(componenteActual).parent().addClass('has-warning');        
        obtenerIMEI(componenteActual.value);
    }
}

function respuestaRevisarComponenteIMEI(r){
    //Primero limpia el class y los datos
    $(componenteActual).parent().removeClass('has-error has-edit has-success'); 
    document.getElementById('imeiModem').value = "";
    document.getElementById('imeiModem').disabled = false;

    //cambia el color dependiendo del estado del codigo
    switch(r) {
        case 'nuevo':
            $(componenteActual).parent().addClass('has-success');
            break;
        case 'uso':
            $(componenteActual).parent().addClass('has-error');
            break;
        case 'existe':
            $(componenteActual).parent().addClass('has-edit');
            
            obtenerIMEI(componenteActual.value);
            break;
    }
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
    for (var i = 0; i < doc.length; i++) {
        var obj = doc[i];
        document.getElementById('imeiModem').value = obj.IMEI;
        document.getElementById('imeiModem').disabled = true;
    }
}

function revisarTipo(){
    var tipo = document.getElementById("tipoComponente");
    var codigoTexto = document.getElementById("txtCodigo").value;
    var txt = "";
    var stringBusqueda = ""
    for (var i = 0; i < tipo.length; i++) {        
        stringBusqueda = tipo.options[i].value;
        var isType= codigoTexto.toUpperCase().includes(stringBusqueda);
        if (isType == true){
            tipo.selectedIndex = i;
            revisarIMEI(tipo);        
        }
    }
}

function revisarTipoTexto(texto){
    var tipo = document.getElementById("tipoComponente");
    var txt = "";
    var stringBusqueda = ""
    for (var i = 0; i < tipo.length; i++) {        
        stringBusqueda = tipo.options[i].text;
        var isType= texto.toUpperCase().includes(stringBusqueda.toUpperCase());
        if (isType == true){
            tipo.selectedIndex = i;
            revisarIMEI(tipo);        
        }
    }
}

function revisarEstado(texto){
    var tipo = document.getElementById("listEstado");
    var txt = "";
    var stringBusqueda = ""
    for (var i = 0; i < tipo.length; i++) {        
        stringBusqueda = tipo.options[i].text;
        var isType= texto.toUpperCase().includes(stringBusqueda.toUpperCase());
        if (isType == true){
            tipo.selectedIndex = i;      
        }
    }
}



$( "#kitForm" ).submit(function( event ) {

    var editarBoton = document.getElementById("btnEditarBarra").style.display;
    console.log(editarBoton);
    if(editarBoton=="none"){
        agregarKit();
    }else{
        editarKit();
    }
    return false;
});


function editarKit(){
    if ($('#serieTX1').val().trim() != ""){
        componentesTX1();
    }
    if ($('#serieRX1').val().trim() != ""){
        componentesRX1();
    }
    if ($('#serieRX2').val().trim() != ""){
        componentesRX2();
    }
    if ($('#serieTX3').val().trim() != ""){
        componentesTX3();
    }
    limpiarTodo();


}

function agregarKit(){
    
    if(document.getElementById('serieTX1').value.trim() != ""){

        crearBarraBase($('#serieTX1').val().trim(),$('#numKit').val().trim(),$('#txtLote').val().trim(),
            $('#txtFecha').val().trim(),'1');
        crearBarraTX1($('#serieTX1').val().trim());
        componentesTX1();
    }

    if(document.getElementById('serieRX1').value.trim() != ""){

        crearBarraBase($('#serieRX1').val().trim(),$('#numKit').val().trim(),$('#txtLote').val().trim(),
            $('#txtFecha').val().trim(),'2');
        crearBarraRX($('#serieRX1').val().trim());
        componentesRX1();
    }

    if(document.getElementById('serieRX2').value.trim() != ""){

        crearBarraBase($('#serieRX2').val().trim(),$('#numKit').val().trim(),$('#txtLote').val().trim(),
            $('#txtFecha').val().trim(),'3');
        crearBarraRX($('#serieRX2').val().trim());
        componentesRX2();
    }

    if(document.getElementById('serieTX3').value.trim() != ""){


        crearBarraBase($('#serieTX3').val().trim(),$('#numKit').val().trim(),$('#txtLote').val().trim(),
            $('#txtFecha').val().trim(),'4');
        crearBarraTX3($('#serieTX3').val().trim());
        componentesTX3();

    }
    crearKit($('#numKit').val().trim(),$('#serieTX1').val().trim(),$('#serieRX1').val().trim(),
        $('#serieRX2').val().trim(),$('#serieTX3').val().trim());
    tablaKit.ajax.reload();
    limpiar();
    
}

function componentesTX1(){
    if($(document.getElementById('8kTX1')).parent().hasClass('has-success')){
        agregarComponente($('#8kTX1').val().trim(),"3","",$('#claveCortaTX1').val().trim(),
            $('#claveLargaTX1').val().trim());
    }
    if($(document.getElementById('modemTX1')).parent().hasClass('has-success')){
        agregarComponente($('#modemTX1').val().trim(),"8",$('#imeiModem').val().trim(),"","");
    }
    if($(document.getElementById('tx1PRO1')).parent().hasClass('has-success')){
        agregarComponente($('#tx1PRO1').val().trim(),"7","","","");
    }
    if($(document.getElementById('tx1PRO2')).parent().hasClass('has-success')){
        agregarComponente($('#tx1PRO2').val().trim(),"7","","","");
    }
    if($(document.getElementById('tx1MAX1')).parent().hasClass('has-success')){
        agregarComponente($('#tx1MAX1').val().trim(),"9","","","");
    }
    if($(document.getElementById('tx1MAX2')).parent().hasClass('has-success')){
        agregarComponente($('#tx1MAX2').val().trim(),"9","","","");
    }
    editarBarraTX1($('#serieTX1').val().trim(),$('#8kTX1').val().trim(),$('#modemTX1').val().trim(),
        $('#tx1PRO1').val().trim(),$('#tx1PRO2').val().trim(),$('#tx1MAX1').val().trim(),
        $('#tx1MAX2').val().trim());
}

function componentesRX1(){
    if($(document.getElementById('duplex1RX1')).parent().hasClass('has-success')){
        agregarComponente($('#duplex1RX1').val().trim(),"6","","","");
    }
    if($(document.getElementById('duplex2RX1')).parent().hasClass('has-success')){
        agregarComponente($('#duplex2RX1').val().trim(),"6","","","");
    }
    if($(document.getElementById('proRX1')).parent().hasClass('has-success')){
        agregarComponente($('#proRX1').val().trim(),"7","","","");
    }
    if($(document.getElementById('centroCargaRX1')).parent().hasClass('has-success')){
        agregarComponente($('#centroCargaRX1').val().trim(),"1","","","");
    }
    if($(document.getElementById('tarRX1')).parent().hasClass('has-success')){
        agregarComponente($('#tarRX1').val().trim(),"2","","","");
    }
    editarBarraRX($('#serieRX1').val().trim(),$('#duplex1RX1').val().trim(),$('#duplex2RX1').val().trim(),
            $('#proRX1').val().trim(),$('#centroCargaRX1').val().trim(),$('#tarRX1').val().trim());
}

function componentesRX2(){
    if($(document.getElementById('duplex1RX2')).parent().hasClass('has-success')){
        agregarComponente($('#duplex1RX2').val().trim(),"6","","","");
    }
    if($(document.getElementById('duplex2RX2')).parent().hasClass('has-success')){
        agregarComponente($('#duplex2RX2').val().trim(),"6","","","");
    }
    if($(document.getElementById('proRX2')).parent().hasClass('has-success')){
        agregarComponente($('#proRX2').val().trim(),"7","","","");
    }
    if($(document.getElementById('centroCargaRX2')).parent().hasClass('has-success')){
        agregarComponente($('#centroCargaRX2').val().trim(),"1","","","");
    }
    if($(document.getElementById('tarRX2')).parent().hasClass('has-success')){
        agregarComponente($('#tarRX2').val().trim(),"2","","","");
    }
    editarBarraRX($('#serieRX2').val().trim(),$('#duplex1RX2').val().trim(),$('#duplex2RX2').val().trim(),
            $('#proRX2').val().trim(),$('#centroCargaRX2').val().trim(),$('#tarRX2').val().trim());
}

function componentesTX3(){
    if($(document.getElementById('pro1TX3')).parent().hasClass('has-success')){
        agregarComponente($('#pro1TX3').val().trim(),"6","","","");
    }
    if($(document.getElementById('pro2TX3')).parent().hasClass('has-success')){
        agregarComponente($('#pro2TX3').val().trim(),"6","","","");
    }
    editarBarraTX3($('#serieTX3').val().trim(),$('#pro1TX3').val().trim(),$('#pro2TX3').val().trim());
}

function agregarComponente(codigo,tipo,IMEI,claveCorta,claveLarga){
    var parametros = {
        opcion : "agregarComponente",
        txtCodigo: codigo,
        txtFecha: $('#txtFecha').val(),
        txtEstado: "Bueno",
        txtlote: $('#txtLote').val(),
        txtIMEI: IMEI,
        claveCorta:claveCorta,
        claveLarga:claveLarga,
        txtTipoComponente: tipo
    };
    console.log(parametros);
    // Realizar la petición


    var post = $.ajax({
              type: 'POST',
              url: "php/componentes.php",
              data: parametros,
              success: barraTX1Editada,
              error:function(xhr, status, error) {
                            alert("Error al agregar componente");
                        },
              async:false
            });
    }

function componenteAgregado(r){
        alert(r);
        
}

function crearBarraBase(pSerie,pKit,pLote,pFecha,pTipo){
    var parametros = {
        opcion : "agregarBarraBase",
        serie: pSerie,
        kit: pKit,
        lote: pLote,
        fecha: pFecha,
        tipo: pTipo
    };
    console.log(parametros);
    // Realizar la petición



    var post = $.ajax({
          type: 'POST',
          url: "php/kit.php",
          data: parametros,
          success: barraCreada,
          async:false
        });
    }

function barraCreada(r){
        alert(r);
        
}

function editarBarraTX1(pSerie,pKTX,pModem,pPro1,pPro2,pMax1,pMax2){
    var parametros = {
        opcion : "editarTX1",
        serie: pSerie,
        ktx: pKTX,
        modem: pModem,
        pro1: pPro1,
        pro2: pPro2,
        max1: pMax1,
        max2:pMax2
    };
    console.log("Editar barra");
    console.log(parametros);
    // Realizar la petición
    var post = $.ajax({
              type: 'POST',
              url: "php/kit.php",
              data: parametros,
              success: barraTX1Editada,
              async:false
            });
    }

function barraTX1Editada(r){
        alert(r);
        
}


function editarBarraRX(pSerie,pDuplex1,pDuplex2,pPro,pCentroCarga,pTar){
    var parametros = {
        opcion : "editarRX",
        serie: pSerie,
        duplex1: pDuplex1,
        duplex2: pDuplex2,
        pro: pPro,
        centroCarga: pCentroCarga,
        tar: pTar
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/kit.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          barraRXEditada    // Función que se ejecuta cuando el servidor responde
                          );
    }

function barraRXEditada(r){
        alert(r);
        
}


function editarBarraTX3(pSerie,pPro1,pPro2){
    var parametros = {
        opcion : "editarTX3",
        serie: pSerie,
        pro1: pPro1,
        pro2: pPro2
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/kit.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          barraTX3Editada    // Función que se ejecuta cuando el servidor responde
                          );
    }

function barraTX3Editada(r){
        alert(r);
        
}


function crearBarraTX1(pSerie){
    var parametros = {
        opcion : "agregarTX1",
        serie: pSerie
    };
    console.log("crear barra");
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/kit.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          barraTX1Creada    // Función que se ejecuta cuando el servidor responde
                          );
    }

function barraTX1Creada(r){
        alert(r);
        
}


function crearBarraRX(pSerie){
    var parametros = {
        opcion : "agregarRX",
        serie: pSerie
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/kit.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          barraRXCreada    // Función que se ejecuta cuando el servidor responde
                          );
    }

function barraRXCreada(r){
        alert(r);
        
}


function crearBarraTX3(pSerie){
    var parametros = {
        opcion : "agregarTX3",
        serie: pSerie
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/kit.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          barraTX3Creada    // Función que se ejecuta cuando el servidor responde
                          );
    }

function barraTX3Creada(r){
        alert(r);
        
}



function crearKit(pKit,pSerieTX1,pSerieRX1,pSerieRX3,pSerieTX3){
    var parametros = {
        opcion : "crearKit",
        kit: pKit,
        TX1: pSerieTX1,
        RX1: pSerieRX1,
        RX3: pSerieRX3,
        TX3: pSerieTX3
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/kit.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          kitCreado    // Función que se ejecuta cuando el servidor responde
                          );
    }

function kitCreado(r){
        alert(r);
        
}


function cargarEditarKit(boton){
    limpiarTodo();

    document.getElementById("btnAgregarBarra").style.display="none";
    document.getElementById("btnEditarBarra").style.display="inline-block";

    var data = tablaKit.row( (boton.closest('tr').rowIndex) -1 ).data();

    document.getElementById('numKit').value = data[0];
    document.getElementById('numKit').disabled = true;    
    
        if(data[1]==null){
            disableDiv("divTX1",true);
        }else{
            cargarTX1(data[1]);
        }       

        if(data[2]==null){
            disableDiv("divRX1",true);
        }else{
            cargarRX1(data[2]);
        }    
        
        if(data[3]==null){
            disableDiv("divRX2",true);
        }else{
            cargarRX2(data[3]);
        }

        if(data[4]==null){
            disableDiv("divTX3",true);
        }else{
            cargarTX3(data[4]);
        }
    
        editar =  true;
    }


function cargarTX1(pSerie){

    var parametros = {
        opcion : "cargarBarra",
        serie: pSerie
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/kit.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          tx1Cargada    // Función que se ejecuta cuando el servidor responde
                          );
}

function tx1Cargada(r){
    var doc = JSON.parse(r);
    console.log(doc);
    if(doc.length>0){
        document.getElementById('serieTX1').value = doc[0].barraSerie;
        document.getElementById('serieTX1').disabled = true;
        document.getElementById('txtLote').value = doc[0].kit;
        document.getElementById('txtLote').disabled = true;
        document.getElementById('txtFecha').value = doc[0].fecha;
        document.getElementById('txtFecha').disabled = true;
    }
    for (var i = 0; i < doc.length; i++) {
        var obj = doc[i];
        if(obj.componenteCod != null){
            componentesAct.push(obj.componenteCod);
            switch(obj.pos) {
            case '1':
                document.getElementById('8kTX1').value = String(obj.componenteCod);
                $('#8kTX1').parent().addClass('has-warning');
                revisar8K(document.getElementById('8kTX1'));
                break;
            case '2':
                document.getElementById('modemTX1').value = String(obj.componenteCod);
                $('#modemTX1').parent().addClass('has-warning');
                revisarIMEI(document.getElementById('modemTX1'));
                break;
            case '3':
                document.getElementById('tx1PRO1').value = String(obj.componenteCod);
                $('#tx1PRO1').parent().addClass('has-warning');
                break;
            case '4':
                document.getElementById('tx1PRO2').value = String(obj.componenteCod);
                $('#tx1PRO2').parent().addClass('has-warning');
                break;
            case '5':
                document.getElementById('tx1MAX1').value = String(obj.componenteCod);
                $('#tx1MAX1').parent().addClass('has-warning');
                break;
            case '6':
                document.getElementById('tx1MAX2').value = String(obj.componenteCod);
                $('#tx1MAX2').parent().addClass('has-warning');
                break;
            }
        }
    }
}

function cargarRX1(pSerie){

    var parametros = {
        opcion : "cargarBarra",
        serie: pSerie
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/kit.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          RX1Cargada    // Función que se ejecuta cuando el servidor responde
                          );
}

function RX1Cargada(r){
    var doc = JSON.parse(r);
    console.log(doc);
    if(doc.length>0){
        document.getElementById('serieRX1').value = doc[0].barraSerie;
        document.getElementById('serieRX1').disabled = true;
        document.getElementById('txtLote').value = doc[0].kit;
        document.getElementById('txtLote').disabled = true;
        document.getElementById('txtFecha').value = doc[0].fecha;
        document.getElementById('txtFecha').disabled = true;
    }
    for (var i = 0; i < doc.length; i++) {
        var obj = doc[i];
        if(obj.componenteCod != null){
            componentesAct.push(obj.componenteCod);
            switch(obj.pos) {
            case '1':
                document.getElementById('duplex1RX1').value = String(obj.componenteCod);
                $('#duplex1RX1').parent().addClass('has-warning');
                break;
            case '2':
                document.getElementById('duplex2RX1').value = String(obj.componenteCod);
                $('#duplex2RX1').parent().addClass('has-warning');
                break;
            case '3':
                document.getElementById('proRX1').value = String(obj.componenteCod);
                $('#proRX1').parent().addClass('has-warning');
                break;
            case '4':
                document.getElementById('centroCargaRX1').value = String(obj.componenteCod);
                $('#centroCargaRX1').parent().addClass('has-warning');
                break;
            case '5':
                document.getElementById('tarRX1').value = String(obj.componenteCod);
                $('#tarRX1').parent().addClass('has-warning');
                break;
            }
        }
    }
}

function cargarRX2(pSerie){

    var parametros = {
        opcion : "cargarBarra",
        serie: pSerie
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/kit.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          RX2Cargada    // Función que se ejecuta cuando el servidor responde
                          );
}

function RX2Cargada(r){
    var doc = JSON.parse(r);
    console.log(doc);
    if(doc.length>0){
        document.getElementById('serieRX2').value = doc[0].barraSerie;
        document.getElementById('serieRX2').disabled = true;        
        document.getElementById('txtLote').value = doc[0].kit;
        document.getElementById('txtLote').disabled = true;
        document.getElementById('txtFecha').value = doc[0].fecha;
        document.getElementById('txtFecha').disabled = true;
    }
    for (var i = 0; i < doc.length; i++) {
        var obj = doc[i];
        if(obj.componenteCod != null){
            componentesAct.push(obj.componenteCod);
            switch(obj.pos) {
            case '1':
                document.getElementById('duplex1RX2').value = String(obj.componenteCod);
                $('#duplex1RX2').parent().addClass('has-warning');
                break;
            case '2':
                document.getElementById('duplex2RX2').value = String(obj.componenteCod);
                $('#duplex2RX2').parent().addClass('has-warning');
                break;
            case '3':
                document.getElementById('proRX2').value = String(obj.componenteCod);
                $('#proRX2').parent().addClass('has-warning');
                break;
            case '4':
                document.getElementById('centroCargaRX2').value = String(obj.componenteCod);
                $('#centroCargaRX2').parent().addClass('has-warning');
                break;
            case '5':
                document.getElementById('tarRX2').value = String(obj.componenteCod);
                $('#tarRX2').parent().addClass('has-warning');
                break;
            }
        }
    }
}



function cargarTX3(pSerie){

    var parametros = {
        opcion : "cargarBarra",
        serie: pSerie
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/kit.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          TX3Cargada    // Función que se ejecuta cuando el servidor responde
                          );
}

function TX3Cargada(r){
    var doc = JSON.parse(r);
    console.log(doc);
    if(doc.length>0){
        document.getElementById('serieTX3').value = doc[0].barraSerie;
        document.getElementById('serieTX3').disabled = true;
        document.getElementById('txtLote').value = doc[0].kit;
        document.getElementById('txtLote').disabled = true;
        document.getElementById('txtFecha').value = doc[0].fecha;
        document.getElementById('txtFecha').disabled = true;
    }
    for (var i = 0; i < doc.length; i++) {
        var obj = doc[i];
        if(obj.componenteCod != null){
            componentesAct.push(obj.componenteCod);
            switch(obj.pos) {
            case '1':
                document.getElementById('pro1TX3').value = String(obj.componenteCod);
                $('#pro1TX3').parent().addClass('has-warning');
                break;
            case '2':
                document.getElementById('pro2TX3').value = String(obj.componenteCod);
                $('#pro2TX3').parent().addClass('has-warning');
                break;
            }
        }
    }
}



function eliminarComponente(boton){
    var tipoComponente = document.getElementById("tipoComponente");
    var data = tabla.row( (boton.closest('tr').rowIndex) -1 ).data();
    
    var parametros = {
        opcion : "eliminarComponente",
        txtCodigo: data[0]
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/componentes.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          componenteEliminado    // Función que se ejecuta cuando el servidor responde
                          );
    }

function componenteEliminado(r){
        alert(r);
        tabla.ajax.reload();
        
}

function disableDiv(divEntrada,boolEntrada){
    var nodes = document.getElementById(divEntrada).getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++){
         nodes[i].disabled = boolEntrada;
    }
}

function limpiar(){
    $('#8kTX1').parent().removeClass('has-error has-edit has-success has-warning');
    $('#modemTX1').parent().removeClass('has-error has-edit has-success has-warning');
    $('#tx1PRO1').parent().removeClass('has-error has-edit has-success has-warning');
    $('#tx1PRO2').parent().removeClass('has-error has-edit has-success has-warning');
    $('#tx1MAX1').parent().removeClass('has-error has-edit has-success has-warning');
    $('#tx1MAX2').parent().removeClass('has-error has-edit has-success has-warning');

    $('#duplex1RX1').parent().removeClass('has-error has-edit has-success has-warning');
    $('#duplex2RX1').parent().removeClass('has-error has-edit has-success has-warning');
    $('#proRX1').parent().removeClass('has-error has-edit has-success has-warning');
    $('#centroCargaRX1').parent().removeClass('has-error has-edit has-success has-warning');
    $('#tarRX1').parent().removeClass('has-error has-edit has-success has-warning');

    $('#duplex1RX2').parent().removeClass('has-error has-edit has-success has-warning');
    $('#duplex2RX2').parent().removeClass('has-error has-edit has-success has-warning');
    $('#proRX2').parent().removeClass('has-error has-edit has-success has-warning');
    $('#centroCargaRX2').parent().removeClass('has-error has-edit has-success has-warning');
    $('#tarRX2').parent().removeClass('has-error has-edit has-success has-warning');

    $('#pro1TX3').parent().removeClass('has-error has-edit has-success has-warning');
    $('#pro2TX3').parent().removeClass('has-error has-edit has-success has-warning');


    document.getElementById('serieTX1').value = "";
    document.getElementById('8kTX1').value = "";
    document.getElementById('claveCortaTX1').value = "";
    document.getElementById('claveLargaTX1').value = "";
    document.getElementById('claveCortaTX1').disabled = false;
    document.getElementById('claveLargaTX1').disabled = false;
    document.getElementById('modemTX1').value = "";
    document.getElementById('imeiModem').value = "";
    document.getElementById('imeiModem').disabled = false;
    document.getElementById('tx1PRO1').value = "";
    document.getElementById('tx1PRO2').value = "";
    document.getElementById('tx1MAX1').value = "";
    document.getElementById('tx1MAX2').value = "";

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
    disableDiv("divTX1",false);
    disableDiv("divRX1",false);
    disableDiv("divRX2",false);
    disableDiv("divTX3",false);
    editar = false;
    componentesAct = [];

}

function limpiarTodo(){
    limpiar();
    document.getElementById("txtFecha").value = "";
    document.getElementById("numKit").value = "";
    document.getElementById("txtLote").value = "";
    document.getElementById("btnAgregarBarra").style.display="inline-block";
    document.getElementById("btnEditarBarra").style.display="none";
    document.getElementById("numKit").disabled = false;
    document.getElementById('txtLote').disabled = false;
    document.getElementById('txtFecha').disabled = false;
}