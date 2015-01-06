function uploadFile() {
	var formData = new FormData();
	var file = $('#fileupload').get(0).files[0];
	
	if (file == undefined) {
		mostrarMensaje(VG_TIPO_MENSAJE_WARNING, 'Archivo no seleccionado');
		return;
	}
	
	formData.append('file', file);
	
	var acceptFileTypes = /(\.|\/)(txt|xls|xlsx)$/i;
    if(file.type.length && !acceptFileTypes.test(file.name)) {
    	mostrarMensaje(VG_TIPO_MENSAJE_WARNING, 'Tipo de Archivo no Aceptado');
		return;
    }
    
    $.ajax({
		url : 'uploadFile.htm',
		type : "POST",
		data : formData,
		cache : false,
		contentType : false,
		processData : false,
		async : false,
		error : function(xhr, textStatus, errorThrown) {			
			mostrarMensaje(VG_TIPO_MENSAJE_ERROR, 'An error occurred! ' + errorThrown);
			return;
		},
		success : function(data, textStatus) {
			procesar(formData);
		}
	});
    actualizarLista();
}

function procesar(formData) {
	

	jQuery("#grilla_Entidad").jqGrid(
			{
				url : 'cargaEntidad.json',
				datatype : "json",
				mtype : 'POST',
				colNames : [ 'Codigo SCI', 'Codigo Host', 'Ruc', 'Nombre',
						'Direccion', 'Giro', 'Pais', 'Telefono' ],
				colModel : [ {
					name : 'codigo',
					index : 'codigo',
					width : 50,
					sortable : false
				}, {
					name : 'codigoHost',
					index : 'codigoHost',
					width : 50,
					sortable : false
				}, {
					name : 'ruc',
					index : 'ruc',
					width : 50,
					sortable : false
				}, {
					name : 'nombre',
					index : 'nombre',
					width : 100,
					sortable : false
				}, {
					name : 'direccion',
					index : 'direccion',
					width : 150,
					sortable : false
				}, {
					name : 'giro',
					index : 'giro',
					width : 50,
					sortable : false
				}, {
					name : 'pais',
					index : 'pais',
					width : 50,
					sortable : false
				}, {
					name : 'telefono',
					index : 'telefono',
					width : 50,
					sortable : false
				} ],
				rowNum : 10,
				height : 250,
				width : 900,
				rowList : [ 10, 20, 30 ],
				pager : '#pgrilla_Entidad',
				viewrecords : true,
				sortorder : "desc",
				multiselect : true,
				onSelectRow : function(aRowids, status, e) {
					var ch = jQuery("#grilla_Entidad").find(
							'#' + aRowids + ' input[type=checkbox]').prop(
							'checked');
					if (ch) {
						jQuery('#grilla_Entidad').find(
								'#' + 'jqg_grilla_Entidad_' + aRowids
										+ ' input[type=checkbox]').prop(
								'checked', false);
						jQuery('#grilla_Entidad').editRow(aRowids);
						$("#grilla_Entidad").focus();
					} else {
						jQuery('#grilla_Entidad').find(
								'#' + 'jqg_grilla_Entidad_' + aRowids
										+ ' input[type=checkbox]').prop(
								'checked', true);
						jQuery('#grilla_Entidad').restoreRow(aRowids);
					}
				}
			});

	jQuery("#grilla_SubEntidad").jqGrid(
			{
				url : 'cargaSubEntidad.json',
				datatype : "json",
				mtype : 'POST',
				colNames : [ 'Codigo SEnti', 'Nombre', 'Codigo SCI',
						'Codigo Host', 'Host', 'Ruc', 'Direccion', 'Jefe',
						'Telefono' ],
				colModel : [ {
					name : 'codigo',
					index : 'codigo',
					width : 50,
					sortable : false
				}, {
					name : 'nombre',
					index : 'nombre',
					width : 100,
					sortable : false
				}, {
					name : 'codigoEnti',
					index : 'codigoEnti',
					width : 50,
					sortable : false
				}, {
					name : 'codigoHost',
					index : 'codigoHost',
					width : 50,
					sortable : false
				}, {
					name : 'oficina',
					index : 'oficina',
					width : 50,
					sortable : false
				}, {
					name : 'ruc',
					index : 'ruc',
					width : 50,
					sortable : false
				}, {
					name : 'direccion',
					index : 'direccion',
					width : 150,
					sortable : false
				}, {
					name : 'jefe',
					index : 'jefe',
					width : 50,
					sortable : false
				}, {
					name : 'telefono',
					index : 'telefono',
					width : 50,
					sortable : false
				} ],
				rowNum : 10,
				height : 250,
				width : 900,
				rowList : [ 10, 20, 30 ],
				pager : '#pgrilla_SubEntidad',
				viewrecords : true,
				sortorder : "desc",
				multiselect : true,
				onSelectRow : function(aRowids, status, e) {
					var ch = jQuery("#grilla_SubEntidad").find(
							'#' + aRowids + ' input[type=checkbox]').prop(
							'checked');
					if (ch) {
						jQuery('#grilla_SubEntidad').find(
								'#' + 'jqg_grilla_SubEntidad_' + aRowids
										+ ' input[type=checkbox]').prop(
								'checked', false);
						jQuery('#grilla_SubEntidad').editRow(aRowids);
						$("#grilla_SubEntidad").focus();
					} else {
						jQuery('#grilla_SubEntidad').find(
								'#' + 'jqg_grilla_SubEntidad_' + aRowids
										+ ' input[type=checkbox]').prop(
								'checked', true);
						jQuery('#grilla_SubEntidad').restoreRow(aRowids);
					}
				}
			});

	jQuery("#grilla_Oficina").jqGrid(
			{
				url : 'cargaOficina.json',
				datatype : "json",
				mtype : 'POST',
				colNames : [ 'Codigo Ofic', 'Nombre', 'Codigo SCI',
						'Codigo Host', 'Direccion', 'Jefe', 'Telefono' ],
				colModel : [ {
					name : 'codigoOfi',
					index : 'codigoOfi',
					width : 50,
					sortable : false
				}, {
					name : 'nombreOfi',
					index : 'nombreOfi',
					width : 100,
					sortable : false
				}, {
					name : 'codigoEnti',
					index : 'codigoEnti',
					width : 50,
					sortable : false
				}, {
					name : 'codigoHost',
					index : 'codigoHost',
					width : 50,
					sortable : false
				}, {
					name : 'direccionOfi',
					index : 'direccionOfi',
					width : 150,
					sortable : false
				}, {
					name : 'jefeOfi',
					index : 'jefeOfi',
					width : 50,
					sortable : false
				}, {
					name : 'telefonoOfi',
					index : 'telefonoOfi',
					width : 50,
					sortable : false
				} ],
				rowNum : 10,
				height : 250,
				width : 900,
				rowList : [ 10, 20, 30 ],
				pager : '#pgrilla_Oficina',
				viewrecords : true,
				sortorder : "desc",
				multiselect : true,
				onSelectRow : function(aRowids, status, e) {
					var ch = jQuery("#grilla_Oficina").find(
							'#' + aRowids + ' input[type=checkbox]').prop(
							'checked');
					if (ch) {
						jQuery('#grilla_Oficina').find(
								'#' + 'jqg_grilla_Oficina_' + aRowids
										+ ' input[type=checkbox]').prop(
								'checked', false);
						jQuery('#grilla_Oficina').editRow(aRowids);
						$("#grilla_Oficina").focus();
					} else {
						jQuery('#grilla_Oficina').find(
								'#' + 'jqg_grilla_Oficina_' + aRowids
										+ ' input[type=checkbox]').prop(
								'checked', true);
						jQuery('#grilla_Oficina').restoreRow(aRowids);
					}
				}
			});

	jQuery("#grilla_Usuario").jqGrid(
			{
				url : 'cargaUsuario.json',
				datatype : "json",
				mtype : 'POST',
				colNames : [ 'Codigo Usu', 'Nombre', 'Codigo SCI',
						'Codigo Host', 'Codigo Ofic', 'Codigo SubEnt', 'Cargo',
						'Crea', 'Telf' ],
				colModel : [ {
					name : 'codigoUsu',
					index : 'codigoUsu',
					width : 50,
					sortable : false
				}, {
					name : 'nombreUsu',
					index : 'nombreUsu',
					width : 100,
					sortable : false
				}, {
					name : 'codigoSCI',
					index : 'codigoSCI',
					width : 50,
					sortable : false
				}, {
					name : 'codigoUsuHost',
					index : 'codigoUsuHost',
					width : 50,
					sortable : false
				}, {
					name : 'codigoOfi',
					index : 'codigoOfi',
					width : 50,
					sortable : false
				}, {
					name : 'codigoSubenti',
					index : 'codigoSubenti',
					width : 50,
					sortable : false
				}, {
					name : 'cargoUsu',
					index : 'cargoUsu',
					width : 50,
					sortable : false
				}, {
					name : 'fechaCreaSCI',
					index : 'fechaCreaSCI',
					width : 50,
					sortable : false
				}, {
					name : 'telefonoUsu',
					index : 'telefonoUsu',
					width : 50,
					sortable : false
				} ],
				rowNum : 10,
				height : 250,
				width : 900,
				rowList : [ 10, 20, 30 ],
				pager : '#pgrilla_Usuario',
				viewrecords : true,
				sortorder : "desc",
				multiselect : true,
				onSelectRow : function(aRowids, status, e) {
					var ch = jQuery("#grilla_Usuario").find(
							'#' + aRowids + ' input[type=checkbox]').prop(
							'checked');
					if (ch) {
						jQuery('#grilla_Usuario').find(
								'#' + 'jqg_grilla_Usuario_' + aRowids
										+ ' input[type=checkbox]').prop(
								'checked', false);
						jQuery('#grilla_Usuario').editRow(aRowids);
						$("#grilla_Usuario").focus();
					} else {
						jQuery('#grilla_Usuario').find(
								'#' + 'jqg_grilla_Usuario_' + aRowids
										+ ' input[type=checkbox]').prop(
								'checked', true);
						jQuery('#grilla_Usuario').restoreRow(aRowids);
					}
				}
			});
}

