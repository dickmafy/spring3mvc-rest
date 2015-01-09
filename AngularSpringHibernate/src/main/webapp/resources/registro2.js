var rows = $('table.deudor tr');
var natural = rows.filter('.critPersonaNatural');
var juridica = rows.filter('.critPersonaJuridica');

$(document)
		.ready(
				function() {
					alert('FUNCIONANDO REGISTRODOCUMORO 2015');
										
});


function getDdirecto(){
	
	var ddirecto = new Object();
	
	ddirecto.tipoPersona =  $("#cboTipPersona").val();
	ddirecto.tipoDocumento =  $("#cboTipDcto").val();
	ddirecto.numDoc =  $("#numdocident").val();
	ddirecto.apePat =  $("#apePaternoNatural").val();
	ddirecto.apeMat =  $("#apeMaternoNatural").val();
	ddirecto.nombre =  $("#nombreNatural").val();
	ddirecto.razSocial =  $("#razonSocial").val();
	ddirecto.direccion =  $("#direccion").val();
	ddirecto.codDpto =  $("#cboTipDpto").val();
	ddirecto.codProv =  $("#cboTipProv").val();
	ddirecto.codDist =  $("#cboTipDist").val();
	
	return ddirecto;
}

function getDmoroso(){
	
	var dmoroso = new Object();
	
	dmoroso.codDocuMoroso = '';
	dmoroso.nroDocMoroso =  $("#nroDocMoroso").val();
	dmoroso.tipDocCredito =  $("#cboTipDocCredito").val();
	dmoroso.tipMoneda =  $("#cboTipMoneda").val();
	dmoroso.monto =  $("#monto").val();
	dmoroso.fecvencimiento =  $("#fecvencimiento").val();
	dmoroso.cboTipCondDeuda =  $("#cboTipCondDeuda").val();
	dmoroso.cantAvales =  $("#cboNroAval").val();	
	
	return dmoroso;
}


function mostrarOcultarTipoPersona(){
	
	var tipPersona = $("#cboTipPersona").val();
	
	if(tipPersona == 1 ){
		natural.show();
		juridica.hide();
	}else if (tipPersona == 2){
		natural.hide();
		juridica.show();
	}else{
		natural.hide();
		juridica.hide();
	}
		
}

function guardarDctoMoroso(){
	
	var cantAvales = $("#cboNroAval").val(); 
	
	
	
	if($("#cboTipPersona").val()!=""){
		
		for(i=1;i<=cantAvales;i++){
			if($("#cboTipPersonaAval"+i).val()==""){
				mostrarMensaje("ERROR", "Debe seleccionar el tipo de persona a grabar para los avales");
				$("#cboTipPersonaAval"+i).focus();
				return false;
			}
		}
		
				
		if(validarMontoDeuda()==""){
			var ddirecto = getDdirecto();	
			var dmoroso = getDmoroso();
			var formAvales = $("#formularioRegistrarAvales").serialize();		
			
			bloquearPantalla();
			
			$.ajax({
				url : "grabarNuevoDctomoroso.json",
				data: {"ddirecto":ddirecto, "dmoroso": dmoroso, "formAvales": formAvales},
				type : "POST",
				async : false,
				cache : false
			}).done(function(jsonData) {
				
				desbloquearPantalla();
				
				if(jsonData.respuesta==VG_RESPUESTA_OK){
					
					cerrarPopUp("nuevoDctoMoroso");
					mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
					
					$("#grilla_mantenimiento_dctomoroso").jqGrid('setGridParam').trigger('reloadGrid');
							
				}else if(jsonData.respuesta==VG_RESPUESTA_ERROR_VALIDACION){
					
					renderizarListaMensajes(jsonData.listaMensajesValidacion, 'msgsValidacionesRegistrarDctoMoroso');
					
				}else if (jsonData.respuesta==VG_RESPUESTA_ERROR) {
					
					if(jsonData.tipoMensaje == "VACIO" ){
						
						alert("vacio");
						var cadeErrorVacio = jsonData.mensaje;
						var arrayError = cadeErrorVacio.split("&");
						$("#"+arrayError[1]).focus();
						mostrarMensaje("ERROR", "El campo " + arrayError[0] + " es obligatorio ");
						
					}else{
						mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
					}
					
					
				}
				
			});
		}else{
			
			mostrarMensaje("ERROR", validarMontoDeuda());
		}
		
	}else{
		mostrarMensaje("ERROR", "Debe seleccionar el tipo de persona a grabar");
		$("#cboTipPersona").focus();
	}
	
	
	
}

