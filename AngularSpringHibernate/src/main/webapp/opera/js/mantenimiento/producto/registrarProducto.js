$(document).ready(function (){
	
	$("#tbl_detalle_producto").css("display", "none");
	$("#bGuardar").css("display", "none");
	$("#nombreTbl").attr('maxlength','12');
	$("#nombreProd").attr('maxlength','149');
	$("#nombreArchSalida").attr('maxlength','249');
	
	
	var formatoEsKey = function(cellVal,options,rowObject){
		var esKey = "";
		if(rowObject.esLlave=='1'){
			esKey = "SI";
		}
		else{
			esKey = "NO";
		}
		
		return esKey;		
	};
	
	var formatoEsOblig = function(cellVal,options,rowObject){
		var esOblig = "";
		if(rowObject.esObligatorio=='1'){
			esOblig = "SI";
		}
		else{
			esOblig = "NO";
		}
		
		return esOblig;		
	};
	
	var formatoEsSalida = function(cellVal,options,rowObject){
		var esSalida = "";
		if(rowObject.esColumnaSalida=='1'){
			esSalida = "SI";
		}
		else{
			esSalida = "NO";
		}
		
		return esSalida;		
	};
	
	var opciones = function(cellVal,options,rowObject){
		
		var botones = "";	
		if(rowObject.columnaEditable=='1'){
			botones += "<center>";
			  botones += "<div style='display: inline-block;'>";
			    botones += "<a href=javascript:editarColumna('" + rowObject.codigo +"'); title='Editar'>";
				//botones += "<img src='../../opera/img/editar.png' border='0' title='Editar'/></a>&emsp;";
			    botones +="<span class='ui-icon ui-icon-pencil'></span></a></div>&nbsp;";
				botones += "<div style='display: inline-block;'>";
			    botones += "<a href=javascript:eliminarColumna('" + rowObject.codigo +"'); title='Eliminar'>";
				//botones += "<img src='../../opera/img/cancel_16x16.png' border='0' title='Eliminar'/></a>&emsp;";
			    botones +="<span class='ui-icon ui-icon-trash' ></span></a></div>";
				botones += "</center>";
		}else{
			botones += "<center>";
			botones += "<div style='display: inline-block;' class='ui-state-disabled'>";
		    //botones += "<a href=javascript:editarColumna('" + rowObject.codigo +"'); title='Editar' class='ui-state-disabled'>";
		    botones +="<span class='ui-icon ui-icon-pencil'></span></div>&nbsp;";
			botones += "<div style='display: inline-block;' class='ui-state-disabled' >";
		   // botones += "<a href=javascript:eliminarColumna('" + rowObject.codigo +"'); title='Eliminar'>";
			//botones += "<img src='../../opera/img/cancel_16x16.png' border='0' title='Eliminar'/></a>&emsp;";
		    botones +="<span class='ui-icon ui-icon-trash' ></span></div>";
		    botones += "</center>";
		}
		
		return botones;		
	};
	
	$('input').keyup(function(event) {
		var tecla = event.which;
	    if(tecla==37 || tecla==38 || tecla==39 || tecla==40 || tecla==27){
	    }
	    else{
	    	this.value = this.value.toLocaleUpperCase();
	    }
	});
	
	listarEstadosFormatoDos("estadoProductoReg");
	$("#estadoProductoReg").val('A');
	$("#estadoProductoReg").attr("disabled", true);
	
	jQuery("#prodColumnGrid")
	.jqGrid(
			{	
				colNames : ['Codigo','codigoCatalogo','Key', 'Campo Obligatorio','Salida','Pos Ini','Pos Fin','Columna', 'codigoTipoDato', 'Tipo de Dato', 'Long.', 'estado', 'Estado', 'Opciones', 'format fecha', 'long Sal','Column Editable'],
				colModel : [ 
					{
						name : 'codigo',
						index : 'codigo',
						hidden : true
					},{
						name : 'codigoCatalogo',
						index : 'codigoCatalogo',
						hidden : true
					},{
						name : 'esLlave',
						index : 'esLlave',
						width : 50,
						formatter:formatoEsKey,
						sortable : false,
						resizable : false,
						align : "center"
					},{
						name : 'esObligatorio',
						index : 'esObligatorio',
						width : 110 ,
						formatter:formatoEsOblig,
						sortable : false,
						resizable : false,
						align : "center"
					},{
						name : 'esColumnaSalida',
						index : 'esColumnaSalida',
						width : 50,
						formatter:formatoEsSalida,
						sortable : false,
						resizable : false,
						align : "center"
					},{
						name : 'salidaPosiIni',
						index : 'salidaPosiIni',
						hidden : true
					},{
						name : 'salidaPosiFin',
						index : 'salidaPosiFin',
						hidden : true
					},{
						name : 'nombreColumnCatalog',
						index : 'nombreColumnCatalog',
						width : 220,
						sortable : false,
						resizable : false
					},{
						name : 'codigoTipoDato',
						index : 'codigoTipoDato',
						hidden : true
					},{
						name : 'nombreTipoDato',
						index : 'nombreTipoDato',
						width : 150,
						sortable : false,
						resizable : false
					}, {
						name : 'longitudCol',
						index : 'longitudCol',
						width : 50,
						sortable : false,
						resizable : false,
						align : "center"
					},{
						name : 'estado',
						index : 'estado',
						hidden : true
					}, {
						name : 'nombreEstado',
						index : 'nombreEstado',
						width : 80,
						sortable : false,
						resizable : false,
						align : "center"
					},{
						name : 'opciones',
						index : 'codigo',
						width : 70,
						formatter:opciones,
						sortable : false,
						resizable : false,
						title : false
					},{
						name : 'formatoFecha',
						index : 'formatoFecha',
						hidden : true
					}
					,{
						name : 'longitudSalida',
						index : 'longitudSalida',
						hidden : true
					},{
						name : 'columnaEditable',
						index : 'columnaEditable',
						hidden : true
					}
				],
				height: 250,
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#pgrilla_mantenimiento_re_producto',
				width: '100%',
				viewrecords : true,
				scrollOffset: 0 //Not space column last
			});
	
	$('#vid_persona_natural').change(eventoValPersonaNatural);
	$('#vid_persona_juridica').change(eventoValPersonaJuridica);
	$('#tieneValIdentidad').change(eventoTieneValiIden);
	
	//eventoValPersonaNatural();
	//eventoValPersonaJuridica();
	eventoTieneValiIden();
});

