var tamanioBaseGrilla;

$(document)
		.ready(
				function() {
					
					
					$("a.linkXLS").click(function() {
						exportToFile('XLS');
					});

					$("a.linkPDF").click(function() {
						exportToFile('PDF');
					});
					
					var opciones = function(cellVal, options, rowObject) {
						var botones = "<center>";
						botones += "<a href=javascript:eliminar();>";
						botones += "<img src='../../opera/img/cancel_16x16.png' border='0' title='Eliminar'/></a>&emsp;";
						botones += "</center>";
						return botones;
					};

					$("#resultado_busqueda").css("display", "none");					
					
					jQuery("#grilla_elimin_doc_morosos_entidad")
							.jqGrid(
									{
										url : 'listarElimDocMorososEntidades.json',
										datatype : "json",
										mtype : 'POST',
										colNames : [ 'Nro',
												'Código Entidad', 'Nombre Entidad', 'Dirección',
												'Pais', 'Email', 'Producto','Fecha Reporte', 'Total Registros','Eliminar','codToElim' ],
										colModel : [
												{
													name : 'nro',
													index : 'nro',
													width : 50,
													sortable : false
												},
												{
													name : 'codigoEntidad',
													index : 'codigoEntidad',
													width : 100,
													sortable : false
												},
												{
													name : 'nombreEntidad',
													index : 'nombreEntidad',
													width : 50,
													sortable : false
												},
												{
													name : 'direcEntidad',
													index : 'direcEntidad',
													width : 150,
													sortable : false
												},
												{
													name : 'pais',
													index : 'pais',
													width : 50,
													sortable : false
												},
												{
													name : 'email',
													index : 'email',
													width : 50,
													sortable : false
												},
												{
													name : 'prdname',
													index : 'prdname',
													width : 50,
													sortable : false
												},
												{
													name : 'fecReporte',
													index : 'fecReporte',
													width : 80,
													sortable : false
												},
												{
													name : 'totRegistros',
													index : 'totRegistros',
													width : 80,
													sortable : false
												},
												{
													name : 'Eliminar',
													index : 'codToElim',
													width : 50,
													formatter : opciones,
													sortable : false
												},
												{
													name : 'codToElim',
													index : 'codToElim',
													hidden: true																										
												}],
										rowNum : 10,
										height : 240,
										width : 1121,
										rowList : [ 10, 20, 30 ],
										pager : '#pgrilla_elimin_doc_morosos_entidad',
										sortname : 'id',
										viewrecords : true,
										sortorder : "desc",
										scrollOffset: 0,
										onSelectRow : function(id) {
											var filaEntidad = $(
													"#grilla_elimin_doc_morosos_entidad")
													.jqGrid('getRowData', id);
											//alert(filaEntidad.codigo);											
										}
									});

					tamanioBaseGrilla = jQuery(
							"#grilla_elimin_doc_morosos_entidad").getGridParam().height;

					$('#grilla_elimin_doc_morosos_entidad').jqGrid(
							'setGridParam',
							{
								beforeRequest : function() {

									var cantidadXPagina = jQuery(
											"#grilla_elimin_doc_morosos_entidad")
											.getGridParam().rowNum;
									var alto = Number(tamanioBaseGrilla)
											+ (Number(cantidadXPagina) * 3);

									if (cantidadXPagina == "10") {
										alto = tamanioBaseGrilla;
									}

									$('#grilla_elimin_doc_morosos_entidad')
											.jqGrid('setGridHeight', alto);

								}
							});

//					buscarValIdenPendiente();
					
					$("#resultado_busqueda").css("display", "block");
				});


function eliminar() {
	bloquearPantalla();
	
	var resultado = mensajeConfirmacion();
	//alert(resultado);
	
	var gsr = $('#grilla_elimin_doc_morosos_entidad').jqGrid('getGridParam', 'selrow');
	if (gsr) {
		data = $('#grilla_elimin_doc_morosos_entidad').jqGrid('getRowData', gsr);
	}
	
	var codToElim = data.codToElim;
	
	$.ajax({
		url : "elimPorEnti.json",
		datatype : 'json',
		type : "POST",
		data : { "codToElim":codToElim},
		async : false,
		cache : false
	}).done(function(jsonData) {
		
		//volver a llamar el metodo de busqueda de inicio
		if (jsonData.respuesta == VG_RESPUESTA_OK) {
			$("#grilla_elimin_doc_morosos_entidad").jqGrid('setGridParam').trigger(
					'reloadGrid');
			mostrarMensaje(jsonData.tipoMensaje,
					jsonData.mensaje);

		} else if (jsonData.respuesta == VG_RESPUESTA_ERROR) {
			mostrarMensaje(jsonData.tipoMensaje,
					jsonData.mensaje);
		}
		
	});
	
	
}

function exportToFile(format) {
	var url = 'exportToFile.htm?format=' + format;
	window.open(url, "_blank", "menubar=no,location=0,height=500,width=800");
}

