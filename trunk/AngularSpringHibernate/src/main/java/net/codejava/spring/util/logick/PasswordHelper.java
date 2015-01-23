 package net.codejava.spring.util.logick;
 
 import java.util.regex.Matcher;
 import java.util.regex.Pattern;
 
 public class PasswordHelper
 {
   public static String NUMEROS = "0123456789";
   public static String MAYUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   public static String MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
 
   static String random(String key, int length)
   {
     String pswd = "";
     for (int i = 0; i < length; i++)
       pswd = pswd + key.charAt((int)(Math.random() * key.length()));
     return pswd;
   }
 
   public static boolean validateRange(String contrasena, Long max, Long min)
   {
     if ((max == null) && (min != null) && (contrasena.length() >= min.longValue())) return true;
     if ((max != null) && (min == null) && (contrasena.length() <= max.longValue())) return true;
     if ((max != null) && (min != null) && (contrasena.length() <= max.longValue()) && (contrasena.length() >= min.longValue())) return true;
     return false;
   }
 
   public static String getAleatorio(int tamano)
   {
     return random(NUMEROS + MAYUSCULAS + MINUSCULAS, tamano);
   }
 
   public static boolean evaluatePassword(String contrasena, int nivel, int max, int min)
   {
     Pattern p = Pattern.compile("[A-Za-z 0-9]");
     if ((max == 0) && (min != 0))
     {
       if (nivel == 1) p = Pattern.compile("^([0-9])(?=\\S+$).{" + min + ",}$");
       if (nivel == 2) p = Pattern.compile("^(?=.*[0-9])([a-zA-Z])(?=\\S+$).{" + min + ",}$");
       if (nivel == 3) p = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{" + min + ",}$");
       if (nivel == 4) p = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{" + min + ",}$");
     }
     if ((max != 0) && (min == 0))
     {
       if (nivel == 1) p = Pattern.compile("^([0-9])(?=\\S+$).{," + max + "}$");
       if (nivel == 2) p = Pattern.compile("^(?=.*[0-9])([a-zA-Z])(?=\\S+$).{," + max + "}$");
       if (nivel == 3) p = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{," + max + "}$");
       if (nivel == 4) p = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{," + max + "}$");
     }
     if ((max != 0) && (min != 0) && (max > min))
     {
       if (nivel == 1) p = Pattern.compile("^([0-9])(?=\\S+$).{" + min + "," + max + "}$");
       if (nivel == 2) p = Pattern.compile("^(?=.*[0-9])([a-zA-Z])(?=\\S+$).{" + min + "," + max + "}$");
       if (nivel == 3) p = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{" + min + "," + max + "}$");
       if (nivel == 4) p = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{" + min + "," + max + "}$");
     }
     Matcher m = p.matcher(contrasena);
     if (!m.matches()) return false;
     return true;
   }
 }

