function guardarCRCTREspecial() {
	bloquearPantalla();
	var formulario = $("#formularioRegistrar").serialize();
	$
			.ajax({
				url : "guardarCaracterEspecial.json",
				data : formulario,
				type : "POST",
				async : false,
				cache : false
			})
			.done(
					function(jsonData) {
						desbloquearPantalla();
						if (jsonData.respuesta == VG_RESPUESTA_OK) {
							actualizarListaCaracteresEspeciales();
							cerrarPopUp("registrarCRCTREspecial");
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
	$("#resultado_busqueda").css("display", "block");
}
