var tamanioBaseGrilla;

$(document)
		.ready(
				function() {

					$("#resultado_busqueda").css("display", "none");
					$("#detalle_entidad").css("display", "none");
					$("#actualizar_det_entidad").css("display", "none");

					var opcionesMantenimientoEntidades = function(cellVal,
							options, rowObject) {

						var botones = "<center>";


						botones += "</center>";
						return botones;
					};

					jQuery("#grilla_mantenimiento_entidades")
							.jqGrid(
									{
										colNames : [ 'Código SCI',
												'Código Host', 'RUC', 'Nombre',
												'Dirección', 'Telef', 'Email',
												'Estado', 'Opciones' ],
										colModel : [
												{
													name : 'codigo',
													index : 'codigo',
													width : 80,
													sortable : false
												},
												{
													name : 'codigoHost',
													index : 'codigoHost',
													width : 80,
													sortable : false
												},
												{
													name : 'ruc',
													index : 'ruc',
													width : 80,
													sortable : false
												},
												{
													name : 'nombre',
													index : 'nombre',
													width : 220,
													sortable : false
												},
												{
													name : 'direccion',
													index : 'direccion',
													width : 200,
													sortable : false
												},
												{
													name : 'telef',
													index : 'telef',
													width : 80,
													sortable : false
												},
												{
													name : 'email',
													index : 'email',
													width : 150,
													sortable : false
												},
												{
													name : 'estado',
													index : 'estado',
													width : 50,
													sortable : false
												},
												{
													name : 'opciones',
													index : 'codigo',
													width : 70,
													formatter : opcionesMantenimientoEntidades,
													sortable : false
												} ],
										rowNum : 10,
										height : 240,
										width : 910,
										rowList : [ 10, 20, 30 ],
										pager : '#pgrilla_mantenimiento_entidades',
										sortname : 'id',
										viewrecords : true,
										sortorder : "desc",
										onSelectRow : function(id) {
											var filaEntidad = $(
													"#grilla_mantenimiento_entidades")
													.jqGrid('getRowData', id);
											// alert(filaEntidad.codigo);
											$("#detalle_entidad").css(
													"display", "block");
											$("#actualizar_det_entidad").css(
													"display", "none");
											$('#detalle_entidad .editable')
													.prop('disabled', true);

											var objeto = obtenerEntidad(filaEntidad.codigo);

											$("#codigoDetalle").val(
													objeto.objeto.codigo);
											$("#codigoHostDetalle").val(
													objeto.objeto.codigoHost);
											$("#rucDetalle").val(
													objeto.objeto.ruc);
											$("#mercado").val(
													objeto.objeto.mercado);
											$("#giro").val(objeto.objeto.giro);
											listarEstados("estado");
											$("#estado").val(
													objeto.objeto.estado);
											$("#nombreDetalle").val(
													objeto.objeto.nombre);
											$("#direccion").val(
													objeto.objeto.direccion);
											$("#ubigeo").val(
													objeto.objeto.ubigeo);
											$("#pais").val(objeto.objeto.pais);
											$("#fechaCreacion")
													.val(
															objeto.objeto.fechaCreacion);
											$("#telefono").val(
													objeto.objeto.telef);
											$("#casillaPostal")
													.val(
															objeto.objeto.casillaPostal);
											$("#codigoPostal").val(
													objeto.objeto.codigoPostal);
											$("#email")
													.val(objeto.objeto.email);
											$("#sitioWeb").val(
													objeto.objeto.sitioWeb);
											$("#alerta").val(
													objeto.objeto.alerta);

										}
									});

					tamanioBaseGrilla = jQuery(
							"#grilla_mantenimiento_entidades").getGridParam().height;

					$('#grilla_mantenimiento_entidades').jqGrid(
							'setGridParam',
							{
								beforeRequest : function() {

									var cantidadXPagina = jQuery(
											"#grilla_mantenimiento_entidades")
											.getGridParam().rowNum;
									var alto = Number(tamanioBaseGrilla)
											+ (Number(cantidadXPagina) * 3);

									if (cantidadXPagina == "10") {
										alto = tamanioBaseGrilla;
									}

									$('#grilla_mantenimiento_entidades')
											.jqGrid('setGridHeight', alto);

								}
							});

				});

function buscarEntidad() {
	$("#detalle_entidad").css("display", "none");

	var codigo = '';
	var codigoHost = '';

	var mivalor = $("#codigoSciHost").val();

	if (mivalor == '1')
		codigo = $("#codigo").val();
	else
		codigoHost = $("#codigo").val();

	var ruc = $("#ruc").val();
	var nombre = $("#nombre").val();

	var parametros = new Object();

	parametros.codigo = codigo;
	parametros.codigoHost = codigoHost;
	parametros.ruc = ruc;
	parametros.nombre = nombre;

	$("#resultado_busqueda").css("display", "block");
	$("#grilla_mantenimiento_entidades").jqGrid('setGridParam', {
		url : 'listarEntidad.json',
		postData : parametros,
		datatype : 'json',
		mtype : 'POST',
		page : 1
	}).trigger('reloadGrid');
}

function obtenerEntidad(codigo) {
	var objeto;

	var parametros = new Object();
	parametros.codigo = codigo;

	$.ajax({
		url : "obtenerEntidad.json",
		data : parametros,
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
		objeto = jsonData;
	});

	return objeto;
}

function editarEntidad() {
	$("#actualizar_det_entidad").css("display", "block");
	$('#detalle_entidad .editable').removeAttr("disabled");
}

function actualizarEntidad() {
	var codigo = $("#codigoDetalle").val();
	var email = $("#email").val();
	var alerta = $("#alerta").val();
	var estado = $("#estado").val();

	var parametros = new Object();

	parametros.codigo = codigo;
	parametros.email = email;
	parametros.alerta = alerta;
	parametros.estado = estado;

	$
			.ajax({
				url : "actualizarEntidad.json",
				data : parametros,
				type : "POST",
				async : false,
				cache : false
			})
			.done(
					function(jsonData) {
						if (jsonData.respuesta == VG_RESPUESTA_OK) {
							actualizarListaEntidades();
							mostrarMensaje(jsonData.tipoMensaje,
									jsonData.mensaje);

						} else if (jsonData.respuesta == VG_RESPUESTA_ERROR_VALIDACION) {
							renderizarListaMensajes(
									jsonData.listaMensajesValidacion,
									'msgsValidacionesActualizarEntidades');
						} else if (jsonData.respuesta == VG_RESPUESTA_ERROR) {
							mostrarMensaje(jsonData.tipoMensaje,
									jsonData.mensaje);
						}
					});
}

function actualizarListaEntidades() {
	$("#detalle_entidad").jqGrid('setGridParam').trigger('reloadGrid');
	$("#grilla_mantenimiento_entidades").jqGrid('setGridParam').trigger(
			'reloadGrid');
}

function irSubentidadOf(rowId) {
	var objeto = $("#grilla_mantenimiento_entidades").jqGrid('getRowData',
			rowId);

	$().redirect('irSubentidadOficina.json', {
		'codigoEntidad' : objeto.codigo,
		'nombreEntidad' : objeto.nombre
	}, 'POST');

}
