var tamanioBaseGrilla;

$(document)
		.ready(
				function() {

					$("#resultado_busqueda").css("display", "none");

					$("#autoEntidad").autocomplete({
						source : "autocompleteEntidades.json",
						select : function(event, ui) {
							$("#autoEntidad").val(ui.item.label);
							$("#autoEntidad-id").val(ui.item.value);
							return false;
						},
						change : function(event, ui) {
							$("#autoEntidad-id").val(ui.item ? ui.item.value : '');
							console.log($("#autoEntidad-id").val());
						}
					});

					listarEstadosCaracteres("estadoCE");

					var opciones = function(cellVal, options, rowObject) {
						var botones = "<center>";
						botones += "<div style='display: inline-block;'>";
						botones += "<a href=javascript:editarCaracterEspecial('"
								+ options.rowId + "'); title='Editar'>";
						botones += "<span class='ui-icon ui-icon-pencil'></span></a></div>&nbsp;";
						botones += "<div style='display: inline-block;'>";
						botones += "<a href=javascript:eliminarCaracterEspecial('"
								+ options.rowId + "'); title='Eliminar'>";
						botones += "<span class='ui-icon ui-icon-trash' ></span></a></div>";
						botones += "</center>";
						return botones;
					};

					var formatoEstado = function(cellVal, options, rowObject) {
						var estado = "";
						if (rowObject.estado == 'A') {
							estado = "ACTIVO";
						} else if (rowObject.estado == 'I') {
							estado = "INACTIVO";
						} else {
							estado = "PENDIENTE";
						}
						return estado;
					};

					jQuery("#grilla_CE").jqGrid(
							{
								url : 'listarCaracterEspeciales.json',
								datatype : "json",
								mtype : 'POST',
								colNames : [ '', 'Entidad', 'Origen',
										'Equivalente', 'Estado', 'Opciones' ],
								colModel : [ {
									name : 'codigo',
									index : 'codigo',
									hidden : true
								}, {
									name : 'nombreEntidad',
									index : 'nombreEntidad',
									width : 100,
									sortable : false
								}, {
									name : 'origen',
									index : 'origen',
									width : 100,
									sortable : false
								}, {
									name : 'equivalente',
									index : 'equivalente',
									width : 100,
									sortable : false
								}, {
									name : 'estado',
									index : 'estado',
									width : 30,
									formatter : formatoEstado,
									sortable : false
								}, {
									name : 'opciones',
									index : 'codigo',
									width : 30,
									formatter : opciones,
									sortable : false
								} ],
								rowNum : 10,
								height : 250,
								width : 900,
								rowList : [ 10, 20, 30 ],
								pager : '#pgrilla_CE',
								viewrecords : true,
								onSelectRow : function(id) {

								}
							});

					tamanioBaseGrilla = jQuery("#grilla_CE").getGridParam().height;

					$('#grilla_CE').jqGrid(
							'setGridParam',
							{
								beforeRequest : function() {

									var cantidadXPagina = jQuery("#grilla_CE")
											.getGridParam().rowNum;
									var alto = Number(tamanioBaseGrilla)
											+ (Number(cantidadXPagina) * 3);

									if (cantidadXPagina == "10") {
										alto = tamanioBaseGrilla;
									}
									$('#grilla_CE').jqGrid('setGridHeight',
											alto);
								}
							});

				});

function buscarCRCTREspecial() {
	$("#resultado_busqueda").css("display", "block");
	
	var codigo = $("#autoEntidad").val();
	var estado = $("#estadoCE").val();

	var parametros = new Object();
	parametros.codigo = codigo;
	parametros.estado = estado;

	$("#grilla_CE").jqGrid('setGridParam', {
		url : 'listarCaracterEspeciales.json',
		postData : parametros,
		datatype : 'json',
		mtype : 'POST',
		page : 1
	}).trigger('reloadGrid');
}

function nuevoCRCTREspecial() {
	bloquearPantalla();
	$.ajax({
		url : "registrar-crctr-especial.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(
			function(html) {
				desbloquearPantalla();
				$("#registrarCRCTREspecial").html(html);
				crearPopUp("registrarCRCTREspecial", 200, 600,
						'Registrar Caracteres Especiales');

				$("#newAutoEntidad").autocomplete({
					source : "autocompleteEntidades.json",
					select : function(event, ui) {
						$("#newAutoEntidad").val(ui.item.label);
						$("#newAutoEntidad-id").val(ui.item.value);
						return false;
					}
				});

				listarEstadosCaracteres("newEstadoCE");
			});
}

function editarCaracterEspecial(rowId) {
	bloquearPantalla();
	$.ajax({
		url : "actualizar-crctr-especial.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(
			function(html) {
				var objeto = $("#grilla_CE").jqGrid('getRowData', rowId);

				desbloquearPantalla();
				$("#editarCRCTREspecial").html(html);
				crearPopUp("editarCRCTREspecial", 200, 600,
						'Actualizar Caracter Especial');

				listarEstadosCaracteres("updEstadoCE");
				$("#hdnCodigo").val(objeto.codigo);
				$("#updEntidad").text(objeto.nombreEntidad);
				$("#updOrigen").val(objeto.origen);
				$("#updEquivalente").val(objeto.equivalente);
				$("#updEstadoCE").val(objeto.estado);
			});
}

function eliminarCaracterEspecial(rowId) {
	var accionPreEjecucion = "confirmarEliminarCaracterEspecial('" + rowId
			+ "')";
	var accionPostEjecucion = "actualizarListaCaracteresEspeciales()";

	mensajeConfirmacionNuevo(accionPreEjecucion, accionPostEjecucion);
}

function confirmarEliminarCaracterEspecial(rowId) {
	var objeto = $("#grilla_CE").jqGrid('getRowData', rowId);

	bloquearPantalla();
	var parametros = new Object();
	parametros.codigo = objeto.codigo;

	$.ajax({
		url : "eliminarCaracterEspecial.json",
		data : parametros,
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
		desbloquearPantalla();
		if (jsonData.respuesta == VG_RESPUESTA_OK) {
			mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
		} else if (jsonData.respuesta == VG_RESPUESTA_ERROR) {
			mostrarMensaje(jsonData.tipoMensaje, jsonData.mensaje);
		}
	});

}

function actualizarListaCaracteresEspeciales() {
	$("#grilla_CE").jqGrid('setGridParam').trigger('reloadGrid');
}
