package com.dineshonjava.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.dineshonjava.dao.AlumnoDao;
import com.dineshonjava.dao.EmployeeDao;
import com.dineshonjava.model.Alumno;
import com.dineshonjava.model.Employee;

/**
 * @author Dinesh Rajput
 *
 */
@Service("alumnoService")
@Transactional
public class AlumnoServiceImpl implements AlumnoService {

	@Autowired
	private AlumnoDao alumnoDao;
	
	
	@Override
	public List<Alumno> listAlumnos() {
		return alumnoDao.listAlumnos();

	}

}
