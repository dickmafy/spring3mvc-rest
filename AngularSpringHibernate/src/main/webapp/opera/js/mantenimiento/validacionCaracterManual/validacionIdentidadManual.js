var tamanioBaseGrilla;

$(document)
		.ready(
				function() {

					$("a.linkXLS").click(function() {
						exportToFile('XLS');
					});

					$("a.linkTXT").click(function() {
						exportToFile('TXT');
					});

					$("#resultado_busqueda").css("display", "none");

					var dates = $("#from, #to")
							.datepicker(
									{
										defaultDate : "+1w",
										changeMonth : true,
										numberOfMonths : 1,
										onSelect : function(selectedDate) {
											var option = this.id == "from" ? "minDate"
													: "maxDate", instance = $(
													this).data("datepicker"), date = $.datepicker
													.parseDate(
															instance.settings.dateFormat
																	|| $.datepicker._defaults.dateFormat,
															selectedDate,
															instance.settings);
											dates.not(this).datepicker(
													"option", option, date);
										}
									});

					var opciones = function(cellVal, options, rowObject) {
						var botones = "<center>";
						botones += "<a href=javascript:editar(" + options.rowId
								+ ");>";
						botones += "<img src='../../opera/img/editar.png' border='0' title='Modificar'/></a>&emsp;";
						botones += "</center>";
						return botones;
					};

					jQuery("#grilla_validacionManual")
							.jqGrid(
									{
										url : 'listarValidacionIdentidadManual.json',
										datatype : "json",
										mtype : 'POST',
										colNames : [ '', '', '', '', '', '',
												'', '', '', '', '',
												'Tipo de Persona', 'Tipo Doc',
												'Num Doc', 'Nombres',
												'Fecha Reporte', 'Monto',
												'Moneda', 'Tipo Deudor',
												'Modificar' ],
										colModel : [ {
											name : 'codigomoroso',
											index : 'codigomoroso',
											width : 1,
											sortable : false,
											hidden : true
										}, {
											name : 'nroDocMoroso',
											index : 'nroDocMoroso',
											width : 1,
											sortable : false,
											hidden : true
										}, {
											name : 'apePaternoNatural',
											index : 'apePaternoNatural',
											width : 1,
											sortable : false,
											hidden : true
										}, {
											name : 'apeMaternoNatural',
											index : 'apeMaternoNatural',
											width : 1,
											sortable : false,
											hidden : true
										}, {
											name : 'codDptoDeu',
											index : 'codDptoDeu',
											width : 1,
											sortable : false,
											hidden : true
										}, {
											name : 'codProvDeu',
											index : 'codProvDeu',
											width : 1,
											sortable : false,
											hidden : true
										}, {
											name : 'codDistDeu',
											index : 'codDistDeu',
											width : 1,
											sortable : false,
											hidden : true
										}, {
											name : 'fecvencimiento',
											index : 'fecvencimiento',
											width : 100,
											sortable : false,
											hidden : true
										}, {
											name : 'direcScom',
											index : 'direcScom',
											width : 100,
											sortable : false,
											hidden : true
										}, {
											name : 'tipoDocCredito',
											index : 'tipoDocCredito',
											width : 100,
											sortable : false,
											hidden : true
										}, {
											name : 'codTipDocIdentidad',
											index : 'codTipDocIdentidad',
											width : 100,
											sortable : false,
											hidden : true
										}, {
											name : 'tipPersona',
											index : 'tipPersona',
											width : 100,
											sortable : false
										}, {
											name : 'tipoDocIdentidad',
											index : 'tipoDocIdentidad',
											width : 100,
											sortable : false
										}, {
											name : 'numdocident',
											index : 'numdocident',
											width : 100,
											sortable : false
										}, {
											name : 'nombreNatural',
											index : 'nombreNatural',
											width : 100,
											sortable : false
										}, {
											name : 'fecReporte',
											index : 'fecReporte',
											width : 100,
											sortable : false
										// ,formatter : function(
										// cellValue, options) {
										// if (cellValue) {
										// var now = new Date();
										// now
										// .setTime(cellValue);
										// return $.datepicker
										// .formatDate(
										// "dd/mm/yy",
										// now);
										// } else {
										// return '';
										// }
										// }
										}, {
											name : 'monto',
											index : 'monto',
											width : 100,
											sortable : false
										}, {
											name : 'moneda',
											index : 'moneda',
											width : 100,
											sortable : false
										}, {
											name : 'tipoCondDeud',
											index : 'tipoCondDeud',
											width : 100,
											sortable : false
										}, {
											name : 'opciones',
											index : 'codigomoroso',
											width : 50,
											formatter : opciones,
											sortable : false
										} ],
										rowNum : 10,
										height : 250,
										width : 900,
										rowList : [ 10, 20, 30 ],
										pager : '#pgrilla_validacionManual',
										viewrecords : true,
										multiselect : true,
										onSelectRow : function(aRowids, status,
												e) {
											var ch = jQuery("#grilla_Entidad")
													.find(
															'#'
																	+ aRowids
																	+ ' input[type=checkbox]')
													.prop('checked');
											if (ch) {
												jQuery('#grilla_Entidad')
														.find(
																'#'
																		+ 'jqg_grilla_Entidad_'
																		+ aRowids
																		+ ' input[type=checkbox]')
														.prop('checked', false);
												jQuery('#grilla_Entidad')
														.editRow(aRowids);
												$("#grilla_Entidad").focus();
											} else {
												jQuery('#grilla_Entidad')
														.find(
																'#'
																		+ 'jqg_grilla_Entidad_'
																		+ aRowids
																		+ ' input[type=checkbox]')
														.prop('checked', true);
												jQuery('#grilla_Entidad')
														.restoreRow(aRowids);
											}
										}
									});

					tamanioBaseGrilla = jQuery("#grilla_validacionManual")
							.getGridParam().height;

					$('#grilla_validacionManual').jqGrid(
							'setGridParam',
							{
								beforeRequest : function() {
									var cantidadXPagina = jQuery(
											"#grilla_validacionManual")
											.getGridParam().rowNum;
									var alto = Number(tamanioBaseGrilla)
											+ (Number(cantidadXPagina) * 3);

									if (cantidadXPagina == "10") {
										alto = tamanioBaseGrilla;
									}

									$('#grilla_validacionManual').jqGrid(
											'setGridHeight', alto);

								}
							});
				});

