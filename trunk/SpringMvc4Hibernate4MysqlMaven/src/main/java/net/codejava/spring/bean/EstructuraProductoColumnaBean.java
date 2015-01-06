package net.codejava.spring.bean;

import java.util.Date;

public class EstructuraProductoColumnaBean {

	private Integer codigo;
	private Integer codigoEstructura;
	private Integer versionEstructura;
	private Integer codigoProductoColumn;
	private String nombreColumna;
	private String tipoDato;
	private String longitud;
	private Integer numeroOrden;
	private String estado;
	private String usuarioCreacion;
	private Date fechaCreacion;
	private String usuarioModificacion;
	private Date fechaModificacion;
	
	public Integer getCodigo() {
		return codigo;
	}
	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}
	public Integer getCodigoEstructura() {
		return codigoEstructura;
	}
	public void setCodigoEstructura(Integer codigoEstructura) {
		this.codigoEstructura = codigoEstructura;
	}
	public Integer getVersionEstructura() {
		return versionEstructura;
	}
	public void setVersionEstructura(Integer versionEstructura) {
		this.versionEstructura = versionEstructura;
	}
	public Integer getCodigoProductoColumn() {
		return codigoProductoColumn;
	}
	public void setCodigoProductoColumn(Integer codigoProductoColumn) {
		this.codigoProductoColumn = codigoProductoColumn;
	}
	public Integer getNumeroOrden() {
		return numeroOrden;
	}
	public void setNumeroOrden(Integer numeroOrden) {
		this.numeroOrden = numeroOrden;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getUsuarioCreacion() {
		return usuarioCreacion;
	}
	public void setUsuarioCreacion(String usuarioCreacion) {
		this.usuarioCreacion = usuarioCreacion;
	}
	public Date getFechaCreacion() {
		return fechaCreacion;
	}
	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	public String getUsuarioModificacion() {
		return usuarioModificacion;
	}
	public void setUsuarioModificacion(String usuarioModificacion) {
		this.usuarioModificacion = usuarioModificacion;
	}
	public Date getFechaModificacion() {
		return fechaModificacion;
	}
	public void setFechaModificacion(Date fechaModificacion) {
		this.fechaModificacion = fechaModificacion;
	}
	public String getNombreColumna() {
		return nombreColumna;
	}
	public void setNombreColumna(String nombreColumna) {
		this.nombreColumna = nombreColumna;
	}
	public String getTipoDato() {
		return tipoDato;
	}
	public void setTipoDato(String tipoDato) {
		this.tipoDato = tipoDato;
	}
	public String getLongitud() {
		return longitud;
	}
	public void setLongitud(String longitud) {
		this.longitud = longitud;
	}
}