function validarMontoDeuda()
{
	var monto = $("#monto").val();
	
	if(monto.match(/^[0-9]+(.[0-9]+)*$/)) {
		var cadena = monto.split(".");
		var entero = cadena[0];
		if((entero.length)>10){
			return "El formato del Monto es de 10 dígitos enteros y 2 decimales";
		}
	} else {
		return "Monto no es numérico";
	}
	return "";
}



function getDatosMorosoNuevo(){
	
	$.ajax({
		url : "getDatosMorosoNuevo.json",
		type : "POST",
		datatype : 'json', 
		async : false,
		cache : false
	}).done(function(html) {
				
		cargaCombos(html);
	
	});

}


function cargaCombos(html){
	
	$.each(html.objeto.deudor.tipoPersona,function(key,val) {
	    $("#cboTipPersona").append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});
	
	$.each(html.objeto.deudor.tipoDocIdentidad,function(key,val) {
	    $("#cboTipDcto").append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});
	
	$.each(html.objeto.deudor.tipoDpto,function(key,val) {
	    $("#cboTipDpto").append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});
	
	$.each(html.objeto.deudor.tipoProvincia,function(key,val) {
	    $("#cboTipProv").append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});
	
	$.each(html.objeto.deudor.tipoDistrito,function(key,val) {
	    $("#cboTipDist").append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});
	
	$.each(html.objeto.tipoDocCredito,function(key,val) {
	    $("#cboTipDocCredito").append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});
	
	
	$.each(html.objeto.tipoMoneda,function(key,val) {
	    $("#cboTipMoneda").append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});		
		
	
	$.each(html.objeto.tipoCondicionDeuda,function(key,val) {
	    $("#cboTipCondDeuda").append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});
		
}




function activaAval(){
	$("#secAval").show();
	var cantidad = $("#cboNroAval").val();
	var strHtmlAval="";
	
	
	$.ajax({
		url : "getDatosMorosoNuevo.json",
		type : "POST",
		datatype : 'json', 
		async : false,
		cache : false
	}).done(function(html) {
				
		for(i=1;i<=cantidad;i++){
			strHtmlAval = strHtmlAval + getInputHtmlAvalNuevo(i);			
		}
		
		$("#secAval").html(strHtmlAval);
		
		for(i=1;i<=cantidad;i++){
			cargaCombosAvales(html,i);
			var rows = $('table.aval'+i +' tr');
			var natural = rows.filter('.critPersonaNatural');
			var juridica = rows.filter('.critPersonaJuridica');
			natural.hide();
			juridica.hide();
		}
		
		
	
	});
			
}


function cargaCombosAvales(html,i){
	
	$.each(html.objeto.deudor.tipoPersona,function(key,val) {
	    $("#cboTipPersonaAval"+i).append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});
	
	$.each(html.objeto.deudor.tipoDocIdentidad,function(key,val) {
	    $("#cboTipDctoAval"+i).append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});
	
	$.each(html.objeto.deudor.tipoDpto,function(key,val) {
	    $("#cboTipDptoAval"+i).append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
	});
	
}

function loadProvinciaAval(idx){
	
	bloquearPantalla();
	
	$("#cboTipProvAval"+idx).empty().append('<option selected="selected" value=" ">seleccione</option>');
	
	var codigoDpto = $("#cboTipDptoAval"+idx).val();
		
	$.ajax({
		url : "cargaProvincia.json",
		data : {"codigoDpto": codigoDpto},
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
				
		desbloquearPantalla();
		
		$.each(jsonData.objeto.deudor.tipoProvincia,function(key,val) {
		    $("#cboTipProvAval"+idx).append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
		});
	
	});
	
}

