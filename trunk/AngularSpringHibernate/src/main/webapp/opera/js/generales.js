var flagMenu = 0;
var VG_RESPUESTA_OK = 'OK';
var VG_RESPUESTA_ERROR_VALIDACION = 'ERROR_VALIDACION';
var VG_RESPUESTA_ERROR = 'ERROR';
var VG_TIPO_MENSAJE_VACIO = 'VACIO';
var VG_TIPO_MENSAJE_INFO = 'INFO';
var VG_TIPO_MENSAJE_WARNING = 'WARNING';
var VG_TIPO_MENSAJE_ERROR = 'ERROR';

var VG_CAMPANIA_NORMAL = 1;
var VG_CAMPANIA_RECURRENTE = 2;

var VG_CAMPANIA_PROCESO = 1;
var VG_CAMPANIA_PAUSADA = 2;
var VG_CAMPANIA_INICIADO = 3;
var VG_CAMPANIA_FINALIZADO = 4;

var VG_PERFIL_ADMINISTRADOR_CAMPANIA = 3;

var nombreMetodoConfirmar = '';

$(function() {
	$("#menu_desplegable").menu();
	$("input[type=button]").button();
	$("#ocultarMenu").button({
		text : false,
		icons : {
			primary : "ui-icon-triangle-1-e"
		}
	});
});

$(document).ready(
		function() {
			var VG_session = obtenerDatosSession();
//			$('#datosesionUsuario').html(
//					"<table border='0' cellpadding='4' cellspacing='4'><tr><td><b>Usuario : </b>"
//							+ VG_session.objeto.usuario.usuario
//							+ "</td><td><b>Perfil : </b>"
//							+ VG_session.objeto.perfil.nombre
//							+ "</td><td><b>Entidad : </b>"
//							+ VG_session.objeto.entidad.nombre
//							+ "</td></tr></table>");
		});

function vistaMenu() {
	if (flagMenu == 0) {
		ocultar();
	} else {
		mostrar();
	}
}

function obtenerDatosSession() {

	var objSession;

	$.ajax({
		url : "../../gestion-session/obtener-datos-session.json",
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(function(jsonData) {
		objSession = jsonData;
	});

	return objSession;
}

function cerrarPopUp(nombre) {
	$("#" + nombre).dialog("close");
}

function listarCombo(url, idCombo, identificador, nombre, parametros) {
	limpiarComboConSeleccione(idCombo);
	var valorCombo = $('#' + idCombo).find('option:selected').val();
	$.ajax({
		url : url,
		dataType : "json",
		data : parametros,
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData.rows, function(key, val) {
					$('#' + idCombo).append(
							"<option value='" + val[identificador] + "'>"
									+ val[nombre] + "</option>");
				});
			});
}

function listarComboDependiente(url, idComboOrigen, idComboDependiente,
		identificadorOrigen, identificadorDestino, nombreDestino) {
	var parametros = new Object();
	parametros[identificadorOrigen] = $('#' + idComboOrigen).find(
			'option:selected').val();
	limpiarComboConSeleccione(idComboDependiente);
	$.ajax({
		url : url,
		data : parametros,
		dataType : "json",
		type : "POST",
		async : false,
		cache : false
	}).done(
			function(jsonData) {
				$.each(jsonData.rows, function(key, val) {
					$('#' + idComboDependiente).append(
							'<option value="' + val[identificadorDestino]
									+ '">' + val[nombreDestino] + '</option>');
				});
			});
}

function replaceAll(find, replace, str) {
	while (str.indexOf(find) > 0) {
		str = str.replace(find, replace);
	}
	return str;
}

function limpiarComboConSeleccione(idCombo) {
	$('#' + idCombo).html('');
	$('#' + idCombo).append('<option value="-1">Seleccione</option>');
}

function limpiarComboSinSeleccione(idCombo) {
	$('#' + idCombo).html('');
}

function formatearFechaDesdeLong(fechaLong) {

	var fechaFormateada = "";
	var today = new Date(fechaLong);
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}

	fechaFormateada = dd + '/' + mm + '/' + yyyy;

	return fechaFormateada;

}

function mostrarMensaje(tipoMensaje, mensaje, tiempo) {

	var contexto = obtenerContexto();

	var urlImagen;

	if (tipoMensaje == VG_TIPO_MENSAJE_INFO) {
		urlImagen = "/" + contexto + "/img/ok.png";
	} else if (tipoMensaje == VG_TIPO_MENSAJE_WARNING) {
		urlImagen = "/" + contexto + "/img/warning.png";
	} else if (tipoMensaje == VG_TIPO_MENSAJE_ERROR) {
		urlImagen = "/" + contexto + "/img/error.png";
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
		time : 10000
	});
}

function renderizarListaMensajes(listaMensajes, idContenedorDondeRenderizar) {
	var mensajeCompleto = "<table>";
	for (var i = 0; i < listaMensajes.length; i++) {
		elemento = listaMensajes[i];
		mensajeCompleto = mensajeCompleto + "<tr><td>" + elemento.mensaje
				+ "</td></tr>";
	}
	mensajeCompleto = mensajeCompleto + "</table>";
	$("#" + idContenedorDondeRenderizar).html(mensajeCompleto);
}

function obtenerContexto() {

	var contexto;
	var a = location.pathname.split("/");
	if (a.length > 2) {
		contexto = a[1];
	}

	return contexto;
}

function confirmarOperacion(titulo, mensaje, textoBotonAceptar,
		textoBotonCancelar, funcionBotonAceptar) {

	$("#confirmarOperacion").html("");

	$.ajax({
		url : '../comun/confirmar.htm?',
		type : "GET",
		async : true,
		cache : false
	}).done(function(html) {
		$("#confirmarOperacion").html(html);
		crearPopUp("confirmarOperacion", null, 350, titulo);
		$("input[type=button]").button();

		if (mensaje != null && mensaje.length > 0) {
			$("#idConfirmarMensaje").html(mensaje);
		}

		if (textoBotonAceptar != null && textoBotonAceptar.length > 0) {
			$("#idConfirmarBotonAceptar").val(textoBotonAceptar);
		}

		if (textoBotonCancelar != null && textoBotonCancelar.length > 0) {
			$("#idConfirmarBotonCancelar").val(textoBotonCancelar);
		}

		nombreMetodoConfirmar = funcionBotonAceptar;
	});
}

function confirmarOperacionAceptar() {
	if (nombreMetodoConfirmar != null) {
		eval(nombreMetodoConfirmar);
	}
}

function confirmarOperacionCancelar() {
	cerrarPopUp("confirmarOperacion");
}

function formatearNumeroConComas(numero) {

	if (numero == null || numero == "") {
		return '0.00';

	} else {

		return number_format(numero, 2, '.', ',');

	}

}

function formateadorDecimalesGrid(cellvalue, options, rowObject) {

	if (cellvalue == null || cellvalue == "") {
		return '0.00';

	} else {

		return number_format(cellvalue, 2, '.', ',');
	}

}

function menuAyuda() {
	var objSessionAyuda = obtenerDatosSession();
	var idPais = objSessionAyuda.objeto.pais.idPais;
	if (idPais == 1) {
		window.location
				.assign("https://www.infocorp.com.pe/servicio_cliente_equifax.asp");
	}
}