function actualizarLista() {
	$("#grilla_Entidad").jqGrid('setGridParam').trigger('reloadGrid');
	$("#grilla_SubEntidad").jqGrid('setGridParam').trigger('reloadGrid');
	$("#grilla_Oficina").jqGrid('setGridParam').trigger('reloadGrid');
	$("#grilla_Usuario").jqGrid('setGridParam').trigger('reloadGrid');
}

function processFiles() {
	var selectedRowIds = $("#grilla_Entidad").getGridParam("selarrrow");
	var params = "";
	for (var i = 0; selectedRowIds[i]; i++) {
		params += "ids=" + selectedRowIds[i] + "&";
	}
	$.ajax({
		url : 'processSelectedEntidad.json',
		data : params,
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {

	});

	var selectedRowIds = $("#grilla_SubEntidad").getGridParam("selarrrow");
	var params = "";
	for (var i = 0; selectedRowIds[i]; i++) {
		params += "ids=" + selectedRowIds[i] + "&";
	}
	$.ajax({
		url : 'processSelectedSubEntidad.json',
		data : params,
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {

	});

	var selectedRowIds = $("#grilla_Oficina").getGridParam("selarrrow");
	var params = "";
	for (var i = 0; selectedRowIds[i]; i++) {
		params += "ids=" + selectedRowIds[i] + "&";
	}
	$.ajax({
		url : 'processSelectedOficina.json',
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {

	});

	var selectedRowIds = $("#grilla_Usuario").getGridParam("selarrrow");
	var params = "";
	for (var i = 0; selectedRowIds[i]; i++) {
		params += "ids=" + selectedRowIds[i] + "&";
	}
	$.ajax({
		url : 'processSelectedUsuario.json',
		data : params,
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {

	});

}