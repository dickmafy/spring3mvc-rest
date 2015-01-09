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

			limpiarCombo("cmbExportacion");
			$.ajax({
				url : 'listarTipoExportacion.json',
				dataType : 'json',
				type : 'POST',
				async : false,
				cache : false
			}).done(
					function(jsonData) {
						$.each(jsonData, function(key, val) {
							$('#cmbExportacion').append(
									'<option value="' + val.codigo + '">'
											+ val.nombre + '</option>');
						});
					});
			
			var dates = $("#from, #to")
			.datepicker(
					{
						defaultDate : "+1w",
						changeMonth : true,
						numberOfMonths : 1,
						onSelect : function(selectedDate) {
							var option = this.id == "from" ? "minDate"
									: "maxDate", instance = $(
									this).data("datepicker"), date = $.datepicker
									.parseDate(
											instance.settings.dateFormat
													|| $.datepicker._defaults.dateFormat,
											selectedDate,
											instance.settings);
							dates.not(this).datepicker(
									"option", option, date);
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
	var codigo = $('#cmbProducto').val();
	var tipoCarga = $('#cmbExportacion').val();
	var producto = new Object();

	for (var i = 0; i < ids.length; i++) {
		if (codigo == ids[i].codigo) {
			producto = ids[i];
		}
	}

	var formData = new FormData();
	formData.append('file', $('#fileupload').get(0).files[0]);
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

function actualizarListaArchivos() {
	$("#grilla_archivos").jqGrid('setGridParam').trigger(
			'reloadGrid');
}