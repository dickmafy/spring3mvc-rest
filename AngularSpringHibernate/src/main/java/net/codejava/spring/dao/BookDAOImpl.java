package net.codejava.spring.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class BookDAOImpl  {
	/*
	@Autowired
	private SessionFactory sessionFactory;

	private Session session() {
	    return sessionFactory.getCurrentSession();
	}
	
	@Override
	@Transactional
	public List<AddressBook> list() {
		@SuppressWarnings("unchecked")
		List<AddressBook> listUser = (List<AddressBook>) session().createCriteria(AddressBook.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();

		return listUser;
	}
*/
}
