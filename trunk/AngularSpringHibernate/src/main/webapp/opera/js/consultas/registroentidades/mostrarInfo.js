
function obtenerDetalleEntidad(codigoEntidad) {
	
	$.ajax({
		url : "obtenerDetalleEntidad.json",
		type : "POST",
		datatype : 'json',
		data : { "codigoEnti":codigoEntidad},
		async : false,
		cache : false
	}).done(function(html) {
		
		
		$.each(html.rows,function(key,val) {
			
			$("#vcodiEnti").text(": " + val.codigoSci);
			$("#vHostEnti").text(": " + val.codigoHost);
			
			$("#vRuc").text(": " + val.ruc);
			$("#vMercadoEnti").text(": " + val.mercado);
			$("#vGiroEnti").text(": " + val.giro);
			$("#vEstado").text(": " + val.estado);
			$("#vNombre").text(": " + val.nombreEntidad);
			$("#vDireccion").text(": " + val.direcEntidad);
			$("#vUbigeo").text(": " + val.ubigeo);
			$("#vFecCreacion").text(": " + val.fecCreacion);
			$("#vTelefono").text(": " + val.telefonos);
			$("#vCodPostal").text(": " + val.codigoPostal);
			$("#vEmail").text(": " + val.email);
			$("#vSitWeb").text(": " + val.sitioweb);
			$("#vCantAtraso1").text(": " + val.retraso1);
			$("#vCantAtraso2").text(": " + val.retraso2);
			$("#vCantAtraso3").text(": " + val.retraso3);
			$("#vCantAtraso4").text(": " + val.retraso4);
			$("#vTotalRegis").text(": " + val.totalregistros);
			$("#vFecUltimCarga").text(": " + val.fecUltimaCrg);
			$("#vFecUltimAct").text(": " + val.fecUltimaReg);
		});
		
				
		
	});
}

