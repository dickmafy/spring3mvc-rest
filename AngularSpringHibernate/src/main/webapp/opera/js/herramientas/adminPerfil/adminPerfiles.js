$(document)
		.ready(
				function() {
					
					var opciones = function(cellVal, options, rowObject) {
						var botones = "<center>";
						botones += "<div style='display: inline-block;'>";
						botones += "<a href=javascript:editarAdminPerfil('"
								+ options.rowId + "'); title='Editar'>";
						botones += "<span class='ui-icon ui-icon-pencil'></span></a></div>&nbsp;";
						botones += "<div style='display: inline-block;'>";
						botones += "<a href=javascript:eliminarAdminPerfil('"
								+ options.rowId + "'); title='Eliminar'>";
						botones += "<span class='ui-icon ui-icon-trash' ></span></a></div>";
						botones += "</center>";
						return botones;
					};

					jQuery("#grilla_adminPerfiles").jqGrid({
						url : 'listarAdminPerfil.json',
						datatype : "json",
						mtype : 'POST',
						colNames : [ 'idPerfil', 'Nombre', 'Opciones' ],
						colModel : [ {
							name : 'idPerfil',
							index : 'idPerfil',
							width : 1,
							sortable : false,
							hidden : true
						}, {
							name : 'nombre',
							index : 'nombre',
							width : 100,
							sortable : false
						}, {
							name : 'opciones',
							index : 'codigo',
							width : 100,
							formatter : opciones,
							sortable : false
						} ],
						rowNum : 10,
						height : 280,
						width : 1000,
						rowList : [ 10, 20, 30 ],
						pager : '#pgrilla_adminPerfiles',
						sortname : 'id',
						viewrecords : true,
						sortorder : "desc",
						onSelectRow : function(id) {

						}
					});

					tamanioBaseGrilla = jQuery("#grilla_adminPerfiles")
							.getGridParam().height;

					$('#grilla_adminPerfiles').jqGrid(
							'setGridParam',
							{
								beforeRequest : function() {

									var cantidadXPagina = jQuery(
											"#grilla_adminPerfiles")
											.getGridParam().rowNum;
									var alto = Number(tamanioBaseGrilla)
											+ (Number(cantidadXPagina) * 3);

									if (cantidadXPagina == "10") {
										alto = tamanioBaseGrilla;
									}

									$('#grilla_adminPerfiles').jqGrid(
											'setGridHeight', alto);

								}
							});
				});

function nuevoAdminPerfil() {
	bloquearPantalla();
	$.ajax({
		url : "registrarAdminPerfil.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(function(html) {
		desbloquearPantalla();
		$("#registrarAdminPerfil").html(html);
		crearPopUp("registrarAdminPerfil", 500, 900, 'Registrar Perfil');
		listarOpciones();
	});
}

function editarAdminPerfil(rowId) {
	bloquearPantalla();
	$.ajax({
		url : "actualizarAdminPerfil.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(function(html) {
		desbloquearPantalla();
		$("#editarAdminPerfil").html(html);
		crearPopUp("editarAdminPerfil", 500, 900, 'Actualizar Perfil');

		var objeto = $("#grilla_adminPerfiles").jqGrid('getRowData', rowId);
		
		$.ajax({
			url : "getIdsOpciones.json",
			type : "POST",
			data : 'idPerfil=' + objeto.idPerfil,
			async : false,
			cache : false
		}).done(function(jsonData) {
			var ids = [];
			$.each(jsonData, function(key, val) {
				ids.push(val.idPerfil);
			});
			listarOpcionesSelected(objeto, ids);
		});
	});
}

function eliminarAdminPerfil(rowId) {
	var accionPreEjecucion = "confirmarEliminarAdminPerfil('" + rowId
			+ "')";
	var accionPostEjecucion = "actualizarListaAdminPerfiles()";

	mensajeConfirmacionNuevo(accionPreEjecucion, accionPostEjecucion);
}

function confirmarEliminarAdminPerfil(rowId) {
	var objeto = $("#grilla_adminPerfiles").jqGrid('getRowData', rowId);

	bloquearPantalla();
	$.ajax({
		url : "eliminarAdminPerfil.json",
		data : 'idPerfil=' + objeto.idPerfil,
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

function actualizarListaAdminPerfiles() {
	$("#grilla_adminPerfiles").jqGrid('setGridParam').trigger('reloadGrid');
}