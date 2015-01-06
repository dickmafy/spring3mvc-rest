package net.codejava.spring.bean;

public class DatosSessionBean {
	
	private String contraseniaTemporal;
	private String servidor;
	private String oficina;
	
	public DatosSessionBean() {
		super();
	}
	
	
	public String getContraseniaTemporal() {
		return contraseniaTemporal;
	}
	public void setContraseniaTemporal(String contraseniaTemporal) {
		this.contraseniaTemporal = contraseniaTemporal;
	}
	public String getServidor() {
		return servidor;
	}
	public void setServidor(String servidor) {
		this.servidor = servidor;
	}
	
	public String getOficina() {
		return oficina;
	}
	public void setOficina(String oficina) {
		this.oficina = oficina;
	}
	
	
		
	

}
