function guardarPerfil() {
	bloquearPantalla();
	var formulario = $("#formularioRegistrar").serialize();
	$
			.ajax({
				url : "guardarPerfil.json",
				data : formulario,
				type : "POST",
				async : false,
				cache : false
			})
			.done(
					function(jsonData) {
						desbloquearPantalla();
						if (jsonData.respuesta == VG_RESPUESTA_OK) {
							actualizarListaPerfiles();
							cerrarPopUp("registrarPerfil");
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

}
