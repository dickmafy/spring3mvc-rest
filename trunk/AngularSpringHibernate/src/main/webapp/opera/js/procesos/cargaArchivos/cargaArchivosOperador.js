var tamanioBaseGrilla;

$(document).ready(
		function() {

			$("#cmbProductoId").css("display", "none");
			$("#cmbProducto").css("display", "none");

			$("#autoEntidad").autocomplete({
				source : "autocompleteEntidades.json",
				select : function(event, ui) {
					$("#autoEntidad").val(ui.item.label);
					$("#hdnAutoEntidad").val(ui.item.value);
					var codigoEntidad = ui.item.value;
					cmbProducto(codigoEntidad);
					return false;
				}
			});

			limpiarCombo("cmbTipoCarga");
			$.ajax({
				url : 'listarTipoCarga.json',
				dataType : 'json',
				type : 'POST',
				async : false,
				cache : false
			}).done(
					function(jsonData) {
						$.each(jsonData, function(key, val) {
							ids.push(val);
							$('#cmbTipoCarga').append(
									'<option value="' + val.codigo + '">'
											+ val.nombre + '</option>');
						});
					});
			
			jQuery("#grilla_archivos")
			.jqGrid(
					{
						url : 'listarArchivos.json',
						datatype : "json",
						mtype : 'POST',
						colNames : [ '', 'Nombre Archivo',
								'Usuario', 'Fecha',
								'Tipo Carga', 'Cantidad','Estado' ],
						colModel : [ {
							name : 'codigo',
							index : 'codigo',
							width : 1,
							sortable : false,
							hidden : true
						}, {
							name : 'nombreOrigen',
							index : 'nombreOrigen',
							width : 100,
							sortable : false
						}, {
							name : 'codigoUsuario',
							index : 'codigoUsuario',
							width : 1,
							sortable : false,
							hidden : true
						}, {
							name : 'nombreUsuario',
							index : 'nombreUsuario',
							width : 100,
							sortable : false
						}, {
							name : 'fechaCarga',
							index : 'fechaCarga',
							width : 100,
							sortable : false
						}, {
							name : 'tipoCarga',
							index : 'tipoCarga',
							width : 1,
							sortable : false,
							hidden : true
						}, {
							name : 'nombreTipoCarga',
							index : 'nombreTipoCarga',
							width : 100,
							sortable : false
						}, {
							name : 'numRegistrosEnviados',
							index : 'numRegistrosEnviados',
							width : 100,
							sortable : false
						}, {
							name : 'estado',
							index : 'estado',
							width : 50,
							sortable : false
						}],
						rowNum : 10,
						height : 250,
						width : 900,
						rowList : [ 10, 20, 30 ],
						pager : '#pgrilla_archivos',
						viewrecords : true,
						onSelectRow : function(id) {

						}
					});
		});

var ids = [];

function cmbProducto(codigoEntidad) {
	$("#cmbProductoId").css("display", "block");
	$("#cmbProducto").css("display", "block");

	limpiarCombo("cmbProducto");
	var parametros = new Object();
	parametros.codigoEntidad = codigoEntidad;

	$.ajax({
		url : 'listarProducto.json',
		data : parametros,
		dataType : 'json',
		type : 'POST',
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData, function(key, val) {
					ids.push(val);
					$('#cmbProducto').append(
							'<option value="' + val.codigo + '">'
									+ val.descripcion + '</option>');
				});
			});
}

function limpiarCombo(nombre) {
	var ddlControl = document.getElementById(nombre);
	ddlControl.options.length = 0;
}

function uploadFile() {
	var formData = new FormData();
	var file = $('#fileupload').get(0).files[0];
	formData.append('file', file);
	
	var uploadErrors = [];
	var acceptFileTypes = /(\.|\/)(txt|xls|xlsx)$/i;
    if(file.type.length && !acceptFileTypes.test(file.name)) {
        uploadErrors.push('Tipo de Archivo no Aceptado');
    }
    
    if(uploadErrors.length > 0) {
        alert(uploadErrors.join("\n"));
    } else {
    	var codigo = $('#cmbProducto').val();
    	var tipoCarga = $('#cmbTipoCarga').val();
    	var producto = new Object();

    	for (var i = 0; i < ids.length; i++) {
    		if (codigo == ids[i].codigo) {
    			producto = ids[i];
    		}
    	}

    	formData.append('tipoCarga', tipoCarga);
    	formData.append('codigo', producto.codigo);
    	formData.append('codigoEstructura', producto.codigoEstructura);
    	formData.append('ultimaVersion', producto.ultimaVersion);
    	formData.append('codigoEntidad', producto.codigoEntidad);
    	formData.append('longitud', producto.longitud);
    	
    	$.ajax({
    		url : 'uploadFile.htm',
    		type : 'POST',
    		data : formData,
    		cache : false,
    		contentType : false,
    		processData : false,
    		async : false,
    		error : function(xhr, textStatus, errorThrown) {
    			alert('An error occurred! ' + errorThrown);
    		},
    		success : function(data, textStatus) {

    		}
    	});

    	actualizarListaArchivos();
    }	
}

function actualizarListaArchivos() {
	$("#grilla_archivos").jqGrid('setGridParam').trigger(
			'reloadGrid');
}