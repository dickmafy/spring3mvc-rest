package net.codejava.spring.wrapper;

import java.util.List;

public class ResponseListBean<T> {
	
	private String estadoRespuesta;
	private Integer page;
	private Integer total;
	private Integer records;
	private List<T> rows;
	
	public ResponseListBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ResponseListBean(String estadoRespuesta, Integer page,
			Integer total, Integer records, List<T> rows) {
		super();
		this.estadoRespuesta = estadoRespuesta;
		this.page = page;
		this.total = total;
		this.records = records;
		this.rows = rows;
	}
	public String getEstadoRespuesta() {
		return estadoRespuesta;
	}
	public void setEstadoRespuesta(String estadoRespuesta) {
		this.estadoRespuesta = estadoRespuesta;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public Integer getRecords() {
		return records;
	}
	public void setRecords(Integer records) {
		this.records = records;
	}
	public List<T> getRows() {
		return rows;
	}
	public void setRows(List<T> rows) {
		this.rows = rows;
	}
	
	@Override
	public String toString() {
		return "ResponseListBean [estadoRespuesta=" + estadoRespuesta
				+ ", page=" + page + ", total=" + total + ", records="
				+ records + ", rows=" + rows + "]";
	}
	
}
