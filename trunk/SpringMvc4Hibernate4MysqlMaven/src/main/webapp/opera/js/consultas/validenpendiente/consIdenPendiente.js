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
					

					$("#resultado_busqueda").css("display", "none");					
					
					jQuery("#grilla_cons_val_iden_pendiente")
							.jqGrid(
									{
										url : 'listarValIdenPendiente.json',
										datatype : "json",
										mtype : 'POST',
										colNames : [ 'Cod. Prod.',
												'Nombre Producto', 'Cod. Ent.', 'Nombre Entidad',
												'Doc. Moroso', 'TIPO DOC.', 'Nro. Doc. Iden.', 'Nombre',
												'Fec Registro' ],
										colModel : [
												{
													name : 'codigoProducto',
													index : 'codigoProducto',
													width : 50,
													sortable : false
												},
												{
													name : 'producto',
													index : 'producto',
													width : 100,
													sortable : false
												},
												{
													name : 'codigoEntidad',
													index : 'codigoEntidad',
													width : 50,
													sortable : false
												},
												{
													name : 'entidad',
													index : 'entidad',
													width : 150,
													sortable : false
												},
												{
													name : 'docMoroso',
													index : 'docMoroso',
													width : 50,
													sortable : false
												},
												{
													name : 'tipoDoc',
													index : 'tipoDoc',
													width : 50,
													sortable : false
												},
												{
													name : 'numDocIdentidad',
													index : 'numDocIdentidad',
													width : 80,
													sortable : false
												},
												{
													name : 'nombre',
													index : 'nombre',
													width : 150,
													sortable : false
												},
												{
													name : 'fecRegistro',
													index : 'fecRegistro',
													width : 80,
													sortable : false
												} ],
										rowNum : 10,
										height : 300,
										width : 1121,
										rowList : [ 10, 20, 30 ],
										pager : '#pgrilla_cons_val_iden_pendiente',
										sortname : 'codigoProducto',
										viewrecords : true,
										sortorder : "desc",
										scrollOffset: 0,
										onSelectRow : function(id) {
											var filaEntidad = $(
													"#grilla_cons_val_iden_pendiente")
													.jqGrid('getRowData', id);
											//alert(filaEntidad.codigo);											
										}
									});

					tamanioBaseGrilla = jQuery(
							"#grilla_cons_val_iden_pendiente").getGridParam().height;

					$('#grilla_cons_val_iden_pendiente').jqGrid(
							'setGridParam',
							{
								beforeRequest : function() {

									var cantidadXPagina = jQuery(
											"#grilla_cons_val_iden_pendiente")
											.getGridParam().rowNum;
									var alto = Number(tamanioBaseGrilla)
											+ (Number(cantidadXPagina) * 3);

									if (cantidadXPagina == "10") {
										alto = tamanioBaseGrilla;
									}

									$('#grilla_cons_val_iden_pendiente')
											.jqGrid('setGridHeight', alto);

								}
							});

					
					$("#resultado_busqueda").css("display", "block");
				});


function exportToFile(format) {
	var url = 'exportToFile.htm?format=' + format;
	window.open(url, "_blank", "menubar=no,location=0,height=500,width=800");
}

