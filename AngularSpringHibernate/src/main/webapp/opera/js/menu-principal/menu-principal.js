var VG_session;

function generarMenu(idPerfil){
	
	var datos = "idPerfil="+idPerfil;
	
	$.ajax({
		  url: "obtener-menu-perfil.json",
		  data: datos,
		  dataType: "json",
		  type: "POST",
		  async: false,
		  cache: false
	}).done(function(jsonData) {
		
		$("#menuTable").html(jsonData.objeto);
		
	});
	
}

function irEvaluarSolicitud(){
	
	$("#evaluarSolicitud").html("");
	
	$.ajax({
		url : "../evaluacion/evaluar-solicitud.htm",
		type : "GET",
		async : false,
		cache : false
		
	}).done(function(html) {
		
		$("#evaluarSolicitud").html(html);
		crearPopUp("evaluarSolicitud",null,650,"Evaluar Solicitud de Crédito");
		$("input[type=button]").button();
		
	});
}


function irRespuestaSolicitud(){
	
	$("#respuestaSolicitud").html("");
	
	$.ajax({
		url : "../evaluacion/respuesta-solicitud.htm",
		type : "GET",
		async : false,
		cache : false
		
	}).done(function(html) {
		
		$("#respuestaSolicitud").html(html);
		crearPopUp("respuestaSolicitud",null,1000,"Informe de Evaluación de Crédito");
		$("input[type=button]").button();
		
	});
}


function irInformesAnteriores(){
	
	$("#informesAnteriores").html("");
	
	$.ajax({
		url : "../evaluacion/informes-anteriores.htm",
		type : "GET",
		async : false,
		cache : false
		
	}).done(function(html) {
		
		$("#informesAnteriores").html(html);
		crearPopUp("informesAnteriores",null,800,"Informes Anteriores");
		$("input[type=button]").button();
		
	});
}


function irDatosConsulta(){
	
	$("#datosConsulta").html("");
	
	$.ajax({
		url : "../evaluacion/datos-consulta.htm",
		type : "GET",
		async : false,
		cache : false
		
	}).done(function(html) {
		
		$("#datosConsulta").html(html);
		crearPopUp("datosConsulta",null,800,"Datos de Consulta");
		$("input[type=button]").button();
		
	});
}


