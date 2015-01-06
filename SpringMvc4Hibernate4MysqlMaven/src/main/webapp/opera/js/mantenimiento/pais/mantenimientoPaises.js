var tamanioBaseGrilla;

$(document)
		.ready(
				function() {

					var opciones = function(cellVal, options, rowObject) {
						var botones = "<center>";
						botones += "<div style='display: inline-block;'>";
						botones += "<a href=javascript:editarPais('"
								+ options.rowId + "'); title='Editar'>";
						botones += "<span class='ui-icon ui-icon-pencil'></span></a></div>&nbsp;";
						botones += "<div style='display: inline-block;'>";
						botones += "<a href=javascript:eliminarPais('"
								+ options.rowId + "'); title='Eliminar'>";
						botones += "<span class='ui-icon ui-icon-trash' ></span></a></div>";
						botones += "<div style='display: inline-block;'>";
						botones += "<a href=javascript:updParamPais('"
								+ options.rowId + "'); title='Parametros'>";
						botones += "<span class='ui-icon ui-icon-wrench' ></span></a></div>";
						botones += "</center>";
						return botones;
					};

//					var formatoEstado = function(cellVal, options, rowObject) {
//						var estado = "";
//						if (rowObject.estado == 'A') {
//							estado = "ACTIVO";
//						} else {
//							estado = "INACTIVO";
//						}
//
//						return estado;
//					};

					jQuery("#grilla_paises").jqGrid(
							{
								url : 'listarPaises.json',
								datatype : "json",
								mtype : 'POST',
								colNames : [ 'Código', 'Nombre',
										'Nombre Corto', 'Cod', 'Moneda', 'Cod',
										'Idioma', 'Imagen', 'Estado',
										'Opciones' ],
								colModel : [ {
									name : 'codigo',
									index : 'codigo',
									width : 1,
									sortable : false,
									hidden : true
								}, {
									name : 'nombre',
									index : 'nombre',
									width : 150,
									sortable : false
								}, {
									name : 'nombreCorto',
									index : 'nombreCorto',
									width : 100,
									sortable : false
								}, {
									name : 'codigoMoneda',
									index : 'codigoMoneda',
									width : 1,
									sortable : false,
									hidden : true
								}, {
									name : 'nombreMoneda',
									index : 'nombreMoneda',
									width : 100,
									sortable : false
								}, {
									name : 'codigoIdioma',
									index : 'codigoIdioma',
									width : 1,
									sortable : false,
									hidden : true
								}, {
									name : 'nombreIdioma',
									index : 'nombreIdioma',
									width : 100,
									sortable : false
								}, {
									name : 'imagen',
									index : 'imagen',
									width : 100,
									sortable : false
								}, {
									name : 'estado',
									index : 'estado',
									width : 50,
									//formatter : formatoEstado,
									sortable : false
								}, {
									name : 'opciones',
									index : 'codigo',
									width : 50,
									formatter : opciones,
									sortable : false
								} ],
								rowNum : 10,
								height : 250,
								width : 900,
								rowList : [ 10, 20, 30 ],
								pager : '#pgrilla_paises',
								sortname : 'id',
								viewrecords : true,
								sortorder : "desc",
								onSelectRow : function(id) {
								}
							});

					tamanioBaseGrilla = jQuery("#grilla_paises").getGridParam().height;

					$('#grilla_paises')
							.jqGrid(
									'setGridParam',
									{
										beforeRequest : function() {
											var cantidadXPagina = jQuery(
													"#grilla_paises")
													.getGridParam().rowNum;
											var alto = Number(tamanioBaseGrilla)
													+ (Number(cantidadXPagina) * 3);

											if (cantidadXPagina == "10") {
												alto = tamanioBaseGrilla;
											}

											$('#grilla_paises').jqGrid(
													'setGridHeight', alto);

										}
									});

				});

function nuevoPais() {
	bloquearPantalla();
	$.ajax({
		url : "registrarPaises.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(function(html) {
		desbloquearPantalla();
		$("#registrarPais").html(html);
		crearPopUp("registrarPais", 400, 550, 'Registrar Pais');
		listarEstados("estado");
		cmbMoneda("cmbMoneda");
		cmbIdioma("cmbIdioma");
	});
}

function editarPais(rowId) {
	bloquearPantalla();
	$.ajax({
		url : "actualizarPaises.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(function(html) {
		var objeto = $("#grilla_paises").jqGrid('getRowData', rowId);

		desbloquearPantalla();
		$("#editarPais").html(html);
		crearPopUp("editarPais", 400, 550, 'Actualizar Pais');
		listarEstados("updEstado");
		cmbMoneda("updCmbMoneda");
		cmbIdioma("updCmbIdioma");

		$("#hdncodigo").val(objeto.codigo);
		$("#updNombre").val(objeto.nombre);
		$("#updNombreCorto").val(objeto.nombreCorto);
		$("#updImagen").val(objeto.imagen);
		$("#updCmbMoneda").val(objeto.codigoMoneda);
		$("#updCmbIdioma").val(objeto.codigoIdioma);
		$("#updEstado").val(objeto.estado);
	});
}

function updParamPais(rowId) {
	bloquearPantalla();
	$.ajax({
		url : "updParamPais.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(
			function(html) {
				var objeto = $("#grilla_paises").jqGrid('getRowData', rowId);

				desbloquearPantalla();
				$("#parametrosPais").html(html);
				crearPopUp("parametrosPais", 450, 550,
						'Configuración de Parámetros por país');
				listarParametrosPorPais(objeto.codigo);
			});

}

function eliminarPais(rowId) {
	var accionPreEjecucion = "confirmarEliminarPais('" + rowId + "')";
	var accionPostEjecucion = "actualizarListaPaises()";

	mensajeConfirmacionNuevo(accionPreEjecucion, accionPostEjecucion);
}

function confirmarEliminarPais(rowId) {
	var objeto = $("#grilla_paises").jqGrid('getRowData', rowId);

	bloquearPantalla();
	var parametros = new Object();
	parametros.codigo = objeto.codigo;

	$.ajax({
		url : "eliminarPais.json",
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

function actualizarListaPaises() {
	$("#grilla_paises").jqGrid('setGridParam').trigger('reloadGrid');
}
