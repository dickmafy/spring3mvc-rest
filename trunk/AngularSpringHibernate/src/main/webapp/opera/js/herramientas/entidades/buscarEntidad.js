var tamanioBaseGrilla;

$(document)
		.ready(
				function() {
					$("#resultado_busqueda").css("display", "none");
					
					var opciones = function(cellVal, options, rowObject) {
						var botones = "<center>";
						botones += "<div style='display: inline-block;'>";
						botones += "<a href=javascript:editarEntidad('"
								+ options.rowId + "'); title='Editar'>";
						botones += "<span class='ui-icon ui-icon-pencil'></span></a></div>&nbsp;";
						botones += "<div style='display: inline-block;'>";
						botones += "<a href=javascript:irSubentidadOficina('"
								+ options.rowId + "'); title='SubEntidades/Oficinas'>";
						botones += "<span class='ui-icon ui-icon-transferthick-e-w' ></span></a></div>";
						botones += "</center>";
						return botones;
					};

					jQuery("#grilla_entidades").jqGrid(
							{
								colNames : [ '', 'Código SCI', 'Código Host',
										'RUC', 'Nombre', 'Dirección', 'Telef',
										'Email', 'Estado', 'Opciones' ],
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
									name : 'codigoHost',
									index : 'codigoHost',
									width : 100,
									sortable : false
								}, {
									name : 'ruc',
									index : 'ruc',
									width : 100,
									sortable : false
								}, {
									name : 'nombre',
									index : 'nombre',
									width : 100,
									sortable : false
								}, {
									name : 'direccion',
									index : 'direccion',
									width : 100,
									sortable : false
								}, {
									name : 'telef',
									index : 'telef',
									width : 100,
									sortable : false
								}, {
									name : 'email',
									index : 'email',
									width : 100,
									sortable : false
								}, {
									name : 'estado',
									index : 'estado',
									width : 100,
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
	$("#resultado_busqueda").css("display", "block");

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

function editarEntidad(rowId) {
	bloquearPantalla();
	$.ajax({
		url : "actualizarEntidad.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(function(html) {
		var objeto = $("#grilla_entidades").jqGrid('getRowData', rowId);

		desbloquearPantalla();
		$("#editarEntidad").html(html);
		crearPopUp("editarEntidad", 500, 950, 'Actualizar Entidad');
		listarEstados("updEstado");
		$("#hdnCodigo").val(objeto.codigo);
		$("#updCodigo").val(objeto.codigo);
		$("#updCodigoHost").val(objeto.codigoHost);
		$("#updRuc").val(objeto.ruc);
		
		$("#updMercado").val(objeto.mercado);
		$("#updGiro").val(objeto.giro);
		$("#updEstado").val(objeto.estado);
		
		$("#updNombre").val(objeto.nombre);
		$("#updDireccion").val(objeto.direccion);
		$("#updUbigeo").val(objeto.ubigeo);
		
		$("#updPais").val(objeto.pais);
		$("#updFechaCreacion").val(objeto.fechaCreacion);
		$("#updTelef").val(objeto.telef);
		
		$("#updCasillaPostal").val(objeto.casillaPostal);
		$("#updCodigoPostal").val(objeto.codigoPostal);
		$("#updEmail").val(objeto.email);
		
		$("#updSitioWeb").val(objeto.sitioWeb);
		$("#updAlerta").val(objeto.alerta);
		$("#updCodigoRepCom").val(objeto.codigoRepCom);
		
		$("#updTipoEmpresa").val(objeto.tipoEmpresa);
		$("#updTipoCont").val(objeto.tipoCont);
	});
}

function irSubentidadOficina(rowId) {
	var objeto = $("#grilla_entidades").jqGrid('getRowData', rowId);

	var form = document.getElementById("idForm");
	form.action = "buscarSubEntidadOficina.htm";
	form.method = "POST";
	form.codigo.value = objeto.codigo;
	form.ruc.value = objeto.ruc;
	form.nombre.value = objeto.nombre;
	form.submit();
}

function actualizarListaEntidad() {
	$("#grilla_entidades").jqGrid('setGridParam').trigger('reloadGrid');
}