package net.codejava.spring.dao;

import java.util.List;

import net.codejava.spring.model.Usuario;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserDAOImpl implements UserDAO {
	
	@Autowired
	private SessionFactory sessionFactory;


	@Override
	@Transactional
	public List<Usuario> list() {
		@SuppressWarnings("unchecked")
		List<Usuario> listUser = (List<Usuario>) sessionFactory.getCurrentSession()
				.createCriteria(Usuario.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();

		return listUser;
	}
	
	@Override
	public void deleteUsuario(Usuario o) {
		Session session = sessionFactory.openSession();
		session.delete(o);
		//session.flush();
		
	}

}
