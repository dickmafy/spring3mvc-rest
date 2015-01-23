package net.codejava.spring.service;
/*
import net.codejava.spring.dao.BookDAO;
import net.codejava.spring.generic.AbstractHibernateDao;
import net.codejava.spring.model.AddressBook;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AddressBookServiceImpl extends AbstractHibernateDao<AddressBook> implements AddressBookService  {
	
	@Autowired
	BookDAO bookDAO;

	@Autowired
	SessionFactory sessionFactory;

	List<AddressBook> addressBooks = new ArrayList<AddressBook>();

	private static Long id = 0L;

	public List<AddressBook> viewAllAddressBook() {

		return addressBooks;
	}

	public void createAddressBook(AddressBook addressBook) {
		addressBooks.add(addressBook);
		try {
			getCurrentSession().save(addressBook);
		} catch (Exception e) {
			e.printStackTrace();
			sessionFactory.openSession().save(addressBook);
			
		}
		
	}

	public void updateAddressBook(int pos, AddressBook updateAddressBook) {
		addressBooks.set(pos, updateAddressBook);
	}

	public void deleteAddressBook(int id) {
		addressBooks.remove(id);
	}

	public void deleteAllAddressBook() {
		addressBooks.clear();
		id = 0L;
	}

	public AddressBook findAddressBook(int id) {
		return addressBooks.get(id);
	}
}
*/