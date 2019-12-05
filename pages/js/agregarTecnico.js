function agregarTecnico(){
    var parametros = {
        opcion : "agregarUsuario",
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
                          siRespuestaagregarTecnico    // Función que se ejecuta cuando el servidor responde
                          );
}

function siRespuestaagregarTecnico(r){
    limpiar();
    alert(r);
}

function limpiar(){
    document.getElementById('txtNombre').value = "";
    document.getElementById('txtApellidoUno').value = "";
    document.getElementById('txtApellidoDos').value = "";
    document.getElementById('txtUser').value = "";
    document.getElementById('txtPass').value = "";
    document.getElementById('txtTelefono').value = "";
    document.getElementById('txtCorreo').value = "";
}

$( "#tecnicoForm" ).submit(function( event ) {
    agregarTecnico();
    return false;
});