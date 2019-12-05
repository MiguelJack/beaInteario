var barraID = localStorage.getItem("barraCodigo");
var codigoKit = localStorage.getItem("kitCodigo");

$( document ).ready(function() {
    cargarBarra();
});

var salidaTX1 = '<div class="panel-heading">TX1</div><div class="panel-body"><div class="row"><div class="col-lg-offset-2 col-lg-8"><form id="componentesForm"><div class="form-group row "><label for="inputPassword" class="col-sm-2 col-form-label">Serie</label><div class="col-sm-10"><input class="form-control" id="serieTX1" disabled></div></div><div class="form-group row"><label class="col-sm-2 col-form-label">8KTX1</label><div class="col-sm-10"><input class="form-control" id="8kTX1" disabled></div></div><div class="col-lg-offset-2"><div class="form-group row"><label  class="col-sm-2 col-form-label">Clave corta</label><div class="col-sm-10"><input class="form-control" id="claveCortaTX1" disabled></div></div><div class="form-group row"><label  class="col-sm-2 col-form-label">Clave larga</label><div class="col-sm-10"><input class="form-control" id="claveLargaTX1" disabled></div></div></div><div class="form-group row"><label  class="col-sm-2 col-form-label">MODEM</label><div class="col-sm-10"><input class="form-control" id="modemTX1" disabled></div>  </div><div class="col-lg-offset-2"><div class="form-group row"><label  class="col-sm-2 col-form-label">IMEI</label><div class="col-sm-10"><input class="form-control" id="imeiModem" disabled></div>  </div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">PRO</label><div class="col-sm-10"><input class="form-control" id="pro" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">PRO2</label><div class="col-sm-10"><input class="form-control" id="pro2" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">MAX</label><div class="col-sm-10"><input class="form-control" id="inputMAX" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">MAX2</label><div class="col-sm-10"><input class="form-control" id="inputMAX2" disabled></div></div><hr style="width: 100%; color: black; height: 1px; background-color:black;" /></form></div><!-- /.col-lg-6 (nested) --></div><!-- /.row (nested) --></div>';
var salidaRX1 = '<div class="panel-heading">RX1</div><div class="panel-body"><div class="row"><div class="col-lg-offset-2 col-lg-8"><form id="componentesForm"><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">Serie</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="serieRX1" disabled></div></div><div class="form-group row"><label class="col-sm-2 col-form-label">Duplex</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="duplex1RX1" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">Duplex2</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="duplex2RX1" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">PRO</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="proRX1" disabled></div></div><div class="form-group row"><label  class="col-sm-2 col-form-label">Centro carga</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="centroCargaRX1" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">TAR</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="tarRX1" disabled></div></div><hr style="width: 100%; color: black; height: 1px; background-color:black;" /></form></div><!-- /.col-lg-6 (nested) --></div><!-- /.row (nested) --></div>';
var salidaRX2 = '<div class="panel-heading">RX2</div><div class="panel-body"><div class="row"><div class="col-lg-offset-2 col-lg-8"><form id="componentesForm"><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">Serie</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="serieRX2" disabled></div></div><div class="form-group row"><label class="col-sm-2 col-form-label">Duplex</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="duplex1RX2" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">Duplex2</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="duplex2RX2" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">PRO</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="proRX2" disabled></div></div><div class="form-group row"><label  class="col-sm-2 col-form-label">Centro carga</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="centroCargaRX2" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">TAR</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="tarRX2" disabled></div></div><hr style="width: 100%; color: black; height: 1px; background-color:black;" /></form></div><!-- /.col-lg-6 (nested) --></div><!-- /.row (nested) --></div>';
var salidaTX3 = '<div class="panel-heading">TX3</div><div class="panel-body"><div class="row"><div class="col-lg-offset-2 col-lg-8"><form id="componentesForm"><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">Serie</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="serieTX3" disabled></div></div><div class="form-group row"><label class="col-sm-2 col-form-label">PRO</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="pro1TX3" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">PRO2</label><div class="col-sm-10"><input autocomplete="off" class="form-control" id="pro2TX3" disabled></div></div><hr style="width: 100%; color: black; height: 1px; background-color:black;" /></form></div><!-- /.col-lg-6 (nested) --></div><!-- /.row (nested) --></div>';

function cargarBarra(){
	if (barraID.localeCompare("") != 0) {
		document.getElementById('txtBarra').value = barraID;
	}else{
		barraID = document.getElementById('txtBarra').value;
	}
	var parametros = {
		opcion : "cargarBarra",
		barra: barraID
	}

	var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
	                     parametros,    	                       
	                     siRespuestacargarBarra    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarBarra(r){
	try{
		var doc = JSON.parse(r);
		var tipoID = doc[0].tipoBarra;
		document.getElementById('txtKit').value = codigoKit;
		switch(tipoID){
			case '1':
				$("#panelBarra").html(salidaTX1);
				document.getElementById('serieTX1').value = barraID;
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
				$("#panelBarra").html(salidaRX1);
				document.getElementById('serieRX1').value = barraID;
				document.getElementById('duplex1RX1').value = doc[0].componenteCod;
				document.getElementById('duplex2RX1').value = doc[1].componenteCod;
				document.getElementById('proRX1').value = doc[2].componenteCod;
				document.getElementById('centroCargaRX1').value = doc[3].componenteCod;
				document.getElementById('tarRX1').value = doc[4].componenteCod;
				break;
			case '3':
				$("#panelBarra").html(salidaRX2);
				document.getElementById('serieRX2').value = barraID;
				document.getElementById('duplex1RX2').value = doc[0].componenteCod;
				document.getElementById('duplex2RX2').value = doc[1].componenteCod;
				document.getElementById('proRX2').value = doc[2].componenteCod;
				document.getElementById('centroCargaRX2').value = doc[3].componenteCod;
				document.getElementById('tarRX2').value = doc[4].componenteCod;
				break;
			case '4':
				$("#panelBarra").html(salidaTX3);
				document.getElementById('serieTX3').value = barraID;
				document.getElementById('pro1TX3').value = doc[0].componenteCod;
				document.getElementById('pro2TX3').value = doc[1].componenteCod;
				break;
		}
	}catch(e){
		if (barraID !="") {
			alert("No hay una barra registrada en la base de datos con el codigo: "+barraID);
			$("#panelBarra").html("");
		}
	} 
	barraID = "";
	codigoKit = "";
	localStorage.setItem("barraCodigo","");
    localStorage.setItem("kitCodigo","");
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