function loadDistritoAval(idx){
	
	bloquearPantalla();
	
	$("#cboTipDistAval"+idx).empty().append('<option selected="selected" value=" ">seleccione</option>');
	
	var codigoProv = $("#cboTipProvAval" + idx).val();
		
	$.ajax({
		url : "cargaDistrito.json",
		data : {"codigoProv": codigoProv},
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
				
		desbloquearPantalla();
		
		$.each(jsonData.objeto.deudor.tipoDistrito,function(key,val) {
		    $("#cboTipDistAval" + idx).append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
		});
	
	});
	
}

function loadProvincia(){
	
	bloquearPantalla();
	
	$("#cboTipProv").empty().append('<option selected="selected" value=" ">seleccione</option>');
	
	var codigoDpto = $("#cboTipDpto").val();
		
	$.ajax({
		url : "cargaProvincia.json",
		data : {"codigoDpto": codigoDpto},
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
				
		desbloquearPantalla();
		
		$.each(jsonData.objeto.deudor.tipoProvincia,function(key,val) {
		    $("#cboTipProv").append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
		});
	
	});
	
}

function loadDistrito(){
	
	bloquearPantalla();
	
	$("#cboTipDist").empty().append('<option selected="selected" value=" ">seleccione</option>');
	
	var codigoProv = $("#cboTipProv").val();
		
	$.ajax({
		url : "cargaDistrito.json",
		data : {"codigoProv": codigoProv},
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
				
		desbloquearPantalla();
		
		$.each(jsonData.objeto.deudor.tipoDistrito,function(key,val) {
		    $("#cboTipDist").append("<option value='"+val.codigo+"'>"+val.nombre+"</option>");
		});
	
	});
	
}

function noverAval(){
	$("#lblCantAvales").text("");
	$("#AgregaAval").hide();	
	$("#secAval").hide();	
}

function verAval(){
	$("#lblCantAvales").text("Cantidad de Avales");
	$("#AgregaAval").show();
	$("#secAval").show();
}

function mostrarOcultarTipoPersonaAval(idx){
	var rows = $('table.aval'+idx +' tr');
	var natural = rows.filter('.critPersonaNatural');
	var juridica = rows.filter('.critPersonaJuridica');
	
	var tipPersona = $("#cboTipPersonaAval" + idx).val();
		
	if(tipPersona == 1 ){
		natural.show();
		juridica.hide();
	}else if (tipPersona == 2){
		natural.hide();
		juridica.show();
	}else{
		natural.hide();
		juridica.hide();
	}
	
}

