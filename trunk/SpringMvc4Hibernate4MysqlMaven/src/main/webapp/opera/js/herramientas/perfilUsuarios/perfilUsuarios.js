var tamanioBaseGrilla;

$(document)
		.ready(
				function() {
					// $("#detalle_entidad").css("display", "block");
					
					var opciones = function(cellVal, options, rowObject) {
						var botones = "<center>";
						botones += "<div style='display: inline-block;'>";
						botones += "<a href=javascript:irSubentidadOficina('"
								+ options.rowId + "'); title='Subentidad\Oficina'>";
						botones += "<span class='ui-icon ui-icon-wrench'></span></a></div>&nbsp;";
						botones += "</center>";
						return botones;
					};

					jQuery("#grilla_entidades").jqGrid(
							{
								colNames : [ '', 'Codigo', 'Nombre',
										'Total Usuarios', 'Detalle' ],
								colModel : [ {
									name : 'codigoEmpresa',
									index : 'codigoEmpresa',
									width : 1,
									sortable : false,
									hidden : true
								}, {
									name : 'codigo',
									index : 'codigo',
									width : 100,
									sortable : false
								}, {
									name : 'nombre',
									index : 'nombre',
									width : 100,
									sortable : false
								}, {
									name : 'total',
									index : 'total',
									width : 100,
									sortable : false
								}, {
									name : 'botones',
									index : 'codigo',
									width : 100,
									formatter : opciones,
									sortable : false
								} ],
								rowNum : 10,
								height : 280,
								width : 1000,
								rowList : [ 10, 20, 30 ],
								pager : '#grilla_entidades',
								sortname : 'id',
								viewrecords : true,
								sortorder : "desc",
								onSelectRow : function(rowid, status, e) {

								}
							});

					tamanioBaseGrilla = jQuery("#grilla_entidades")
							.getGridParam().height;

					$('#grilla_entidades')
							.jqGrid(
									'setGridParam',
									{
										beforeRequest : function() {

											var cantidadXPagina = jQuery(
													"#grilla_entidades")
													.getGridParam().rowNum;
											var alto = Number(tamanioBaseGrilla)
													+ (Number(cantidadXPagina) * 3);

											if (cantidadXPagina == "10") {
												alto = tamanioBaseGrilla;
											}

											$('#grilla_entidades').jqGrid(
													'setGridHeight', alto);

										}
									});
				});

function buscarEntidad() {
	// $("#detalle_entidad").css("display", "none");

	var codigo = '';
	var codigoHost = '';
	var ruc = '';
	var nombre = '';

	var parametros = new Object();

	parametros.codigo = codigo;
	parametros.codigoHost = codigoHost;
	parametros.ruc = ruc;
	parametros.nombre = nombre;

	$("#grilla_entidades").jqGrid('setGridParam', {
		url : 'listarEntidad.json',
		postData : parametros,
		datatype : 'json',
		mtype : 'POST',
		page : 1
	}).trigger('reloadGrid');
}

function irSubentidadOficina(rowId) {
	var objeto = $("#grilla_entidades").jqGrid('getRowData', rowId);

	var form = document.getElementById("idForm");
	form.action = "irSubEntidadOficina.htm";
	form.method = "POST";
	form.codigo.value = objeto.codigo;
	form.ruc.value = objeto.ruc;
	form.nombre.value = objeto.nombre;
	form.submit();
}