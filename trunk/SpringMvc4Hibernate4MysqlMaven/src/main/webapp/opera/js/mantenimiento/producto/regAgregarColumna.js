$(document).ready(function (){
	//$( document ).tooltip();
	
	$( "input[type=submit], input[type=button], button" )
    .button()
    .click(function( event ) {
      event.preventDefault();
    });
	
	$('input').keyup(function(event) {
		var tecla = event.which;
	    if(tecla==37 || tecla==38 || tecla==39 || tecla==40 || tecla==27){
	    }
	    else{
	    	this.value = this.value.toLocaleUpperCase();
	    }
	});
	
	$("#tblPosiciones").css("display", "none");
	$("#tblFormatoFecha").css("display", "none");
	$("#rLongitud").attr('maxlength','5');
	$("#rFormatoFecha").attr('maxlength','30');
	$("#rPosicionIni").attr('maxlength','6');
	$("#rPosicionLong").attr('maxlength','6');
	
	listarEstados("restadoPrd");
	listarCatalogoColumn("rColumna");
	listarTipoDato("rTipoDato");
	listarValidaciones("rValidaciones");
	
	$('#rColumna').change(obtenerCatalogoColum);
	$('#rTipoDato').change(eventoFormatoFecha);
	$('#rEsCampoKey').change(eventoCampoObligatorio);
	$('#rEsCampoSalida').change(eventoCampoSalida);
	
	obtenerCatalogoColum();
	eventoFormatoFecha();
	eventoCampoObligatorio();
	eventoCampoSalida();
});

function eventoCampoSalida(){
	
	if($('#rEsCampoSalida').prop('checked')) {
    	$("#tblPosiciones").css("display", "block");
    }
    else{
    	$("#tblPosiciones").css("display", "none");
    }
}

function eventoCampoObligatorio(){
    if($('#rEsCampoKey').prop('checked')) {
    	$("#rEsCampoOblig").prop('checked', true);
    	$("#rEsCampoOblig").attr("disabled", true);
    }
    else{
    	$("#rEsCampoOblig").prop('checked', false);
    	$("#rEsCampoOblig").removeAttr("disabled");
    }
}

function eventoFormatoFecha(){
	var tipoDato = $( "#rTipoDato option:selected" ).text();
	if (tipoDato=='Fecha'){
		$("#tblFormatoFecha").css("display", "block");
		$( "#esTipoFecha" ).val("1");
	}
	else{
    	$("#tblFormatoFecha").css("display", "none");
    	$( "#esTipoFecha" ).val("0");
    }
}

function obtenerCatalogoColum(){
	
	var codigoCatalogoColumn = $( "#rColumna" ).val();
	
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
		$("#rTipoDato").val(objeto.objeto.codigoTipoDato);
		$("#rLongitud").val(objeto.objeto.longitud);
	});
	
	eventoFormatoFecha();
}


function guardarColumna(){
	bloquearPantalla();
	var parametros=new Object();
	
	if($("#rEsCampoOblig").prop('checked')){
		parametros.esCampoOblig = '1';
	}else{
		parametros.esCampoOblig = '0';
	}
	
	if($('#rEsCampoKey').prop('checked')){
		parametros.esCampoKey = '1';
	}else{
		parametros.esCampoKey = '0';
	}
	parametros.codigoProducto = $( "#rCodProducto" ).val();
	parametros.codigoCatalogoColumn = $( "#rColumna" ).val();
	parametros.estado = $( "#restadoPrd" ).val();
	parametros.codigoTipoDato = $( "#rTipoDato" ).val();
	parametros.longitud = $( "#rLongitud" ).val();
	parametros.formatoFecha = $( "#rFormatoFecha" ).val();
	if($('#rEsCampoSalida').prop('checked')){
		parametros.esCampoSalida = '1';
	}else{
		parametros.esCampoSalida = '0';
	}
	parametros.posicionInicial = $( "#rPosicionIni" ).val();
	parametros.longitudSalida = $( "#rPosicionLong" ).val();
	parametros.validaciones = ($( "#rValidaciones" ).val() || []).join( "," );
	parametros.esTipoFecha = $( "#esTipoFecha" ).val();
	
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
			cerrarPopUp("agregarColumna");
			
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
