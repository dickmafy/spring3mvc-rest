package net.codejava.spring.wrapper;

import java.util.List;

public class ResponseObjectBean <T> {
	
	private String respuesta;
	private String tipoMensaje;
	private String mensaje;
	private List<MensajeValidacionBean> listaMensajesValidacion;

	private T objeto;

	public ResponseObjectBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ResponseObjectBean(String respuesta, String tipoMensaje,
			String mensaje,
			List<MensajeValidacionBean> listaMensajesValidacion, T objeto) {
		super();
		this.respuesta = respuesta;
		this.tipoMensaje = tipoMensaje;
		this.mensaje = mensaje;
		this.listaMensajesValidacion = listaMensajesValidacion;
		this.objeto = objeto;
	}

	public String getRespuesta() {
		return respuesta;
	}

	public void setRespuesta(String respuesta) {
		this.respuesta = respuesta;
	}

	public String getTipoMensaje() {
		return tipoMensaje;
	}

	public void setTipoMensaje(String tipoMensaje) {
		this.tipoMensaje = tipoMensaje;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public List<MensajeValidacionBean> getListaMensajesValidacion() {
		return listaMensajesValidacion;
	}

	public void setListaMensajesValidacion(
			List<MensajeValidacionBean> listaMensajesValidacion) {
		this.listaMensajesValidacion = listaMensajesValidacion;
	}

	public T getObjeto() {
		return objeto;
	}

	public void setObjeto(T objeto) {
		this.objeto = objeto;
	}

	@Override
	public String toString() {
		return "ResponseObjectBean [respuesta=" + respuesta + ", tipoMensaje="
				+ tipoMensaje + ", mensaje=" + mensaje
				+ ", listaMensajesValidacion=" + listaMensajesValidacion
				+ ", objeto=" + objeto + "]";
	}


	
	
	
}
