$(document).ready(function (){
	//$( document ).tooltip();
	
	$('input').keyup(function(event) {
		var tecla = event.which;
	    if(tecla==37 || tecla==38 || tecla==39 || tecla==40 || tecla==27){
	    }
	    else{
	    	this.value = this.value.toLocaleUpperCase();
	    }
	});
	
	$("#eTblPosiciones").css("display", "none");
	$("#eTblFormatoFecha").css("display", "none");
	$("#eLongitud").attr('maxlength','5');
	$("#eFormatoFecha").attr('maxlength','30');
	$("#ePosicionIni").attr('maxlength','6');
	$("#ePosicionLong").attr('maxlength','6');
	
	listarEstados("eEstadoPrd");
	listarCatalogoColumn("eColumna");
	listarTipoDato("eTipoDato");
	listarValidaciones("eValidaciones");
	
	$('#eColumna').change(obtenerCatalogoColum);
	$('#eTipoDato').change(eventoFormatoFecha);
	$('#eEsCampoKey').change(eventoCampoObligatorio);
	$('#eEsCampoSalida').change(eventoCampoSalida);
	
	obtenerCatalogoColum();
	eventoFormatoFecha();
	eventoCampoObligatorio();
	eventoCampoSalida();
});

function eventoCampoSalida(){
	if($('#eEsCampoSalida').prop('checked')) {
    	$("#eTblPosiciones").css("display", "block");
    }
    else{
    	$("#eTblPosiciones").css("display", "none");
    }
}

function eventoCampoObligatorio(){
    if($('#eEsCampoKey').prop('checked')) {
    	$("#eEsCampoOblig").prop('checked', true);
    	$("#eEsCampoOblig").attr("disabled", true);
    }
    else{
    	$("#eEsCampoOblig").prop('checked', false);
    	$("#eEsCampoOblig").removeAttr("disabled");
    }
}

function eventoFormatoFecha(){
	var tipoDato = $( "#eTipoDato option:selected" ).text();
	if (tipoDato=='Fecha'){
		$("#eTblFormatoFecha").css("display", "block");
		$( "#eEsTipoFecha" ).val("1");
	}
	else{
    	$("#eTblFormatoFecha").css("display", "none");
    	$( "#eEsTipoFecha" ).val("0");
    }
}

function obtenerCatalogoColum(){
	
	var codigoCatalogoColumn = $( "#eColumna" ).val();
	
	var objeto;
	
	var parametros=new Object();
	parametros.codigoCatalogoColumn = codigoCatalogoColumn;
	
	$.ajax({
		  url: "../../mantenimiento/producto/obtener-catalogo-column.json",
		  data: parametros,
		  dataType: "json",
		  type: "POST",
		  async: false,
		  cache: false
	}).done(function(jsonData) {
		objeto = jsonData;
		$("#eTipoDato").val(objeto.objeto.codigoTipoDato);
		$("#eLongitud").val(objeto.objeto.longitud);
	});
	
	eventoFormatoFecha();
}


function guardarColumna(){
	bloquearPantalla();
	var parametros=new Object();
	
	if($("#eEsCampoOblig").prop('checked')){
		parametros.esCampoOblig = '1';
	}else{
		parametros.esCampoOblig = '0';
	}
	
	if($('#eEsCampoKey').prop('checked')){
		parametros.esCampoKey = '1';
	}else{
		parametros.esCampoKey = '0';
	}
	parametros.codigoProducto = $( "#rCodProducto" ).val();
	parametros.codigoCatalogoColumn = $( "#eColumna" ).val();
	parametros.estado = $( "#eEstadoPrd" ).val();
	parametros.codigoTipoDato = $( "#eTipoDato" ).val();
	parametros.longitud = $( "#eLongitud" ).val();
	parametros.formatoFecha = $( "#eFormatoFecha" ).val();
	if($('#eEsCampoSalida').prop('checked')){
		parametros.esCampoSalida = '1';
	}else{
		parametros.esCampoSalida = '0';
	}
	parametros.posicionInicial = $( "#ePosicionIni" ).val();
	parametros.longitudSalida = $( "#ePosicionLong" ).val();
	parametros.validaciones = ($( "#eValidaciones" ).val() || []).join( "," );
	parametros.esTipoFecha = $( "#eEsTipoFecha" ).val();
	
	$.ajax({
		url : "reg-producto-agregar-columna.json",
		data: parametros,
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
		
		desbloquearPantalla();
		
		if(jsonData.respuesta==VG_RESPUESTA_OK){
						actualizarGrillaColumnas();
			listarComboValIden("vid_tipo_documento");
			listarComboValIden("vid_num_documento");
			listarComboValIden("slc_persona_natural");
			listarComboValIden("slc_persona_juridica");
			cerrarPopUp("editarColumna");
			 
			var vid_tipo_documento = $("#vid_tipo_documento").val();
			
			if (vid_tipo_documento == null || vid_tipo_documento == "") {
				$('#tieneValIdentidad').prop('checked',false);
			}
			
			eventoTieneValiIden();
			mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
		}
		else if(jsonData.respuesta==VG_RESPUESTA_ERROR_VALIDACION){
			
			renderizarListaMensajes(jsonData.listaMensajesValidacion, 'msgsValidacionesRegistrarProducto');
			
		}else if (jsonData.respuesta==VG_RESPUESTA_ERROR) {
			
			mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
			
		}
		
		
	});
}
