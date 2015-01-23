package net.codejava.spring.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import org.hibernate.annotations.LazyToOne;
import org.hibernate.annotations.LazyToOneOption;
import net.codejava.spring.util.logick.DateHelper;

import java.util.Date;

@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pk_usuario")
	private Long id;

	@Column(name = "pk_perfil")
	private Long perfil;

	@Column
	private String usuario;

	@Column
	private String contrasena;

	@Column
	private Long pertenencia;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date creacion;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date modificacion;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date acceso;

	@Column
	private Long institucion;

	@Column
	private String nombres;

	@Column
	private String correo;

	@Column
	private Long estado;

	@Transient
	private String nombrePerfil;

	@Transient
	private String nombreUsuario;

	@Column
	private Long estadoPerfil;
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPerfil() {
		return perfil;
	}

	public void setPerfil(Long perfil) {
		this.perfil = perfil;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}

	public Date getCreacion() {
		return creacion;
	}

	public void setCreacion(Date creacion) {
		this.creacion = creacion;
	}

	public Date getModificacion() {
		return modificacion;
	}

	public void setModificacion(Date modificacion) {
		this.modificacion = modificacion;
	}

	public Date getAcceso() {
		return acceso;
	}

	public void setAcceso(Date acceso) {
		this.acceso = acceso;
	}

	public Long getInstitucion() {
		return institucion;
	}

	public void setInstitucion(Long institucion) {
		this.institucion = institucion;
	}

	public Long getPertenencia() {
		return pertenencia;
	}

	public void setPertenencia(Long pertenencia) {
		this.pertenencia = pertenencia;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public Long getEstado() {
		return estado;
	}

	public void setEstado(Long estado) {
		this.estado = estado;
	}

	public Long getEstadoPerfil() {
		return estadoPerfil;
	}

	public void setEstadoPerfil(Long estadoPerfil) {
		this.estadoPerfil = estadoPerfil;
	}

	public String getNombrePerfil() {
		return nombrePerfil;
	}

	public void setNombrePerfil(String nombrePerfil) {
		this.nombrePerfil = nombrePerfil;
	}

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}

	@Transient
	public String getUltimoAcceso() {
		if (acceso != null) {
			return DateHelper.getDateFormat("dd/MM/yyyy HH:mm", acceso);
		}
		return "";
	}

	public void setUltimoAcceso(String ultimoAcceso) {
	}

	

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}