package com.dineshonjava.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.dineshonjava.bean.AlumnoBean;
import com.dineshonjava.dao.AlumnoDao;
import com.dineshonjava.model.Alumno;
import com.dineshonjava.service.AlumnoService;

/**
 *
@Controller --> Declare a Spring MVC Controller
@RequestMapping("/computer") --> Map an URI with a controller or a method
@PathVariable --> Read a variable in an Uri and assign this value to a java variable
@RequestBody --> Declare a Pojo class to map the http request body  
@ResponseBody --> Declare a Pojo class to generate Json content to return to the http client
 */
@Controller
@RequestMapping("/alumnos")
public class AlumnoController {
	
	private static final Logger logger = LoggerFactory.getLogger(AlumnoController.class);
	
		@Autowired
		private AlumnoService alumnoService;
		
		@RequestMapping(value="/alumnos", method = RequestMethod.GET)
		public ModelAndView obtenerAlumnos(){
			Map<String, Object> model = new HashMap<String, Object>();
			model.put("alumnos",  prepareListofBean(this.alumnoService.listAlumnos()));
			return new ModelAndView("alumnoList", model);
			
		}
		
		@RequestMapping(value = "/{mensaje}",method = RequestMethod.GET,headers="Accept=*/*")
		@ResponseBody 
		public String mostrarMensaje(@PathVariable String mensaje){
		
			logger.info("AlumnoByDni. ID="+mensaje);
			 String result="Hello "+mensaje; 
			 return result;
//			Map<String, Object> model = new HashMap<String, Object>();
//			List<Alumno> alumnoList = new ArrayList<Alumno>();
//	        Set<Integer> empIdKeys = mapAlumno.keySet();
//	        for(Integer i : empIdKeys){
//	            alumnoList.add(mapAlumno.get(i));
//	        }
//	        return alumnoList;
		}
		
	@RequestMapping(value = "/dni/{dni}", method = RequestMethod.GET, headers="Accept=*/*")
	public ModelAndView AlumnoByDni(@PathVariable String dni,ModelMap model) {
		Map<String, Object> model1 = new HashMap<String, Object>();
		model1.put("alumnos",  prepareListofBean(this.alumnoService.listAlumnos()));
		return new ModelAndView("alumnoList", model1);

	}
		
		
		private List<AlumnoBean> prepareListofBean(List<Alumno> alumnos) {
			List<AlumnoBean> beans = null;
			if(alumnos != null && !alumnos.isEmpty()){
				beans = new ArrayList<AlumnoBean>();
				AlumnoBean bean = null;
				for(Alumno item : alumnos){
					bean = new AlumnoBean();
					bean.setId(item.getId());
					bean.setNombre(item.getNombre());
					bean.setApellidos(item.getApellidos());
					bean.setDni(item.getDni());
					bean.setDireccion(item.getDireccion());
					
					
					beans.add(bean);
				}
			}
			return beans;
		}

	
		
	 
	}
