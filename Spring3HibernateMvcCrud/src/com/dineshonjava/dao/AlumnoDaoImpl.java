package com.dineshonjava.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.dineshonjava.model.Alumno;

/**
 * @author Dinesh Rajput
 *
 */
@Repository("alumnoDao")
public class AlumnoDaoImpl implements AlumnoDao {

	@Autowired
	private SessionFactory sessionFactory;
	

	@SuppressWarnings("unchecked")
	@Override
	public List<Alumno> listAlumnos() {
		return (List<Alumno>) sessionFactory.getCurrentSession().createCriteria(Alumno.class).list();

	}

}
