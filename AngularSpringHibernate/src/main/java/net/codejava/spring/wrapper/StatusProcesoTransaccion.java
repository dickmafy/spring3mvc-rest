package net.codejava.spring.wrapper;


public class StatusProcesoTransaccion {
	
	private String estado;
	private String descError;
	private String mensaje;
	private String usuario;
	private int result;
	
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getDescError() {
		return descError;
	}
	public void setDescError(String descError) {
		this.descError = descError;
	}

	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public int getResult() {
		return result;
	}
	public void setResult(int result) {
		this.result = result;
	}
	

}
