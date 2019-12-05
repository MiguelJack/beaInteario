$( document ).ready(function() {
    cargarUsuario();
});

function cargarUsuario(){
    var user = localStorage.getItem("username");
    var parametros = {
        opcion : "cargarUsuario",
        user : user
    };

    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuestacargarUsuario    // Función que se ejecuta cuando el servidor responde
                          ); 
}

function siRespuestacargarUsuario(r){
    var doc = JSON.parse(r);         
    var obj = doc[0];     
    document.getElementById('txtNombre').value = obj.nombre;
    document.getElementById('txtApellidoUno').value = obj.apellido1;
    document.getElementById('txtApellidoDos').value = obj.apellido2;
    document.getElementById('txtUser').value = obj.user;
    document.getElementById('txtPass').value = obj.password;
    document.getElementById('txtTelefono').value = obj.telefono;
    document.getElementById('txtCorreo').value = obj.correo;
}

function editarTecnico(){
    var parametros = {
        opcion : "editarUsuario",
        txtNombre: $('#txtNombre').val(),
        txtApellidoUno: $('#txtApellidoUno').val(),
        txtApellidoDos: $('#txtApellidoDos').val(),
        txtUser: $('#txtUser').val(),
        txtPass: $('#txtPass').val(),
        txtTelefono: $('#txtTelefono').val(),
        txtCorreo: $('#txtCorreo').val()
    };

    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuestaeditarTecnico    // Función que se ejecuta cuando el servidor responde
                          );
}

function siRespuestaeditarTecnico(r){
    limpiar();
    alert(r);
}

function limpiar(){
    document.getElementById('txtNombre').value = "";
    document.getElementById('txtApellidoUno').value = "";
    document.getElementById('txtApellidoDos').value = "";
    document.getElementById('txtPass').value = "";
    document.getElementById('txtTelefono').value = "";
    document.getElementById('txtCorreo').value = "";
}

$( "#tecnicoForm" ).submit(function( event ) {
    editarTecnico();
    return false;
});