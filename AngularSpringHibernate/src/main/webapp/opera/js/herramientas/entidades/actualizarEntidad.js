function actualizarEntidad() {
	bloquearPantalla();

	var formulario = $("#formularioActualizar").serialize();

	$
			.ajax({
				url : "actualizarEntidad.json",
				data : formulario,
				type : "POST",
				async : false,
				cache : false
			})
			.done(
					function(jsonData) {
						desbloquearPantalla();
						if (jsonData.respuesta == VG_RESPUESTA_OK) {
							actualizarListaEntidad();
							cerrarPopUp("editarEntidad");
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