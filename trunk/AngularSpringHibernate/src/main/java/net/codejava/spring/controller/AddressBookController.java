package net.codejava.spring.controller;

import net.codejava.spring.generic.AbstractHibernateDao;
import net.codejava.spring.model.AddressBook;
import net.codejava.spring.service.AddressBookService;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by tmichels on 8/3/14.
 */

@Controller
@RequestMapping("/address")
public class AddressBookController extends AbstractHibernateDao<AddressBook>{

    @Autowired
    AddressBookService bookService;
    
    @Autowired
    SessionFactory sessionFactory;
    
    @SuppressWarnings("unchecked")
	@RequestMapping(value = "/all.json", method = RequestMethod.GET)
    public @ResponseBody List<AddressBook> viewAllAddressBook(){
    	List<AddressBook> list= sessionFactory.openSession().createCriteria(AddressBook.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();
    	 return list;
        //return bookDao.viewAllAddressBook();
    	
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public @ResponseBody void addAddressBookEntry(@RequestBody AddressBook addressBook){
        bookService.createAddressBook(addressBook);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteAddressBookEntry(@PathVariable("id") String id){
        bookService.deleteAddressBook(Integer.valueOf(id));
    }

    @RequestMapping(value = "/update/{pos}", method = RequestMethod.PUT)
    public @ResponseBody void updateAddressBook(@RequestBody AddressBook addressBook, @PathVariable("pos") String pos){
        bookService.updateAddressBook(Integer.valueOf(pos), addressBook);
    }

    @RequestMapping(value="/delete/all", method = RequestMethod.DELETE)
    public @ResponseBody void deleteAllAddressBook(){
        bookService.deleteAllAddressBook();
    }

    @RequestMapping("/layout")
    public String getTodoPartialPage() {
        return "addressbook/layout";
    }
}


