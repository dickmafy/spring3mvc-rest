package net.codejava.spring.dao;

import java.util.List;

import net.codejava.spring.model.Usuario;

public interface UserDAO {
	public List<Usuario> list();
	void deleteUsuario(Usuario o);
}