function volverMantProducto(){
	var form = document.getElementById("fRegProducto");
	form.method = "POST";
	form.action = "mantenimiento-productos.htm";
	form.submit();
}

function crearProducto(){
	
	bloquearPantalla();
	
	var formulario = new Object();
	formulario.nombreProd = $("#nombreProd").val();
	formulario.nombreTbl = $("#nombreTbl").val();
	formulario.nombreArchSalida = $("#nombreArchSalida").val();
	formulario.estadoProductoReg = $("#estadoProductoReg").val();
	$.ajax({
		url : "guardar-producto.json",
		data: formulario,
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
		
		desbloquearPantalla();
		
		if(jsonData.respuesta==VG_RESPUESTA_OK){
			
			$("#tbl_detalle_producto").css("display", "block");
			$("#bGuardar").css("display", "block");
			$("#bCrearProd").css("display", "none");
			$("#rCodProducto").val(jsonData.objeto);
			$("#nombreTbl").attr("disabled", true);
			listarComboValIden("vid_tipo_documento");
			listarComboValIden("vid_num_documento");
			listarComboValIden("slc_persona_natural");
			listarComboValIden("slc_persona_juridica");
			mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
		}
		else if(jsonData.respuesta==VG_RESPUESTA_ERROR_VALIDACION){
			
			renderizarListaMensajes(jsonData.listaMensajesValidacion, 'msgsValidacionesRegistrarProducto');
			
		}else if (jsonData.respuesta==VG_RESPUESTA_ERROR) {
			
			mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
		}
		
		actualizarGrillaColumnas();
	});

}
	
	function agregarColumna(){
		
		bloquearPantalla();
		
		$.ajax({
			url : "registro-agregar-columna.htm",
			type : "GET",
			async : false,
			cache : false
		}).done(function(html) {
			
			desbloquearPantalla();
			
			$("#agregarColumna").html(html);
			crearPopUpTop("agregarColumna", 600, 'Agregar Columna', 150);
			
			$.getJSON("get-position.json",{codigoProducto: $( "#rCodProducto" ).val()},function(data){
				
				$("#rPosicionIni").text(data.objeto);
				$("#rPosicionIniHidden").val(data.objeto);
				
			});
		});
		
	}

	function eventoTieneValiIden(){
		if($('#tieneValIdentidad').prop('checked')) {
	    	$("#fsValidacionIdentidad").css("display", "block");
	    }
	    else{
	    	$("#fsValidacionIdentidad").css("display", "none");
	    	$("#vid_persona_juridica").prop('checked',false);
	    	$("#vid_persona_natural").prop('checked',false);
	    	$('#vid_persona_natural').trigger("change");
	  	    $('#vid_persona_juridica').trigger("change");
	  	    document.getElementById('slc_persona_juridica').selectedIndex = -1;
	    	document.getElementById('slc_persona_natural').selectedIndex = -1;
	    }
	}

	function eventoValPersonaNatural(){
		if($('#vid_persona_natural').prop('checked')) {
	    	$("#tbl_persona_natural").css("display", "block");
	    	$("#tbl_persona_juridica").css("display", "none");
	    	$("#vid_persona_juridica").prop('checked',false);
	    	 //Eliminamos los selecteds
	    	document.getElementById('slc_persona_juridica').selectedIndex = -1;
	    	document.getElementById('slc_persona_natural').selectedIndex = -1;
	    }else{
	    	$("#tbl_persona_natural").css("display", "none");
	    }
	}

	function eventoValPersonaJuridica(){
		if($('#vid_persona_juridica').prop('checked')) {
	    	$("#tbl_persona_juridica").css("display", "block");
	    	$("#tbl_persona_natural").css("display", "none");
	    	$("#vid_persona_natural").prop('checked',false);
	   	 	//	Eliminamos los selecteds
	    	document.getElementById('slc_persona_natural').selectedIndex = -1;
	    	document.getElementById('slc_persona_juridica').selectedIndex = -1;
	    }else{
	    	$("#tbl_persona_juridica").css("display", "none");
	    	
	    }
	}
	
	function guardarProducto(){
		bloquearPantalla();
		
		var formulario = new Object();
		
		formulario.codigoProducto = $( "#rCodProducto" ).val();
		if($("#tieneValIdentidad").prop('checked')){
			formulario.tieneValIdentidad = '1';
		}else{
			formulario.tieneValIdentidad = '0';
		}
		formulario.nombreProd = $("#nombreProd").val();
		formulario.nombreArchSalida = $("#nombreArchSalida").val();
		formulario.vid_tipo_documento = $("#vid_tipo_documento").val();
		formulario.vid_num_documento = $("#vid_num_documento").val();
		if($("#vid_persona_natural").prop('checked')){
			formulario.vid_persona_natural = '1';
		}else{
			formulario.vid_persona_natural = '0';
		}
		formulario.slc_persona_natural = ($( "#slc_persona_natural" ).val() || []).join( "," );
		
		if($("#vid_persona_juridica").prop('checked')){
			formulario.vid_persona_juridica = '1';
		}else{
			formulario.vid_persona_juridica = '0';
		}
		formulario.slc_persona_juridica = ($( "#slc_persona_juridica" ).val() || []).join( "," );
		
		if($("#vid_clientes_esp").prop('checked')){
			formulario.vid_clientes_esp = '1';
		}else{
			formulario.vid_clientes_esp = '0';
		}
		
		if($("#vid_filtros_ley").prop('checked')){
			formulario.vid_filtros_ley = '1';
		}else{
			formulario.vid_filtros_ley = '0';
		}
		
		
		$.ajax({
			url : "actualizarProducto.json",
			data: formulario,
			type : "POST",
			async : false,
			cache : false
		}).done(function(jsonData) {
			
			desbloquearPantalla();
			
			if(jsonData.respuesta==VG_RESPUESTA_OK){
				/*PENDIENTE: FALTA LIMPIAR LOS DATOS. TAREA PARA EL LUNES*/
				$("#tbl_detalle_producto").css("display", "none");
				$("#bGuardar").css("display", "none");
				$("#bCrearProd").css("display", "block");
				$("#nombreTbl").attr("disabled", false);
				$("#tieneValIdentidad").prop('checked',false);
				$("#vid_persona_natural").prop('checked',false);
				$("#vid_persona_juridica").prop('checked',false);
				$("#vid_clientes_esp").prop('checked',false);
				$("#vid_filtros_ley").prop('checked',false);
				
				$("#fsValidacionIdentidad").css("display", "none");
				
				$("#nombreProd").val("");
				$("#nombreTbl").val("");
				$("#nombreArchSalida").val("");
				
				mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
			}
			else if(jsonData.respuesta==VG_RESPUESTA_ERROR_VALIDACION){
				
				renderizarListaMensajes(jsonData.listaMensajesValidacion, 'msgsValidacionesRegistrarProducto');
				
			}else if (jsonData.respuesta==VG_RESPUESTA_ERROR) {
				
				mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
				
			}
			
		});
		
	}	
	
	function actualizarGrillaColumnas(){
		var parametros=new Object();
		parametros.codigoProducto = $( "#rCodProducto" ).val();
		parametros.esLlave = "%";
		parametros.esOblig	= "%";
		parametros.esColumnSal	= "%";
		parametros.esColumnEdit	= "%";
		parametros.estado	= "%";
		
		$("#prodColumnGrid").jqGrid('setGridParam',
				{
				url : 'listar-columnas-producto.json',
				postData: parametros,
				datatype : "json",
				mtype : 'POST',
				page:1
				}).trigger('reloadGrid');
	}
	
	function listarComboValIden(nombre){
		
		limpiarCombo(nombre);
		var parametros=new Object();
		parametros.codigoProducto = $( "#rCodProducto" ).val();
		parametros.esLlave = "%";
		parametros.esOblig	= "1";
		parametros.esColumnSal	= "%";
		parametros.esColumnEdit	= "1";
		parametros.estado	= "A";
		$.ajax({
			  url: "listar-columnas-producto2.json",
			  data: parametros,
			  dataType: "json",
			  type: "POST",
			  async: false,
			  cache: false
		}).done(function(jsonData) {
			
			$.each(jsonData.rows,function(key,val) {
			    $('#'+nombre).append('<option value="'+ val.codigo + '">' + val.nombreColumnCatalog + '</option>');
			});
			
		});
		
	}

	function eliminarColumna(codigo){
		
		var accionPreEjecucion = "confirmarEliminColumProd('"+codigo+"')";
		var accionPostEjecucion = "actualizarGrillaColumnas()";
		
		mensajeConfirmacionNuevo(accionPreEjecucion, accionPostEjecucion);
		
	}
	
	function editarColumna(codigo) {
		bloquearPantalla();
		$.ajax({
			url : "editar-columna.htm",
			type : "GET",
			async : false,
			cache : false,
			data:{ "codigoProducto":$( "#rCodProducto" ).val()}
		}).done(function(html) {
			
			var data=undefined;
			var gsr = $('#prodColumnGrid').jqGrid('getGridParam', 'selrow');
			if (gsr) {
				data = $('#prodColumnGrid').jqGrid('getRowData', gsr);
			}
			desbloquearPantalla();
			$("#editarColumna").html(html);
			crearPopUpTop("editarColumna",600, 'Editar Columna', 150);

			//alert(data.codigo +' '+ data.esObligatorio );
			
			//Cargar datos iniciales
			$("#eCodigoColumna").val(data.codigo);
			
			if(data.esLlave == 'SI')
			{ $("#eEsCampoKey").prop('checked', true); }
			else{ $("#eEsCampoKey").prop('checked', false);}
			
			if(data.esObligatorio == 'SI')
			{ $("#eEsCampoOblig").prop('checked', true); }
			else{ $("#eEsCampoOblig").prop('checked', false);}
			
			$("#eColumna").val(data.codigoCatalogo);
			$("#eEstadoPrd").val(data.estado);
			$("#eTipoDato").val(data.codigoTipoDato);
			$("#eLongitud").val(data.longitudCol);
			$("#eFormatoFecha").val(data.formatoFecha);
	
			if(data.esColumnaSalida == 'SI')
			{ $("#eEsCampoSalida").prop('checked', true); 
			  $("#eTblPosiciones").css("display", "block");
			}
			else{ 
				$("#eEsCampoSalida").prop('checked', false);
				$("#eTblPosiciones").css("display", "none");	
			}
			
			$("#ePosicionIni").val(data.salidaPosiIni);
			$("#ePosicionLong").val(data.longitudSalida);
			
			setValidacionesSelect($("#eCodigoColumna").val());
			
		});
	}

