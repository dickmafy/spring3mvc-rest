function guardarPais() {
	bloquearPantalla();
	var formulario = $("#formularioRegistrar").serialize();
	$
			.ajax({
				url : "guardarPais.json",
				data : formulario,
				type : "POST",
				async : false,
				cache : false
			})
			.done(
					function(jsonData) {
						desbloquearPantalla();
						if (jsonData.respuesta == VG_RESPUESTA_OK) {
							actualizarListaPaises();
							cerrarPopUp("registrarPais");
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
