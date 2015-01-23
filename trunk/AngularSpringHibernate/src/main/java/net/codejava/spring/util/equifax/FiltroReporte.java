package net.codejava.spring.util.equifax;

import java.util.ArrayList;
import java.util.List;

public class FiltroReporte {

	
	private String fecha;
	private String titulo;
	private String tmpFile;
	private List listaRpt;
	
	
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getTmpFile() {
		return tmpFile;
	}
	public void setTmpFile(String tmpFile) {
		this.tmpFile = tmpFile;
	}
	public List getListaRpt() {
		return listaRpt;
	}
	public void setListaRpt(List listaRpt) {
		this.listaRpt = listaRpt;
	}
	
	
}
