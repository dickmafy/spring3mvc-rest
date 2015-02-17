package net.codejava.spring.generic;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public class AbstractHibernateDao<T extends Serializable> {

	private Class<T> clazz;

	@Autowired
	SessionFactory sessionFactory;

	public final void setClazz(Class<T> clazzToSet) {
		this.clazz = clazzToSet;
	}

	public void save(T entity) {
		sessionFactory.getCurrentSession().persist(entity);
	}

	public void delete(T entity) {
		sessionFactory.getCurrentSession().delete(entity);
	}

	/*
	 * public T findOne( long id ){ return (T) getCurrentSession().get( clazz,
	 * id ); } public List< T > findAll(){ return
	 * getCurrentSession().createQuery( "from " + clazz.getName() ).list(); }
	 * 
	 * 
	 * 
	 * public void update( T entity ){ getCurrentSession().merge( entity ); }
	 * 
	 * 
	 * public void deleteById( long entityId ){ T entity = findOne( entityId );
	 * delete( entity ); }
	 */

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

}