function setValidacionesSelect(codigoProdCol){
	var parametros=new Object();
	parametros.codigoProdCol = codigoProdCol;
	
	$.ajax({
		  url: "obtener-vali-column.json",
		  data: parametros,
		  dataType: "json",
		  type: "POST",
		  async: false,
		  cache: false
	}).done(function(jsonData) {
		
		$.each(jsonData,function(key,val) {
		    $("#eValidaciones option[value='" + val.codigoValidacion + "']").prop("selected", true);
		});
		
	});
}

	function confirmarEliminColumProd(codigo){
		
		bloquearPantalla();
		
		var parametros=new Object();
		parametros.codigoColumn = codigo;
		parametros.codigoProducto = $( "#rCodProducto" ).val();
		
		$.ajax({
			  url: "eliminar-columna-producto.json",
			  data: parametros,
			  dataType: "json",
			  type: "POST",
			  async: false,
			  cache: false
		}).done(function(jsonData) {
			
			desbloquearPantalla();
			
			if(jsonData.respuesta==VG_RESPUESTA_OK){
				
				mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
				
				listarComboValIden("vid_tipo_documento");
			    listarComboValIden("vid_num_documento");
				listarComboValIden("slc_persona_natural");
				listarComboValIden("slc_persona_juridica");
				
				var vid_tipo_documento = $("#vid_tipo_documento").val();
				
				if (vid_tipo_documento == null || vid_tipo_documento == "") {
					$('#tieneValIdentidad').prop('checked',false);
					
				}
				
				eventoTieneValiIden();
				
			}else if (jsonData.respuesta==VG_RESPUESTA_ERROR) {
				
				mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
				
			}
			
		});
		
	}
	