function getInputHtmlAvalNuevo(idx){
	
	return "<br><fieldset style='height: 100%; width: 780px;'> " +
  " <legend>Datos de Aval " + idx + "</legend> " +
  " <table style='height: 100%;' id='tabla' class='aval"+ idx +"' border='0' cellpadding='4' cellspacing='4' width='100%'> " +
  " <tbody> " +
  " <tr> " + 
  " <td style='width: 145px;'>Tipo de persona</td> " +
  " <td style='width: 232px;'> " +
  " <select id='cboTipPersonaAval" + idx + "' " + 
  " name='cboTipPersonaAval" + idx + "' " + 
  " class='combo' onchange='mostrarOcultarTipoPersonaAval("+ idx +");' ><option value=''>seleccione</option></select> " + 
  " </td> " + 
  " <td colspan='2' rowspan='1' style='width: 165px;'></td> " + 
  " </tr> " + 
  " <tr> " + 
  " <td style='width: 145px;'>Tipo de documento</td> " + 
  " <td style='width: 232px;'> " +
  " <select id='cboTipDctoAval" +idx + "' " +
  " name='cboTipDctoAval" +idx + "' " +
  " class='combo'><option value=''>seleccione</option></select> " + 
  " <label class='Asterisco'>*</label></td> " + 
  " <td style='width: 145px;'> Número de documento </td> " +
  " <td style='width: 165px;'> "  + 
  " <input id='numdocidentAval" + idx +"' " + 
  " name='numdocidentAval"+ idx + "' " + 
  " maxlength='12' size='20' value='' style='text-transform: uppercase;' class='cajatexto1'  type='text'> " + 
  " <label class='Asterisco'>*</label> " + 
  " <br>  " +  
  " </td> " + 
  " </tr> " + 
  " <tr class='critPersonaNatural' >  " +
  " <td style='width: 145px;'>Apellido paterno</td> " + 
  " <td colspan='3' rowspan='1'  style='width: 232px;' > " + 
  " <input  name='apePaternoNaturalAval" + idx + "' " +
  " id='apePaternoNaturalAval" + idx + "' " +
  " maxlength='50'  size='60' value='' style='text-transform: uppercase;' class='cajatexto3' type='text'> " + 
  " <label class='Asterisco'>*</label> " + 
  " </td> " + 
  " </tr> " + 
  " <tr class='critPersonaNatural' > " +
  " <td style='width: 145px;'>Apellido materno</td> " + 
  " <td colspan='3' rowspan='1' style='width: 232px;'> " +
  " <input  name='apeMaternoNaturalAval" + idx + "' " +
  " id='apeMaternoNaturalAval" + idx + "' " +
  " maxlength='50' size='60' value='' style='text-transform: uppercase;' class='cajatexto3' type='text'> " +
  " <label class='Asterisco'>*</label> " + 
  " </td> " + 
  " </tr> " + 
  " <tr class='critPersonaNatural' >  " + 
  " <td style='width: 145px;'>Nombres</td> " +
  " <td colspan='3' rowspan='1' style='width: 232px;'> " +
  " <input  name='nombreNaturalAval" + idx + "' " + 
  " id='nombreNaturalAval" + idx +"' " +
  " maxlength='50'  size='60' value='' style='text-transform: uppercase;' class='cajatexto3' type='text'> " +
  " <label class='Asterisco'>*</label> " + 
  " </td> " +
  " </tr> " +
  " <tr class='critPersonaJuridica' >  " +
  " <td>  " +
  " <div id='divRZ1'>Razón social</div> " + 
  " </td> " +
  " <td colspan='3'> " + 
  " <div id='divRZ2'> " +
  " <input name='razonSocialAval" + idx + "' " +
  " id='razonSocialAval" + idx + "' " +
  " maxlength='80' size='80' value='' style='text-transform: uppercase;' class='cajatextors' type='text'> " +
  " <label  class='Asterisco'>*</label> " + 
  " </div> " +
  " </td> " +
  " </tr> " + 
  " <tr> " +
  " <td style='width: 145px;'>Dirección</td> " +
  " <td style='width: 232px;' colspan='3' rowspan='1'> " + 
  " <input name='direccionAval" + idx + "' " +
  " id='direccionAval" + idx +"' " +
  " maxlength='80' size='50' value='' style='text-transform: uppercase;' class='cajatexto2' type='text'> " + 
  " <label class='Asterisco'>*</label> " +
  " </td> " + 
  " </tr> " +
  " <tr> " +
  " <td style='width: 145px;'>Departamento</td> " +
  " <td style='width: 232px;'> " +
  " <select id='cboTipDptoAval" + idx + "' " +
  " name='cboTipDptoAval" + idx + "' onchange='loadProvinciaAval("+ idx + ");' " +
  " class='combo'><option value=''>seleccione</option></select> " +
  " <label class='Asterisco'>*</label> " + 
  " </td> " +
  " <td style='width: 145px;' >Provincia</td> " + 
  " <td style='width: 165px;' > " + 
  " <select id='cboTipProvAval" + idx + "' " +
  " name='cboTipProvAval" + idx + "' onchange='loadDistritoAval("+ idx + ");' " +   
  " class='combo'><option value=''>seleccione</option></select> " +
  " <label class='Asterisco'>*</label> " + 
  " </td> " +
  " </tr> " +
  " <tr> " + 
  " <td style='width: 145px;'>Distrito</td> " + 
  " <td colspan='3' rowspan='1' style='width: 232px;'> " + 
  " <select id='cboTipDistAval" + idx + "' " +
  " name='cboTipDistAval" + idx + "' " + 
  " class='combo'><option value=''>seleccione</option></select> " +
  " <label class='Asterisco'>*</label> " + 
  " </td> " +
  " </tr> " + 
  " </tbody> " +
  " </table> " + 
  " </fieldset>";
	
}

function validaInputsAvales(){
	
}

function validaInputsDocumentoMoroso(){
	
}

function validaInputsDeudorDirecto(){
	
}

