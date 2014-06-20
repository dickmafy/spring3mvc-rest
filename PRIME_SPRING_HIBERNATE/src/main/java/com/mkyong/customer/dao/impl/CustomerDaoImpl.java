package com.mkyong.customer.dao.impl;
 
import java.util.Date;
import java.util.List;
 


import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.mkyong.customer.dao.CustomerDao;
import com.mkyong.customer.model.Customer;
 
public class CustomerDaoImpl implements CustomerDao{
 
	@Autowired
	SessionFactory sessionFactory;
	
	public CustomerDaoImpl(SessionFactory sessionFactory){
		this.sessionFactory = sessionFactory;

	}
	
	@Transactional
	public void addCustomer(Customer customer){
		customer.setCreatedDate(new Date());
		sessionFactory.getCurrentSession().save(customer);
	}
 
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Customer> findAllCustomer(){
		
		try {
			List<Customer> listUser = (List<Customer>) sessionFactory.getCurrentSession()
					.createCriteria(Customer.class).list();
					//.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();

			return listUser;
		} catch (HibernateException e) {
			return null;
			
			
		}
		
		//return getHibernateTemplate().find("from Customer");
 
	}
}