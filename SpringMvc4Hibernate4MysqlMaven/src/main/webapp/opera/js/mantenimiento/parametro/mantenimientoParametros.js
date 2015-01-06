$(document)
		.ready(
				function() {

					var opciones = function(cellVal, options, rowObject) {

						var botones = "<center>";
						botones += "<a href=javascript:editar();>";
						botones += "<img src='../../opera/img/editar.png' border='0' title='Editar Parametro'/></a>&emsp;";
						botones += "</center>";
						return botones;
					};

					jQuery("#grilla_parametros").jqGrid(
							{
								url : 'listarParametros.json',
								datatype : "json",
								mtype : 'POST',
								colNames : [ '', 'Descripción', 'Valor',
										'Opciones' ],
								colModel : [ {
									name : 'codigo',
									index : 'codigo',
									width : 1,
									sortable : false,
									hidden : true
								}, {
									name : 'descripcion',
									index : 'descripcion',
									width : 150,
									sortable : false
								}, {
									name : 'valor',
									index : 'valor',
									width : 250,
									sortable : false
								}, {
									name : 'opciones',
									index : 'codigo',
									width : 50,
									formatter : opciones,
									sortable : false
								} ],
								rowNum : 10,
								height : 280,
								width : 1000,
								rowList : [ 10, 20, 30 ],
								pager : '#pgrilla_parametros',
								sortname : 'id',
								viewrecords : true,
								sortorder : "desc",
								onSelectRow : function(id) {
													
								}
							});

					tamanioBaseGrilla = jQuery(
							"#grilla_parametros").getGridParam().height;

					$('#grilla_parametros').jqGrid(
							'setGridParam',
							{
								beforeRequest : function() {

									var cantidadXPagina = jQuery(
											"#grilla_parametros")
											.getGridParam().rowNum;
									var alto = Number(tamanioBaseGrilla)
											+ (Number(cantidadXPagina) * 3);

									if (cantidadXPagina == "10") {
										alto = tamanioBaseGrilla;
									}

									$('#grilla_parametros')
											.jqGrid('setGridHeight', alto);

								}
							});

				});

function editar() {
	bloquearPantalla();
	$.ajax({
		url : "actualizarParametros.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(function(html) {
		var data;
		var gsr = $('#grilla_parametros').jqGrid(
				'getGridParam', 'selrow');
		if (gsr) {
			data = $('#grilla_parametros')
					.jqGrid('getRowData',
							gsr);
		}
		
		desbloquearPantalla();
		$("#editarParametro").html(html);
		crearPopUp("editarParametro", 180, 450, 'Actualizar Parametro');

		$("#hdnCodigo").val(data.codigo);
		$("#updDescripcion").val(data.descripcion);
		$("#updValor").val(data.valor);
	});
}

function actualizarListaParametros() {
	$("#grilla_parametros").jqGrid('setGridParam').trigger('reloadGrid');
}
