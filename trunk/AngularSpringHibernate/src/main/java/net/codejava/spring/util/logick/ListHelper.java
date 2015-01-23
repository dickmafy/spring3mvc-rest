 package net.codejava.spring.util.logick;
 
 import java.lang.reflect.Field;
 import java.util.ArrayList;
 import java.util.Iterator;
 import java.util.LinkedHashSet;
 import java.util.List;
 import org.apache.commons.beanutils.PropertyUtils;
 
 public class ListHelper
 {
   public List removeDuplicates(List lista)
   {
     LinkedHashSet set = new LinkedHashSet(lista);
     lista.clear();
     lista.addAll(set);
     set = null;
     return lista;
   }
 
   public List<Object> removeItem(List<Object> lista, String attribute, String value)
     throws Exception
   {
     for (int i = 0; i < lista.size(); i++)
     {
       Object object = lista.get(i);
       Field field = object.getClass().getField(attribute);
       if (field.get(object) == value)
         lista.remove(i);
     }
     Object object = null;
     Field field = null;
     return lista;
   }
 
   public static <T> boolean isInListById(List<T> list, String field, String value)
     throws Exception
   {
     for (int i = 0; i < list.size(); i++)
     {
       Object object = PropertyUtils.getProperty(list.get(i), field);
       if (object.toString().toUpperCase().equals(value.toUpperCase()))
       {
         object = null;
         return true;
       }
     }
     return false;
   }
 
   public static <T> List<T> startsWith(List<T> list, String field, String value) throws Exception
   {
     List suggestions = new ArrayList();
     for (Object item : list)
     {
       Object object = PropertyUtils.getProperty(item, field);
       if (object.toString().startsWith(value))
         suggestions.add(item);
     }
     return suggestions;
   }
 
   public static <T> List<T> joinLists(List<T> list1, List<T> list2) throws Exception
   {
     List lista = new ArrayList();
     Object item;
     for (Iterator localIterator = list1.iterator(); localIterator.hasNext(); lista.add(item)) item = (Object)localIterator.next();
     
     for (Iterator localIterator = list2.iterator(); localIterator.hasNext(); lista.add(item)) item = (Object)localIterator.next();
     return lista;
   }
 }

