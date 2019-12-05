var listTipo = [];
var tabla;
$( document ).ready(function() {

    tabla = $('#tablaSim').DataTable( {

        "columns": [
            null,
            null,
            null,
            null,
            null,
            null,
            {
              "data": null,
              "defaultContent": '<button class="btn btn-primary" onclick="cargarEditar(this)" >Editar</button><button class="btn btn-danger" onclick="eliminarSim(this)" >Eliminar</button>'
            }
        ],
        "processing": true,
        "serverSide": true,
        "ajax": "php/tablas/tablaSim.php"
        
    } );
});

var arrayEmpresa = [];
var arrayEmpresaNombre = [];
var arrayBus = [];



function cargarEditar(boton){
    var data = tabla.row( (boton.closest('tr').rowIndex) -1 ).data();
    document.getElementById('txtNumero').value = data[0];
    document.getElementById("txtPin").value = data[1];
    document.getElementById("txtPuk").value = data[2];
    document.getElementById("txtCodigo").value = data[3];
    document.getElementById("txtFecha").value = data[4];
    revisarEstado(data[5]);
    document.getElementById('txtNumero').disabled = true;
    document.getElementById("btnAgregarSim").style.display="none";
    document.getElementById("btnEditarSim").style.display="inline-block";
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

$( "#componentesForm" ).submit(function( event ) {
    var editarBoton = document.getElementById("btnEditarSim").style.display;
    console.log(editarBoton);
    if(editarBoton=="none"){
        agregarSim();
    }else{
        editarSim();
    }

    return false;
});


function agregarSim(){
    var tipoComponente = document.getElementById("tipoComponente");
    var parametros = {
        opcion : "agregarSim",
        txtNumero: $('#txtNumero').val(),
        txtFecha: $('#txtFecha').val(),
        txtEstado: $('#listEstado').val(),
        txtPin: $('#txtPin').val(),
        txtPuk: $('#txtPuk').val(),
        txtCodigo: $('#txtCodigo').val()
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/sim.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          simAgregado    // Función que se ejecuta cuando el servidor responde
                          );
    }

function simAgregado(r){
        limpiar();
        alert(r);
        tabla.ajax.reload();
}


function editarSim(){
    var parametros = {
        opcion : "editarSim",
        txtNumero: $('#txtNumero').val(),
        txtFecha: $('#txtFecha').val(),
        txtEstado: $('#listEstado').val(),
        txtPin: $('#txtPin').val(),
        txtPuk: $('#txtPuk').val(),
        txtCodigo: $('#txtCodigo').val()
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/sim.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          simEditado    // Función que se ejecuta cuando el servidor responde
                          );
    }

function simEditado(r){
        limpiarTodo();
        alert(r);
        tabla.ajax.reload();
        
}

function eliminarSim(boton){
    var data = tabla.row( (boton.closest('tr').rowIndex) -1 ).data();
    
    var parametros = {
        opcion : "eliminarSim",
        txtNumero: data[0]
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/sim.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          simEliminado    // Función que se ejecuta cuando el servidor responde
                          );
    }

function simEliminado(r){
        alert(r);
        tabla.ajax.reload();
        
}


function limpiar(){
    document.getElementById('txtPin').value = "";
    document.getElementById('txtPuk').value = "";
    document.getElementById('txtNumero').value = "";
    document.getElementById('txtCodigo').value = "";
}

function limpiarTodo(){
    document.getElementById('txtPin').value = "";
    document.getElementById('txtPuk').value = "";
    document.getElementById('txtNumero').value = "";
    document.getElementById('txtCodigo').value = "";
    document.getElementById("txtFecha").value = "";
    document.getElementById('txtNumero').disabled = false;
    document.getElementById("listEstado").selectedIndex = 0;
    document.getElementById("btnAgregarSim").style.display="inline-block";
    document.getElementById("btnEditarSim").style.display="none";
}