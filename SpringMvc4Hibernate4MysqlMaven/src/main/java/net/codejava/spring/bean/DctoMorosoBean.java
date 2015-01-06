package net.codejava.spring.bean;

import java.util.List;


public class DctoMorosoBean {

	private String codigomoroso;	
	private String nroDocMoroso;
	private String codTipoDocCredito;
	
	private String codTipMoneda;
	private String monto;
	private String fecvencimiento;
	private String codTipCondicionDeuda;
	
	private List<AvalBean> aval;
	private String cantAval;
	
	
	private String fecReporte;
	private String fecRegistro;
	
	private String estadoExportacionHost;
	private String validacionIdentidad;
	private String estadoCancelacion;
	private String estadoRegistro;
	
	private String validacionCaracteres;
	
	private String tipoMovimiento;	
	private String tipoIngresoDocumento;
	private String estado;
	
	
	public String getCodigomoroso() {
		return codigomoroso;
	}

	public void setCodigomoroso(String codigomoroso) {
		this.codigomoroso = codigomoroso;
	}

	public String getNroDocMoroso() {
		return nroDocMoroso;
	}

	public void setNroDocMoroso(String nroDocMoroso) {
		this.nroDocMoroso = nroDocMoroso;
	}

	public String getCodTipoDocCredito() {
		return codTipoDocCredito;
	}

	public void setCodTipoDocCredito(String codTipoDocCredito) {
		this.codTipoDocCredito = codTipoDocCredito;
	}

	public String getCodTipMoneda() {
		return codTipMoneda;
	}

	public void setCodTipMoneda(String codTipMoneda) {
		this.codTipMoneda = codTipMoneda;
	}

	

	

	public String getMonto() {
		return monto;
	}

	public void setMonto(String monto) {
		this.monto = monto;
	}

	public String getFecvencimiento() {
		return fecvencimiento;
	}

	public void setFecvencimiento(String fecvencimiento) {
		this.fecvencimiento = fecvencimiento;
	}

	public String getCodTipCondicionDeuda() {
		return codTipCondicionDeuda;
	}

	public void setCodTipCondicionDeuda(String codTipCondicionDeuda) {
		this.codTipCondicionDeuda = codTipCondicionDeuda;
	}

	

	
	public List<AvalBean> getAval() {
		return aval;
	}

	public void setAval(List<AvalBean> aval) {
		this.aval = aval;
	}



	public String getFecReporte() {
		return fecReporte;
	}

	public void setFecReporte(String fecReporte) {
		this.fecReporte = fecReporte;
	}

	public String getCantAval() {
		return cantAval;
	}

	public void setCantAval(String cantAval) {
		this.cantAval = cantAval;
	}

	public String getFecRegistro() {
		return fecRegistro;
	}

	public void setFecRegistro(String fecRegistro) {
		this.fecRegistro = fecRegistro;
	}

	public String getEstadoExportacionHost() {
		return estadoExportacionHost;
	}

	public void setEstadoExportacionHost(String estadoExportacionHost) {
		this.estadoExportacionHost = estadoExportacionHost;
	}

	public String getValidacionIdentidad() {
		return validacionIdentidad;
	}

	public void setValidacionIdentidad(String validacionIdentidad) {
		this.validacionIdentidad = validacionIdentidad;
	}

	public String getEstadoCancelacion() {
		return estadoCancelacion;
	}

	public void setEstadoCancelacion(String estadoCancelacion) {
		this.estadoCancelacion = estadoCancelacion;
	}

	public String getEstadoRegistro() {
		return estadoRegistro;
	}

	public void setEstadoRegistro(String estadoRegistro) {
		this.estadoRegistro = estadoRegistro;
	}

	public String getTipoMovimiento() {
		return tipoMovimiento;
	}

	public void setTipoMovimiento(String tipoMovimiento) {
		this.tipoMovimiento = tipoMovimiento;
	}

	public String getTipoIngresoDocumento() {
		return tipoIngresoDocumento;
	}

	public void setTipoIngresoDocumento(String tipoIngresoDocumento) {
		this.tipoIngresoDocumento = tipoIngresoDocumento;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	

	public String getValidacionCaracteres() {
		return validacionCaracteres;
	}

	public void setValidacionCaracteres(String validacionCaracteres) {
		this.validacionCaracteres = validacionCaracteres;
	}
	
	
	
}
