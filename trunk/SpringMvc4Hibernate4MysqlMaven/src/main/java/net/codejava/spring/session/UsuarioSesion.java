package net.codejava.spring.session;

import java.io.Serializable;

public class UsuarioSesion implements Serializable {

	private static final long serialVersionUID = -349934575422007675L;
	private String codigoUsuario;
	private String estado;
	private String codigoPerfil;
	private String tipoUsuario;

	public UsuarioSesion() {
		super();
	}

	public UsuarioSesion(String codigoUsuario, String estado, String codigoPerfil, String tipoUsuario) {
		super();
		this.codigoUsuario = codigoUsuario;
		this.estado = estado;
		this.codigoPerfil = codigoPerfil;
		this.tipoUsuario = tipoUsuario;
	}

	public String getCodigoUsuario() {
		return codigoUsuario;
	}

	public void setCodigoUsuario(String codigoUsuario) {
		this.codigoUsuario = codigoUsuario;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getCodigoPerfil() {
		return codigoPerfil;
	}

	public void setCodigoPerfil(String codigoPerfil) {
		this.codigoPerfil = codigoPerfil;
	}

	public String getTipoUsuario() {
		return tipoUsuario;
	}

	public void setTipoUsuario(String tipoUsuario) {
		this.tipoUsuario = tipoUsuario;
	}

}
