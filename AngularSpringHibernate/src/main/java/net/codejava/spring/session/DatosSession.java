package net.codejava.spring.session;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

@Component
@Scope(value="session", proxyMode=ScopedProxyMode.TARGET_CLASS)
public class DatosSession {
	
	private String contraseniaTemporal;
	private String servidor;
	private String oficina;
	
	
	public DatosSession() {
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
