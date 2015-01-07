package hello;

public class Usuario {

	
	
	public Usuario(String nombre, Integer puesto) {
		super();
		this.nombre = nombre;
		this.puesto = puesto;
	}
	private String nombre;
	private Integer clave;
	private Integer puesto;
	private String estaConectado;
	
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public Integer getClave() {
		return clave;
	}
	public void setClave(Integer clave) {
		this.clave = clave;
	}
	public Integer getPuesto() {
		return puesto;
	}
	public void setPuesto(Integer puesto) {
		this.puesto = puesto;
	}
	public String getEstaConectado() {
		return estaConectado;
	}
	public void setEstaConectado(String estaConectado) {
		this.estaConectado = estaConectado;
	}
	
	
	
}
