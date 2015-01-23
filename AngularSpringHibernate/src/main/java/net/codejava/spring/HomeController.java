package net.codejava.spring;

import java.util.List;

import net.codejava.spring.dao.UserDAO;
import net.codejava.spring.model.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class HomeController {
	
	@Autowired
	private UserDAO userDao;
	
	
	@RequestMapping(value="/")
	public ModelAndView index() {
		List<Usuario> listUsers = userDao.list();
		ModelAndView model = new ModelAndView("index");
		model.addObject("userList", listUsers);
		return model;
	}
	
}
