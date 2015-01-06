function listarOpcionesSelected(data, ids) {
	$("#hdnId").val(data.idPerfil);
	$("#updNombre").val(data.nombre);

	jQuery("#grilla_updOpciones").jqGrid(
			{
				url : 'listarOpciones.json',
				datatype : "json",
				mtype : 'POST',
				postData : 'idPerfil=0',
				colNames : [ 'Cod', 'Cod Padre', 'Indicador', 'Numero Orden',
						'Nombre Corto', 'Nombre Largo', 'URL' ],
				colModel : [ {
					name : 'codigoOpcion',
					index : 'codigoOpcion',
					width : 1,
					sortable : false,
					hidden : true
				}, {
					name : 'codigoPadre',
					index : 'codigoPadre',
					width : 30,
					sortable : false
				}, {
					name : 'indicador',
					index : 'indicador',
					width : 30,
					sortable : false
				}, {
					name : 'numeroOrden',
					index : 'numeroOrden',
					width : 50,
					sortable : false
				}, {
					name : 'nombreCorto',
					index : 'nombreCorto',
					width : 100,
					sortable : false
				}, {
					name : 'nombreLargo',
					index : 'nombreLargo',
					width : 100,
					sortable : false
				}, {
					name : 'nombreUrl',
					index : 'nombreUrl',
					width : 200,
					sortable : false
				} ],
				rowNum : 10,
				height : 300,
				width : 800,
				rowList : [ 10, 20, 30 ],
				pager : '#pgrilla_updOpciones',
				sortname : 'id',
				viewrecords : true,
				sortorder : "desc",
				multiselect : true,
				onSelectRow : function(aRowids, status, e) {
					console.log(aRowids + status);
				},
				gridComplete : function() {
					$.each(ids, function(key, rowid) {
						$("#grilla_updOpciones").jqGrid('setSelection', rowid, false);
					});

				}
			});
	$("#grilla_updOpciones").trigger("reloadGrid");
}

function actualizarAdminPerfil(rowId) {
	var selectedRowIds = $("#grilla_updOpciones").getGridParam("selarrrow");
	if (selectedRowIds.length > 0) {
		var accionPreEjecucion = "confirmarActualizarAdminPerfil()";
		var accionPostEjecucion = "actualizarListaAdminPerfiles()";
		mensajeConfirmacionNuevo(accionPreEjecucion, accionPostEjecucion);
	}
}

function confirmarActualizarAdminPerfil() {
	var selectedRowIds = $("#grilla_updOpciones").getGridParam("selarrrow");
	var hdnId = $("#hdnId").val();
	var updNombre = $("#updNombre").val();
	console.log(selectedRowIds);
	var params = "";
	for (var i = 0; selectedRowIds[i]; i++) {
		params += "ids=" + selectedRowIds[i] + "&";
	}

	$
			.ajax(
					{
						url : 'actualizarAdminPerfil.json',
						data : 'hdnId=' + hdnId + '&' + 'updNombre='
								+ updNombre + '&' + params,
						type : 'POST',
						async : false,
						cache : false,
					})
			.done(
					function(jsonData) {
						desbloquearPantalla();

						if (jsonData.respuesta == VG_RESPUESTA_OK) {
							actualizarListaAdminPerfiles();

							mostrarMensaje(jsonData.tipoMensaje,
									jsonData.mensaje);
						} else if (jsonData.respuesta == VG_RESPUESTA_ERROR_VALIDACION) {
							renderizarListaMensajes(
									jsonData.listaMensajesValidacion,
									'msgsValidaciones');
						} else if (jsonData.respuesta == VG_RESPUESTA_ERROR) {
							mostrarMensaje(jsonData.tipoMensaje,
									jsonData.mensaje);
						}
						cerrarPopUp("editarAdminPerfil");
					});
}

function actualizarListaAdminPerfiles() {
	$("#grilla_adminPerfiles").jqGrid('setGridParam').trigger('reloadGrid');
}