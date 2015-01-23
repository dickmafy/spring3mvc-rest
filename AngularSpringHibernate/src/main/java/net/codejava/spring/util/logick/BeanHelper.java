	package net.codejava.spring.util.logick;
 
 import net.codejava.spring.util.support.ServiceException;
 import java.lang.annotation.Annotation;
 import java.lang.reflect.Field;
 import javax.persistence.Table;
 
 public class BeanHelper
 {
   public static void printAll(Object object)
     throws Exception
   {
     Field[] fields = object.getClass().getDeclaredFields();
     for (Field f : fields)
     {
       f.setAccessible(true);
       System.out.print(f.getName());
       if (f.get(object) != null) System.out.print(": " + f.get(object)); else
         System.out.print(": null");
       System.out.println("");
     }
     fields = null;
   }
 
   public static Object newInstance(Object object)
     throws Exception
   {
     Class clazz = object.getClass();
	Object tmpObject;
     try {
       tmpObject = Class.forName(clazz.getName()).newInstance();
     }
     catch (InstantiationException e)
     {
       
       throw new ServiceException(e); } catch (IllegalAccessException e) {
       throw new ServiceException(e); } catch (ClassNotFoundException e) {
       throw new ServiceException(e);
     }
     
     return tmpObject;
   }
 
   public static Object toUpperCase(Object object)
     throws Exception
   {
     Field[] fields = object.getClass().getDeclaredFields();
     for (Field f : fields)
     {
       f.setAccessible(true);
       if (f.get(object) != null)
       {
         if (f.getType() == String.class)
         {
           String value = (String)f.get(object);
           f.set(object, value.toUpperCase());
           value = null;
         }
       }
     }
     fields = null;
     return object;
   }
 
   public static String getTableName(Object object)
   {
     Annotation annotation = object.getClass().getAnnotation(Table.class);
     if (annotation != null)
       try {
         return (String)annotation.annotationType().getMethod("name", new Class[0]).invoke(annotation, new Object[0]); } catch (Exception ex) {
         System.out.println(ex);
       }
     return null;
   }
 }
