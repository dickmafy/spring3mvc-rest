package net.codejava.spring;

import java.util.List;

import net.codejava.spring.dao.BookDAO;
import net.codejava.spring.dao.UserDAO;
import net.codejava.spring.model.AddressBook;
import net.codejava.spring.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	@Autowired
	private UserDAO userDao;
	@Autowired
	private BookDAO dao;
	
	@RequestMapping(value="/")
	public ModelAndView index() {
		List<User> listUsers = userDao.list();
		List<AddressBook> listBook= dao.list();
		ModelAndView model = new ModelAndView("index");
		model.addObject("userList", listUsers);
		
		return model;
	}
	
}
