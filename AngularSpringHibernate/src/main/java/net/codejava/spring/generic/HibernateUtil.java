package net.codejava.spring.generic;


import net.codejava.spring.model.Usuario;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    public static void main(String args[]){
    	Configuration configuration = new Configuration().configure();
    	StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties());
    	SessionFactory factory = configuration.buildSessionFactory(builder.build());
    	Session session = factory.openSession();
/*
    	Usuario employee = new Usuario();
    	session.beginTransaction();
    	session.save(employee);
    	session.getTransaction().commit();*/
    }
}