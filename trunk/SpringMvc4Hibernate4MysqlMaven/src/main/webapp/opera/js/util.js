var VG_RESPUESTA_OK = 'OK';
var VG_RESPUESTA_ERROR_VALIDACION = 'ERROR_VALIDACION';
var VG_RESPUESTA_ERROR = 'ERROR';
var VG_TIPO_MENSAJE_VACIO = 'VACIO';
var VG_TIPO_MENSAJE_INFO = 'INFO';
var VG_TIPO_MENSAJE_WARNING = 'WARNING';
var VG_TIPO_MENSAJE_ERROR = 'ERROR';

function crearPopUp(control, alto, ancho, titulo) {
	$("#" + control).dialog({
		height : alto,
		width : ancho,
		modal : true,
		resizable : false,
		draggable : false,
		title : titulo
	});
}

function crearPopUpTop(control, ancho, titulo, top) {
	$("#" + control).dialog({
		height : "auto",
		width : ancho,
		modal : true,
		resizable : false,
		draggable : false,
		title : titulo,
		position : [ 'center', top ],
	});
}

function crearPopUpR(control, alto, ancho, titulo) {
	$("#" + control).dialog({
		height : "auto",
		width : ancho,
		autoResize : true,
		modal : false,
		resizable : false,
		draggable : false,
		title : titulo
	});
}

function limpiarCombo(nombre) {
	var ddlControl = document.getElementById(nombre);
	ddlControl.options.length = 0;
}

function listarEstados(nombre) {
	limpiarCombo(nombre);
	$.ajax({
		url : "../../comun/obtener-estados.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {

				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">'
									+ val.descripcion + '</option>');
				});

			});
}

function listarEstadosCaracteres(nombre) {
	limpiarCombo(nombre);
	$.ajax({
		url : "../../comun/estadosCRCTREspecial.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">'
									+ val.descripcion + '</option>');
				});

			});
}

function cmbMoneda(nombre) {
	limpiarCombo(nombre);
	$.ajax({
		url : "../../comun/cmbMoneda.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">' + val.nombre
									+ '</option>');
				});
			});
}

function cmbIdioma(nombre) {
	limpiarCombo(nombre);
	$.ajax({
		url : "../../comun/cmbIdioma.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">' + val.nombre
									+ '</option>');
				});
			});
}

function cmbDocumento(nombre) {
	limpiarCombo(nombre);
	$.ajax({
		url : "../../comun/cmbDocumento.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">' + val.nombre
									+ '</option>');
				});

			});
}

function cmbTipoCargaPadron(nombre) {
	limpiarCombo(nombre);
	$.ajax({
		url : "../../comun/cmbTipoCargaPadron.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">' + val.nombre
									+ '</option>');
				});

			});
}

function cmbTipoOperacionCarga(nombre) {
	limpiarCombo(nombre);
	$.ajax({
		url : "../../comun/cmbTipoOperacionCarga.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">' + val.nombre
									+ '</option>');
				});

			});
}

function cmbPerfiles(nombre) {
	limpiarCombo(nombre);
	$.ajax({
		url : "../../comun/cmbPerfiles.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">' + val.nombre
									+ '</option>');
				});

			});
}

function listarEstadosFormatoDos(nombre) {
	limpiarCombo(nombre);

	$.ajax({
		url : "../../comun/obtener-estados-formato-2.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {

				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">'
									+ val.descripcion + '</option>');
				});

				$('#' + nombre + " option[value='A']").prop('selected', true);

			});
}

function listarCatalogoColumn(nombre) {

	limpiarCombo(nombre);

	$.ajax({
		url : "../../comun/obtener-lista-column-catalogo.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {

				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">' + val.nombre
									+ '</option>');
				});
			});
}

