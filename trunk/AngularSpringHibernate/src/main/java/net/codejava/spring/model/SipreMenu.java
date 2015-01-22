package net.codejava.spring.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * 
 * @author DIEGO
 */
@Entity
@Table(name = "SIPRE_MENU")
public class SipreMenu implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	@Column(name = "MENU_ID")
	private String menuId;

	@Column(name = "PADRE")
	private String padre;

	@Column(name = "HIJO")
	private String hijo;

	@Column(name = "EST")
	private Character est;

	public SipreMenu() {
	}

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public String getPadre() {
		return padre;
	}

	public void setPadre(String padre) {
		this.padre = padre;
	}

	public String getHijo() {
		return hijo;
	}

	public void setHijo(String hijo) {
		this.hijo = hijo;
	}

	public Character getEst() {
		return est;
	}

	public void setEst(Character est) {
		this.est = est;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