function buscar() {
	$("#resultado_busqueda").css("display", "block");

	var from = $("#from").val();
	var to = $("#to").val();

	var parametros = new Object();
	parametros.desde = from;
	parametros.hasta = to;

	$("#grilla_validacionManual").jqGrid('setGridParam', {
		url : 'listarValidacionIdentidadManual.json',
		postData : parametros,
		datatype : 'json',
		mtype : 'POST',
		page : 1
	}).trigger('reloadGrid');
}

function editar(rowId) {
	bloquearPantalla();
	$.ajax({
		url : "modificarValidacionManual.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(
			function(html) {
//				var data = $('#grilla_validacionManual').jqGrid('getRowData',
//						rowId);
//
				desbloquearPantalla();
				$("#modificarValidacionManual").html(html);
				crearPopUp("modificarValidacionManual", 400, 900,
						'Modificacion Manual');
//				cmbDocumento("cmbDocumento");
//
//				$("#hdnCodigo").val(data.codigomoroso);
//				$("#numDocumentoMoroso").text(data.nroDocMoroso);
//				$("#tipoPersona").text(data.tipPersona);
//				$("#fchReporte").text(data.fecReporte);
//
//				$("#cmbDocumento").val(data.codTipDocIdentidad);
//				$("#numDocumento").val(data.numdocident);
//				$("#apePaterno").val(data.apePaternoNatural);
//
//				$("#apeMaterno").val(data.apeMaternoNatural);
//				$("#nombres").val(data.nombreNatural);
//				$("#direccion").text(data.direcScom);
//
//				$("#departamento").text(data.codDptoDeu);
//				$("#provincia").text(data.codProvDeu);
//				$("#distrito").text(data.codDistDeu);
//
//				// var now2 = new Date();
//				// now2.setTime(data.fecvencimiento);
//				// $("#fchVencimiento").text(
//				// $.datepicker.formatDate("dd/mm/yy", now2));
//				$("#fchVencimiento").text(data.fecvencimiento);
//				$("#tipoMoneda").text(data.moneda);
//				$("#monto").text(data.monto);
//				$("#deuda").text(data.tipoCondDeud);
//				$("#docCredito").text(data.tipoDocCredito);

			});
}

function updateProcesar() {
	var selectedRowIds = $("#grilla_updOpciones").getGridParam("selarrrow");
	if (selectedRowIds.length > 0) {
		if (confirm("Los registros seleccionados pasarán a Proceso ¿Desea Continuar?")) {
			var params = "";
			for (var i = 0; selectedRowIds[i]; i++) {
				params += "ids=" + selectedRowIds[i] + "&";
			}

			$
					.ajax({
						url : 'procesarValidacionManual.json',
						data : 'params=' + params,
						type : 'POST',
						async : false,
						cache : false,
					})
					.done(
							function(jsonData) {
								desbloquearPantalla();
								if (jsonData.respuesta == VG_RESPUESTA_OK) {
									actualizarLista();
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
		} else {
			desbloquearPantalla();
			alert("primero selecciona algunas filas");
		}
	}
}

function updateError() {
	var selectedRowIds = $("#grilla_updOpciones").getGridParam("selarrrow");
	if (selectedRowIds.length > 0) {
		if (confirm("Los registros seleccionados serán reportados con Error ¿Desea Continuar?")) {
			var params = "";
			for (var i = 0; selectedRowIds[i]; i++) {
				params += "ids=" + selectedRowIds[i] + "&";
			}

			$
					.ajax({
						url : 'procesarValidacionManual.json',
						data : 'params=' + params,
						type : 'POST',
						async : false,
						cache : false,
					})
					.done(
							function(jsonData) {
								desbloquearPantalla();
								if (jsonData.respuesta == VG_RESPUESTA_OK) {
									actualizarLista();
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
		} else {
			desbloquearPantalla();
			alert("primero selecciona algunas filas");
		}
	}
}

function exportToFile(format) {
	var url = 'exportToFile.htm?format=' + format;
	window.open(url, "_blank", "menubar=no,location=0,height=500,width=800");
}

function actualizarLista() {
	$("#grilla_updOpciones").jqGrid('setGridParam').trigger('reloadGrid');
}