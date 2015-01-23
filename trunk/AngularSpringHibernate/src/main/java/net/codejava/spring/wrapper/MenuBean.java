package net.codejava.spring.wrapper;

public class MenuBean {
	
	private String nombre;
	private String url;
	private String descripcion;
	private String url_icono;
	private String flagReporte;
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getUrl_icono() {
		return url_icono;
	}
	public void setUrl_icono(String url_icono) {
		this.url_icono = url_icono;
	}
	public String getFlagReporte() {
		return flagReporte;
	}
	public void setFlagReporte(String flagReporte) {
		this.flagReporte = flagReporte;
	}
	
	@Override
	public String toString() {
		return "MenuBean [nombre=" + nombre + ", url=" + url + ", descripcion="
				+ descripcion + ", url_icono=" + url_icono + ", flagReporte="
				+ flagReporte + "]";
	}
	



	
	
}