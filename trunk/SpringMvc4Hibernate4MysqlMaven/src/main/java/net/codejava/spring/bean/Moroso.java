package net.codejava.spring.bean;

import java.util.Date;

public class Moroso {
	private Integer codigo;
	private String tipoPersona;
	private String tipoDocumento;
	private String numDocumento;
	private String numDocumentoMoroso;
	private String apePaterno;
	private String apeMaterno;
	private String nombres;
	private String direccion;
	private String departamento;
	private String provincia;
	private String distrito;
	
	private Date fchReporte;
	private Integer codTipoMoneda;
	
	private Date fchVencimiento;
	private String tipoMoneda;
	private String monto;
	private String deuda;
	private String docCredito;

	public String getTipoPersona() {
		return tipoPersona;
	}

	public void setTipoPersona(String tipoPersona) {
		this.tipoPersona = tipoPersona;
	}

	public String getTipoDocumento() {
		return tipoDocumento;
	}

	public void setTipoDocumento(String tipoDocumento) {
		this.tipoDocumento = tipoDocumento;
	}

	public String getNumDocumento() {
		return numDocumento;
	}

	public void setNumDocumento(String numDocumento) {
		this.numDocumento = numDocumento;
	}

	public String getNumDocumentoMoroso() {
		return numDocumentoMoroso;
	}

	public void setNumDocumentoMoroso(String numDocumentoMoroso) {
		this.numDocumentoMoroso = numDocumentoMoroso;
	}

	public String getApePaterno() {
		return apePaterno;
	}

	public void setApePaterno(String apePaterno) {
		this.apePaterno = apePaterno;
	}

	public String getApeMaterno() {
		return apeMaterno;
	}

	public void setApeMaterno(String apeMaterno) {
		this.apeMaterno = apeMaterno;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getDepartamento() {
		return departamento;
	}

	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}

	public String getProvincia() {
		return provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}

	public String getDistrito() {
		return distrito;
	}

	public void setDistrito(String distrito) {
		this.distrito = distrito;
	}

	public String getTipoMoneda() {
		return tipoMoneda;
	}

	public void setTipoMoneda(String tipoMoneda) {
		this.tipoMoneda = tipoMoneda;
	}

	public String getMonto() {
		return monto;
	}

	public void setMonto(String monto) {
		this.monto = monto;
	}

	public String getDeuda() {
		return deuda;
	}

	public void setDeuda(String deuda) {
		this.deuda = deuda;
	}

	public String getDocCredito() {
		return docCredito;
	}

	public void setDocCredito(String docCredito) {
		this.docCredito = docCredito;
	}

	public Integer getCodTipoMoneda() {
		return codTipoMoneda;
	}

	public void setCodTipoMoneda(Integer codTipoMoneda) {
		this.codTipoMoneda = codTipoMoneda;
	}

	public Date getFchVencimiento() {
		return fchVencimiento;
	}

	public void setFchVencimiento(Date fchVencimiento) {
		this.fchVencimiento = fchVencimiento;
	}

	public Date getFchReporte() {
		return fchReporte;
	}

	public void setFchReporte(Date fchReporte) {
		this.fchReporte = fchReporte;
	}

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

}
