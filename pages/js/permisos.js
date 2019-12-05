
var tablaAdmins;
var tablaTecnicos;
$( document ).ready(function() {

    tablaAdmins = $('#tablaAdministradores').DataTable( {

        "columns": [
            null,
            null,
            null,
            null,
            null,
            null,
            {
              "data": null,
              "defaultContent": '<button class="btn btn-danger" onclick="quitarAdmin(this)" >Revocar Admin</button>'
            }
        ],
        "processing": true,
        "serverSide": true,
        "ajax": "php/tablas/tablaAdmins.php"
        
    } );

    var filteredData = tablaAdmins
        .column()

    tablaTecnicos = $('#tablaTecnicos').DataTable( {

        "columns": [
            null,
            null,
            null,
            null,
            null,
            null,
            {
              "data": null,
              "defaultContent": '<button class="btn btn-primary" onclick="hacerAdmin(this)" >Hacer Admin</button>'
            }
        ],
        "processing": true,
        "serverSide": true,
        "ajax": "php/tablas/tablaTecnicos.php"
        
    } );
});

function quitarAdmin(boton){
    var data = tablaAdmins.row( (boton.closest('tr').rowIndex) -1 ).data();
    
    var parametros = {
        opcion : "quitarAdmin",
        txtUser: data[3]
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuesta    // Función que se ejecuta cuando el servidor responde
                          );
}

function hacerAdmin(boton){
    var data = tablaTecnicos.row( (boton.closest('tr').rowIndex) -1 ).data();
    
    var parametros = {
        opcion : "hacerAdmin",
        txtUser: data[3]
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuesta    // Función que se ejecuta cuando el servidor responde
                          );
}

function siRespuesta(r){
        alert(r);
        tablaAdmins.ajax.reload();   
        tablaTecnicos.ajax.reload();   
}