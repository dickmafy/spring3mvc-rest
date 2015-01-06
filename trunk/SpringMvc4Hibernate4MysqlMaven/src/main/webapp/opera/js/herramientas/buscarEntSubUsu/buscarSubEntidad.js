var tamanioBaseGrilla;
var tamanioBaseGrillaUsu;

$(document)
		.ready(
				function() {

					$("#detalle_subentidad").css("display", "none");
					$("#resultado_usuarios").css("display", "none");

					var codigo = $("#codigoEntidad").val();
					var parametros = new Object();
					parametros.codigo = codigo;

					jQuery("#grilla_mantenimiento_subentidades")
							.jqGrid(
									{
										url : 'listarSubEntidad.json',
										postData : parametros,
										datatype : "json",
										mtype : 'POST',
										colNames : [ 'Código', 'Nombre', 'RUC',
												'Dirección',
												'Jefe de Subentidad',
												'Teléfonos' ],
										colModel : [ {
											name : 'codigo',
											index : 'codigo',
											width : 50,
											sortable : false
										}, {
											name : 'nombre',
											index : 'nombre',
											width : 190,
											sortable : false
										}, {
											name : 'ruc',
											index : 'ruc',
											width : 80,
											sortable : false
										}, {
											name : 'direccion',
											index : 'direccion',
											width : 200,
											sortable : false
										}, {
											name : 'jefe',
											index : 'jefe',
											width : 150,
											sortable : false
										}, {
											name : 'telefono',
											index : 'telefono',
											width : 70,
											sortable : false
										} ],
										rowNum : 10,
										height : 200,
										width : 750,
										rowList : [ 10, 20, 30 ],
										pager : '#pgrilla_mantenimiento_subentidades',
										sortname : 'id',
										viewrecords : true,
										sortorder : "desc",
										onSelectRow : function(id) {
											var filaSubentidad = $(
													"#grilla_mantenimiento_subentidades")
													.jqGrid('getRowData', id);
											$("#detalle_subentidad").css(
													"display", "block");
											$("#resultado_usuarios").css(
													"display", "block");
											var objeto = obtenerSubentidad(filaSubentidad.codigo);

											$("#codigoEnti").val(
													objeto.objeto.codigoEnti);
											$("#codigo").val(
													objeto.objeto.codigo);
											$("#ruc").val(objeto.objeto.ruc);
											$("#oficina").val(
													objeto.objeto.oficina);
											$("#nombre").val(
													objeto.objeto.nombre);
											$("#ubigeo").val(
													objeto.objeto.ubigeo);
											$("#telefono").val(
													objeto.objeto.telefono);
											$("#fax").val(objeto.objeto.fax);
											$("#casillaPostal")
													.val(
															objeto.objeto.casillaPostal);
											$("#codigoPostal").val(
													objeto.objeto.codigoPostal);

											// Usuarios
											obtenerUsuarioSubenti(filaSubentidad.codigo);
										}
									});

					tamanioBaseGrilla = jQuery(
							"#grilla_mantenimiento_subentidades")
							.getGridParam().height;

					$('#grilla_mantenimiento_subentidades')
							.jqGrid(
									'setGridParam',
									{
										beforeRequest : function() {

											var cantidadXPagina = jQuery(
													"#grilla_mantenimiento_subentidades")
													.getGridParam().rowNum;
											var alto = Number(tamanioBaseGrilla)
													+ (Number(cantidadXPagina) * 3);

											if (cantidadXPagina == "10") {
												alto = tamanioBaseGrilla;
											}

											$(
													'#grilla_mantenimiento_subentidades')
													.jqGrid('setGridHeight',
															alto);

										}
									});

					// Usuarios
					jQuery("#grilla_mantenimiento_usuarios").jqGrid(
							{
								colNames : [ 'Código', 'Nombre', 'Cargo',
										'Código Host', 'Oficina', 'Teléfonos',
										'Anexos', 'Email', 'Estado' ],
								colModel : [ {
									name : 'codigoUsu',
									index : 'codigoUsu',
									width : 50,
									sortable : false
								}, {
									name : 'nombreUsu',
									index : 'nombreUsu',
									width : 120,
									sortable : false
								}, {
									name : 'cargoUsu',
									index : 'cargoUsu',
									width : 100,
									sortable : false
								}, {
									name : 'codigoUsuHost',
									index : 'codigoUsuHost',
									width : 100,
									sortable : false
								}, {
									name : 'oficinaUsu',
									index : 'oficinaUsu',
									width : 100,
									sortable : false
								}, {
									name : 'telefonoUsu',
									index : 'telefonoUsu',
									width : 90,
									sortable : false
								}, {
									name : 'anexoUsu',
									index : 'anexoUsu',
									width : 50,
									sortable : false
								}, {
									name : 'emailUsu',
									index : 'emailUsu',
									width : 90,
									sortable : false
								}, {
									name : 'estadoUsu',
									index : 'estadoUsu',
									width : 50,
									sortable : false
								} ],
								rowNum : 10,
								height : 150,
								width : 750,
								rowList : [ 10, 20, 30 ],
								pager : '#pgrilla_mantenimiento_usuarios',
								sortname : 'id',
								viewrecords : true,
								sortorder : "desc"

							});

					tamanioBaseGrillaUsu = jQuery(
							"#grilla_mantenimiento_usuarios").getGridParam().height;

					$('#grilla_mantenimiento_usuarios').jqGrid(
							'setGridParam',
							{
								beforeRequest : function() {

									var cantidadXPaginaUsu = jQuery(
											"#grilla_mantenimiento_usuarios")
											.getGridParam().rowNum;
									var alto = Number(tamanioBaseGrillaUsu)
											+ (Number(cantidadXPaginaUsu) * 3);

									if (cantidadXPaginaUsu == "10") {
										alto = tamanioBaseGrillaUsu;
									}

									$('#grilla_mantenimiento_usuarios').jqGrid(
											'setGridHeight', alto);

								}
							});

				});

function obtenerSubentidad(codigo) {
	var objeto;

	var parametros = new Object();
	parametros.codigo = codigo;

	$.ajax({
		url : "obtenerSubentidad.json",
		data : parametros,
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
		objeto = jsonData
	});

	return objeto;
}

function obtenerUsuarioSubenti(codigo) {
	var parametros = new Object();
	parametros.codigoSubenti = codigo;

	$("#grilla_mantenimiento_usuarios").jqGrid('setGridParam', {
		url : 'listarUsuarioSubEnti.json',
		postData : parametros,
		datatype : 'json',
		mtype : 'POST',
		page : 1
	}).trigger('reloadGrid');

}
