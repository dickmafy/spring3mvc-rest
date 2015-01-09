function listarOpciones() {
	jQuery("#grilla_opciones").jqGrid(
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
				pager : '#pgrilla_opciones',
				sortname : 'id',
				viewrecords : true,
				sortorder : "desc",
				multiselect : true,
				onSelectRow : function(aRowids, status, e) {
					var ch = jQuery("#grilla_opciones").find(
							'#' + aRowids + ' input[type=checkbox]').prop(
							'checked');
					if (ch) {
						jQuery('#grilla_opciones').find(
								'#' + 'jqg_grilla_opciones_' + aRowids
										+ ' input[type=checkbox]').prop(
								'checked', false);
						jQuery('#grilla_opciones').editRow(aRowids);
						$("#grilla_opciones").focus();
					} else {
						jQuery('#grilla_opciones').find(
								'#' + 'jqg_grilla_opciones_' + aRowids
										+ ' input[type=checkbox]').prop(
								'checked', true);
						jQuery('#grilla_opciones').restoreRow(aRowids);
					}
				}
			});
}

function guardarAdminPerfil() {
	bloquearPantalla();
	var nombre = $("#nombre").val();

	var selectedRowIds = $("#grilla_opciones").getGridParam("selarrrow");
	if (selectedRowIds.length > 0) {
		if (confirm("Esta seguro de asignar las opciones seleccionadas?")) {
			var params = "";
			for (var i = 0; selectedRowIds[i]; i++) {
				params += "ids=" + selectedRowIds[i] + "&";
			}
			$
					.ajax({
						url : 'guardarAdminPerfil.json',
						data : 'nombre=' + nombre + '&' + params,
						type : 'POST',
						async : false,
						cache : false,
					})
					.done(
							function(jsonData) {
								desbloquearPantalla();
								if (jsonData.respuesta == VG_RESPUESTA_OK) {
									actualizarListaAdminPerfiles();
									cerrarPopUp("registrarAdminPerfil");
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

							});
		}
	} else {
		alert("primero selecciona algunas filas");
	}
}