function mensajeConfirmacionNuevo(accionPreEjecucion, accionPostEjecucion) {
	bloquearPantalla();

	$
			.ajax({
				url : URL_MENSAJE_CONFIRMACION,
				type : "GET",
				async : true,
				cache : false
			})
			.done(
					function(html) {

						desbloquearPantalla();
						$("#mensajeConfirmacion").html(html);
						crearPopUp("mensajeConfirmacion", 110, 310,
								'Mensaje de Confirmación');

						var accionesConfirmacion = accionPreEjecucion + ";"
								+ accionPostEjecucion + ";"
								+ "cerrarPopUp('mensajeConfirmacion');";
						// var accionesCancelacion = accionPostEjecucion + ";"
						// +"cerrarPopUp('mensajeConfirmacion');";
						var accionesCancelacion = "cerrarPopUp('mensajeConfirmacion');";

						document.getElementById("idConfirmar").setAttribute(
								"onclick", accionesConfirmacion);
						document.getElementById("idCancelar").setAttribute(
								"onclick", accionesCancelacion);

					});

}

function listarTipoDato(nombre) {

	limpiarCombo(nombre);

	$.ajax({
		url : "../../comun/obtener-lista-tipo-dato.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {

				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">' + val.nombre
									+ '</option>');
				});

			});
}

function listarValidaciones(nombre) {

	limpiarCombo(nombre);

	$.ajax({
		url : "../../comun/obtener-lista-validaciones.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {

				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">' + val.nombre
									+ '</option>');
				});

			});
}

function cerrarPopUp(nombre) {
	$("div#" + nombre).dialog("close");
}

function mostrarMensaje(tipoMensaje, mensaje, tiempo) {

	if (tipoMensaje == VG_TIPO_MENSAJE_INFO) {
		urlImagen = "../../opera/img/ok.png";
	} else if (tipoMensaje == VG_TIPO_MENSAJE_WARNING) {
		urlImagen = "../../opera/img/warning.png";
	} else if (tipoMensaje == VG_TIPO_MENSAJE_ERROR) {
		urlImagen = "../../opera/img/error.png";
	}

	$.gritter.add({
		// (string | mandatory) the heading of the notification
		title : '',
		// (string | mandatory) the text inside the notification
		text : mensaje,
		// (string | optional) the image to display on the left
		image : urlImagen,
		// (bool | optional) if you want it to fade out on its own or just sit
		// there
		sticky : false,
		// (int | optional) the time you want it to be alive for before fading
		// out
		time : 8000
	});
}

function renderizarListaMensajes(listaMensajes, idContenedorDondeRenderizar) {

	var mensajeCompleto = "<ul>";
	for (var i = 0; i < listaMensajes.length; i++) {
		elemento = listaMensajes[i];
		mensajeCompleto = mensajeCompleto + "<li>" + elemento.mensaje + "</li>";
	}
	mensajeCompleto = mensajeCompleto + "</ul>";

	mostrarMensaje(VG_TIPO_MENSAJE_ERROR, mensajeCompleto, 5000);

	// $("#"+idContenedorDondeRenderizar).html(mensajeCompleto);
}

function bloquearPantalla() {
	$
			.blockUI({
				message : '<h2><img src="../../opera/img/cargando.gif" /> <label class=etiquetas>Espere un momento ..</label> </h2>',
				css : {
					width : '20%',
					left : '42%',
				}
			});
}

function desbloquearPantalla() {
	$.unblockUI();
}

function mensajeConfirmacion() {
	bloquearPantalla();

	$.ajax({
		url : "../../comun/mensaje-confirmacion.htm",
		type : "GET",
		async : false,
		cache : false
	}).done(function(html) {

		desbloquearPantalla();
		$("#mensajeConfirmacion").html(html);
		crearPopUp("mensajeConfirmacion", 180, 350, 'Mensaje de Confirmación');
	});
}

function cmbStsProcesoCrga(nombre) {
	limpiarCombo(nombre);
	$.ajax({
		url : "../../comun/cmbStsProcesoCrga.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData, function(key, val) {
					$('#' + nombre).append(
							'<option value="' + val.codigo + '">' + val.nombre
									+ '</option>');
				});

			});
}