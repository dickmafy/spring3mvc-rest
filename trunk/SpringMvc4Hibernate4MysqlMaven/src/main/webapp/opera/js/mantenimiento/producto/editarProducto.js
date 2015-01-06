$(document).ready(function (){
	
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
	
	
	 
   var parametros1=new Object();
	parametros1.codigoProducto = $( "#rCodProducto" ).val();
	parametros1.esLlave = "%";
	parametros1.esOblig	= "%";
	parametros1.esColumnSal	= "%";
	parametros1.esColumnEdit	= "%";
	parametros1.estado	= "%";

   jQuery("#prodColumnGridEdit").jqGrid(
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
				}],
			height: 250,
			rowNum : 10,
			rowList : [ 10, 20, 30 ],
			pager : '#pgrilla_mantenimiento_re_producto',
			width: '100%',
			viewrecords : true,
			scrollOffset: 0,
			url : 'listar-columnas-producto.json',
			postData: parametros1,
			datatype : "json",
			mtype : 'POST'
			//page:1//Not space column last
		});
 
         //actualizarGrillaColumnas();

	
	
	$.ajax({
		url : "get-editar-producto.json",
		type : "GET",
		async : false,
		cache : false,
		data:{ "codigoProducto":$( "#rCodProducto" ).val()}
	}).done(function(jsonData) {
	   
	  if(jsonData.respuesta==VG_RESPUESTA_OK){
		
	   /*Rellana las cajas del Producto*/
	    $("#nombreProd").val(jsonData.objeto.descripcion);
		$("#nombreArchSalida").val(jsonData.objeto.nombreArchivoSalida);
		$("#nombreTbl").val(jsonData.objeto.nombreTabla);
		$("#nombreTblView").text(jsonData.objeto.nombreTabla);
		
	     listarComboValIden("vid_tipo_documento");
		 listarComboValIden("vid_num_documento");
		 listarComboValIden("slc_persona_natural");
		 listarComboValIden("slc_persona_juridica");
		
		   /*Pregunta si tiene validacion identidad.
		    * 1 = Si tiene.
		    * */ 
			if (jsonData.objeto.tieneValIden=="1") {
		    //Se activa el check
		    
		    $("#fsValidacionIdentidad").css("display", "block");
		    $('#tieneValIdentidad').prop('checked',true);
		    
		     //Selected al combo Tipo Documento
			 $("#vid_tipo_documento").val(jsonData.objeto.codigoColValIdenTipoDoc);
		     //Selected al combo Numero Documento
			 $("#vid_num_documento").val(jsonData.objeto.codigoColValIdenNumDoc);
			 
			 var codPersonas = undefined;
			 var idSelectedPersona = "";
			 //Opcion Persona Natural
		    if(jsonData.objeto.tieneValIdenPerN == "1"){
			  $("#vid_persona_natural").prop('checked',true);
			  $("#tbl_persona_natural").css("display", "block");
			  $("#tbl_persona_juridica").css("display", "none");
			  codPersonas = jsonData.objeto.codigosColValIdenperN.split(",");
			  idSelectedPersona = "slc_persona_natural";
		     //Opcion Persona Juridica
		    }else{
			  $("#vid_persona_juridica").prop('checked',true);
			  $("#tbl_persona_juridica").css("display", "block");
			  $("#tbl_persona_natural").css("display", "none");
			  codPersonas = jsonData.objeto.codigosColValIdenperJ.split(",");
			  idSelectedPersona = "slc_persona_juridica";
			}
		   
		    $.each(codPersonas,function(key,value){
		    	$('#'+idSelectedPersona +" option[value='"+value+"']" ).prop('selected', true);
		    });
		    
			if(jsonData.objeto.tieneValClienteEsp == "1"){
				$("#vid_clientes_esp").prop('checked',true);
			}if(jsonData.objeto.tieneValFiltroLey == "1"){
				$("#vid_filtros_ley").prop('checked',true);
			}

			  }  else{
				  $("#fsValidacionIdentidad").css("display", "none");
				  $('#tieneValIdentidad').prop('checked',false);
			  }
	    }else{
	    	mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
		
	    }

	 });	
	
	  
	  $('#vid_persona_natural').change(eventoValPersonaNatural);
	  $('#vid_persona_juridica').change(eventoValPersonaJuridica);
	  $('#tieneValIdentidad').change(eventoTieneValiIden);
	  
	  eventoTieneValiIden();
	
});
	

	function volverMantProducto(){
		var form = document.getElementById("fRegProducto");
		form.method = "POST";
		form.action = "mantenimiento-productos.htm";
		form.submit();
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
			formulario.vid_tipo_documento = $("#vid_tipo_documento").val();
			formulario.vid_num_documento = $("#vid_num_documento").val();
		}else{
			formulario.tieneValIdentidad = '0';
			//formulario.vid_tipo_documento = '';
			//formulario.vid_num_documento = '';
		}
		formulario.nombreProd = $("#nombreProd").val();
		formulario.nombreArchSalida = $("#nombreArchSalida").val();
	
		if($("#vid_persona_natural").prop('checked')){
			formulario.vid_persona_natural = '1';
			//formulario.slc_persona_natural = ($( "#slc_persona_natural" ).val() || []).join( "," );
			formulario.slc_persona_natural = $("#slc_persona_natural option:selected").map(function(){ return this.value; }).get().join(", ");
		}else{
			formulario.vid_persona_natural = '0';
		}
		
		if($("#vid_persona_juridica").prop('checked')){
			formulario.vid_persona_juridica = '1';
			//formulario.slc_persona_juridica = ($( "#slc_persona_juridica" ).val() || []).join( "," );
			formulario.slc_persona_juridica = $("#slc_persona_juridica option:selected").map(function(){ return this.value; }).get().join(", ");
		}else{
			formulario.vid_persona_juridica = '0';
		}
		
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
				mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
			}
			else if(jsonData.respuesta==VG_RESPUESTA_ERROR_VALIDACION){
				
				renderizarListaMensajes(jsonData.listaMensajesValidacion, 'msgsValidacionesEditarProducto');
				
			}else if (jsonData.respuesta==VG_RESPUESTA_ERROR) {
				
				mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
				
			}
			
		});
		
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
	
	function actualizarGrillaColumnas(){
		var parametros=new Object();
		parametros.codigoProducto = $( "#rCodProducto" ).val();
		parametros.esLlave = "%";
		parametros.esOblig	= "%";
		parametros.esColumnSal	= "%";
		parametros.esColumnEdit	= "%";
		parametros.estado	= "%";
		
		$("#prodColumnGridEdit").jqGrid('setGridParam',
				{
				url : 'listar-columnas-producto.json',
				postData: parametros,
				datatype : "json",
				mtype : 'POST',
				page:1
				}).trigger('reloadGrid');
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
			
			var data = undefined;
			var gsr = $('#prodColumnGridEdit').jqGrid('getGridParam', 'selrow');
			if (gsr) {
				data = $('#prodColumnGridEdit').jqGrid('getRowData', gsr);
			}
			desbloquearPantalla();
			$("#editarColumna").html(html);
			crearPopUpTop("editarColumna",600, 'Editar Columna', 150);


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
			
			if(data.esColumnaSalida == 'SI'){ 
				$("#eEsCampoSalida").prop('checked', true);
				$("#eTblPosiciones").css("display", "block");
			}
			else{ $("#eEsCampoSalida").prop('checked', false);
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
	