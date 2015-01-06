
function recuperarAval(codigoMoroso) {
	
	//alert("en mostrat info js " + codigoMoroso)
		
	$.ajax({
		url : "obtenerAvales.json",
		data : { "codigoDocMoro":codigoMoroso},
		datatype : 'json',
		type : "POST",		
		async : false,
		cache : false
	}).done(function(html) {
		
		
		$("#avalsino").text(html.estadoRespuesta);
		$("#tamanioLstAval").text(html.records);
		
		$.each(html.rows,function(key,val) {		    
			$("#tblAvalDiv").append("<br>");
			
			$("#tblAvalDiv").append("<tr>");
			$("#tblAvalDiv").append("<td class=\"etiqueta\" align=\"left\" style=\"height: 30px;width: 123px;\">Tipo de persona:</td>");			
			$("#tblAvalDiv").append("<td  style=\"width: 217px;\" >"+ val.strTipoPersona +"</td>");
			$("#tblAvalDiv").append("<td style=\"width: 120px;\">&nbsp;</td><td>&nbsp;</td>");
			$("#tblAvalDiv").append("</tr>");
			
			$("#tblAvalDiv").append("<tr>");
			$("#tblAvalDiv").append("<td class=\"etiqueta\" align=\"left\" style=\"height: 30px;width: 123px;\">Tipo documento</td>");
			$("#tblAvalDiv").append("<td style=\"width: 217px;\" >" + val.strTipoDocIdentidad + "</td>");			
			$("#tblAvalDiv").append("<td class=\"etiqueta\" align=\"left\" style=\"width: 123px;\">Nro de documento</td>");
			$("#tblAvalDiv").append("<td style=\"width: 217px;\">" + val.numdocident + "</td>");
			$("#tblAvalDiv").append("</tr>");
						
			
			if(val.tipoPersona==1){
				$("#tblAvalDiv").append("<tr>");
				$("#tblAvalDiv").append("<td class=etiqueta align=left style=\"height: 30px;width: 123px;\">Apellido Paterno</td>");
				$("#tblAvalDiv").append("<td>" + val.apePaternoNatural + "</td>");				
				$("#tblAvalDiv").append("<td class=etiqueta align=left>Apellido Materno</td>");			
				$("#tblAvalDiv").append("<td>" + val.apeMaternoNatural + "</td>");
				$("#tblAvalDiv").append("</tr>");
					
				$("#tblAvalDiv").append("<tr>");
				$("#tblAvalDiv").append("<td class=etiqueta align=left style=\"height: 30px;width: 123px;\">Nombres</td>");
				$("#tblAvalDiv").append("<td >" + val.nombreNatural + "</td>");
				$("#tblAvalDiv").append("<td > &nbsp; </td>");
				$("#tblAvalDiv").append("<td > &nbsp; </td>");
				$("#tblAvalDiv").append("</tr>");
				
			}else if(val.tipoPersona==2){
				
				$("#tblAvalDiv").append("<tr>");
				$("#tblAvalDiv").append("<td class=etiqueta align=left style=\"height: 30px;width: 123px;\">Razon Social</td>");
				$("#tblAvalDiv").append("<td colspan=3>" + val.razonSocial +"</td>");
				$("#tblAvalDiv").append("</tr>");
				
			}
			
			$("#tblAvalDiv").append("<tr>");
			$("#tblAvalDiv").append("<td class=etiqueta align=left style=\"height: 30px;width: 123px;\">Direccion</td>");
			$("#tblAvalDiv").append("<td colspan=\"3\">" + val.direccion + "</td>");
			$("#tblAvalDiv").append("</tr>");
			
			$("#tblAvalDiv").append("<tr>");
			$("#tblAvalDiv").append("<td class=etiqueta align=left style=\"height: 30px;width: 123px;\">Departamento</td>");
			$("#tblAvalDiv").append("<td > " + val.strDpto + " </td> <td class=etiqueta align=left>Provincia</td>");
			$("#tblAvalDiv").append("<td > " + val.strProv + " </td>");
			$("#tblAvalDiv").append("</tr>");
			
			$("#tblAvalDiv").append("<tr>");
			$("#tblAvalDiv").append("<td class=etiqueta align=left style=\"height: 30px;width: 123px;\">Distrito</td>");
			$("#tblAvalDiv").append("<td > " + val.strDist + " </td><td></td><td></td>");
			$("#tblAvalDiv").append("</tr>");
			
		});
		
		if(html.records > 0) {
			$("#tblAvalDiv").show();
			$("#AvalZone").show();
		}
		
	});
}

