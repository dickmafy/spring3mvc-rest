var tamanioBaseGrilla;

$(document)
		.ready(
				function() {

					$("#resultado_busqueda").css("display", "none");					
					
					jQuery("#grilla_cons_reg_eliminados")
							.jqGrid(
									{
										url : 'listarRegistrosEliminados.json',
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
										height : 240,
										width : 910,
										rowList : [ 10, 20, 30 ],
										pager : '#pgrilla_cons_reg_eliminados',
										sortname : 'id',
										viewrecords : true,
										sortorder : "desc",
										onSelectRow : function(id) {
											var filaEntidad = $(
													"#grilla_cons_reg_eliminados")
													.jqGrid('getRowData', id);
											//alert(filaEntidad.codigo);											
										}
									});

					tamanioBaseGrilla = jQuery(
							"#grilla_cons_reg_eliminados").getGridParam().height;

					$('#grilla_cons_reg_eliminados').jqGrid(
							'setGridParam',
							{
								beforeRequest : function() {

									var cantidadXPagina = jQuery(
											"#grilla_cons_reg_eliminados")
											.getGridParam().rowNum;
									var alto = Number(tamanioBaseGrilla)
											+ (Number(cantidadXPagina) * 3);

									if (cantidadXPagina == "10") {
										alto = tamanioBaseGrilla;
									}

									$('#grilla_cons_reg_eliminados')
											.jqGrid('setGridHeight', alto);

								}
							});

//					buscarValIdenPendiente();
					
					$("#resultado_busqueda").css("display", "block");
				});


