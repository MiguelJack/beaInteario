function iniciar(){
    var parametros = {
        opcion : "obtenerPass",
        txtUser: $('#txtUser').val(),
        txtPass: $('#txtPass').val()
    };

    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuestainiciar    // Función que se ejecuta cuando el servidor responde
                          );
}
function siRespuestainiciar(r){
	try{
		var doc = JSON.parse(r);
		var user = document.getElementById('txtUser').value;  	
		if (user == doc[0].user) {
      localStorage.setItem("username",user);
			setTimeout("location.href='index.html'",0);
		}else{
			alert('Password incorrecto');
		}
	}catch(e){
		alert('Password incorrecto');
	}	            
}

$( "#loginForm" ).submit(function( event ) {
    iniciar();
    return false;
});