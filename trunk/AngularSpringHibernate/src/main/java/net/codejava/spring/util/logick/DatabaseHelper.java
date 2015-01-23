 package net.codejava.spring.util.logick;
 
 import java.io.PrintStream;
 import java.io.PrintWriter;
 import java.io.StringWriter;

import net.codejava.spring.dao.ProductoDAOImpl;

import org.apache.log4j.Logger;
 
 public class DatabaseHelper
 {
	private static final Logger LOG = Logger.getLogger(ProductoDAOImpl.class);

   public static String getOracleError(Exception error)
   {
     try
     {
       StringWriter sw = new StringWriter();
       PrintWriter pw = new PrintWriter(sw);
       System.out.println("tata.....:    " + error);
       error.printStackTrace(pw);
       System.out.println("......:    " + sw);
       String value = sw.toString().substring(sw.toString().indexOf("ORA-") + 4, sw.toString().indexOf("ORA-") + 9);
       String mensaje = null;
       switch (Integer.valueOf(value).intValue()) {
       case 1:
         mensaje = "Se desea grabar un registro que ya existe"; break;
       case 18:
         mensaje = "Base de datos, no responde"; break;
       case 22:
         mensaje = "Error, por invalidacion de logueo a la base de datos"; break;
       case 100:
         mensaje = "Error, no encuentra data que se busca"; break;
       case 911:
         mensaje = "Error, por motivos de caracter invalido"; break;
       case 1033:
         mensaje = "Error, la base de datos se esta apagando"; break;
       case 1073:
         mensaje = "Error, fallas de conexion con la base de datos"; break;
       case 1426:
         mensaje = "Error, por numero muy grande"; break;
       case 1456:
         mensaje = "Error, No se puede ejecutar operacion"; break;
       case 1489:
         mensaje = "Error, Cadena a procesar es muy larga"; break;
       case 2043:
         mensaje = "Error, No se pudo ejecutar accion"; break;
       case 2292:
         mensaje = "Error, por integridad de data"; break;
       case 12336:
         mensaje = "Error, No pudo sincronizar con base de datos"; break;
       case 13009:
         mensaje = "Error, Cadena ingresada es invalida"; break;
       case 13011:
         mensaje = "Error, Valor muy largo"; break;
       case 22973:
         mensaje = "Error, Cadena que se quiere modificar es muy larga de la permitida"; break;
       case 29355:
         mensaje = "Error, Faltan llenar campos"; break;
       case 32802:
         mensaje = "Error, Al intentar ingresar un valor que no es cadena"; break;
       case 32806:
         mensaje = "Error, Uno de los valores a ingresar es muy largo"; break;
       case 38101:
         mensaje = "Error, No se pudo insertar la data requerida"; break;
       case 38103:
         mensaje = "Error, No se pudo actualizar registro"; break;
       }return "Error al ejecutar la operacion";
     }
     catch (Exception ex)
     {
       LOG.info("Error al ejecutar la clase DBHelper" + ex.getMessage());
       System.out.println("Eror :" + ex);
       System.out.println("Descripcion Error: " + ex.getMessage());
       return "Error al ejecutar la operacion, error controlado1: " + ex;
     }
   }
 
   public static String getMysqlError(Exception error)
   {
     try
     {
       StringWriter sw = new StringWriter();
       PrintWriter pw = new PrintWriter(sw);
       error.printStackTrace(pw);
       System.out.println("......:    " + sw);
       String value = sw.toString().substring(sw.toString().indexOf("ORA-") + 4, sw.toString().indexOf("ORA-") + 9);
       String mensaje = null;
       switch (Integer.valueOf(value).intValue()) {
       case 1:
         mensaje = "Se desea grabar un registro que ya existe"; break;
       case 18:
         mensaje = "Base de datos, no responde"; break;
       case 22:
         mensaje = "Error, por invalidacion de logueo a la base de datos"; break;
       case 100:
         mensaje = "Error, no encuentra data que se busca"; break;
       case 911:
         mensaje = "Error, por motivos de caracter invalido"; break;
       case 1033:
         mensaje = "Error, la base de datos se esta apagando"; break;
       case 1073:
         mensaje = "Error, fallas de conexion con la base de datos"; break;
       case 1426:
         mensaje = "Error, por numero muy grande"; break;
       case 1456:
         mensaje = "Error, No se puede ejecutar operacion"; break;
       case 1489:
         mensaje = "Error, Cadena a procesar es muy larga"; break;
       case 2043:
         mensaje = "Error, No se pudo ejecutar accion"; break;
       case 2292:
         mensaje = "Error, por integridad de data"; break;
       case 12336:
         mensaje = "Error, No pudo sincronizar con base de datos"; break;
       case 13009:
         mensaje = "Error, Cadena ingresada es invalida"; break;
       case 13011:
         mensaje = "Error, Valor muy largo"; break;
       case 22973:
         mensaje = "Error, Cadena que se quiere modificar es muy larga de la permitida"; break;
       case 29355:
         mensaje = "Error, Faltan llenar campos"; break;
       case 32802:
         mensaje = "Error, Al intentar ingresar un valor que no es cadena"; break;
       case 32806:
         mensaje = "Error, Uno de los valores a ingresar es muy largo"; break;
       case 38101:
         mensaje = "Error, No se pudo insertar la data requerida"; break;
       case 38103:
         mensaje = "Error, No se pudo actualizar registro"; break;
       }return "Error al ejecutar la operacion";
     }
     catch (Exception ex)
     {
       LOG.info("Error al ejecutar la clase DBHelper" + ex.getMessage());
       System.out.println("Eror :" + ex);
       System.out.println("Descripcion Error: " + ex.getMessage());
       return "Error al ejecutar la operacion, error controlado2: " + ex;
     }
   }

   /*
   public static String getPostgresqlError(Exception error)
   {
     try
     {
       StringWriter sw = new StringWriter();
       PrintWriter pw = new PrintWriter(sw);
       error.printStackTrace(pw);
       System.out.println("..." + sw);
       if (error.getCause().getCause().getCause().getCause().getClass() == PSQLException.class)
       {
         PSQLException object = (PSQLException)error.getCause().getCause().getCause().getCause();
         switch (Integer.valueOf(object.getSQLState()).intValue()) {
         case 23505:
           return "Error: El registro ya se encuentra en la base datos.";
         case 23502:
           return "Error: Se envía un parametro NULL a un campo que tiene una restricción NULL.";
         case 42703:
           return "Error: Existe una referencia a una columna que no esta definida en la base de datos.";
         }return "Error Desconocido: " + Integer.valueOf(object.getSQLState());
       }
 
       return "";
     }
     catch (Exception ex)
     {
       LOG.info("Error al ejecutar la clase DBHelper" + ex.getMessage());
       System.out.println("Error - Mensaje\t\t: " + ex.getMessage());
       System.out.println("Error - Causa\t\t: " + ex.getCause());
       System.out.println("Error - Descripcion\t: " + ex.getLocalizedMessage());
       return "Error Desconocido: " + ex;
     }
   }
   */
 }
