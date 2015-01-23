 package net.codejava.spring.util.logick;
 
 public class StringHelper
 {
   public static int countWords(String cadena)
   {
     cadena = cadena + " ";
     int c = 0;
     for (int i = 0; i < cadena.length(); i++)
     {
       if (cadena.charAt(i) == ' ')
         c++;
     }
     cadena = null;
     return c;
   }
 
   public static String removeWord(String cadena, int n)
   {
     cadena = cadena + " ";
     String nuevaCadena = "";
     int c = 0;
     String palabra = "";
     for (int i = 0; i < cadena.length(); i++)
     {
       palabra = palabra + cadena.charAt(i);
       if (cadena.charAt(i) == ' ')
       {
         c++;
         if (c != n) nuevaCadena = nuevaCadena + palabra;
         palabra = "";
       }
     }
     cadena = null;
     return nuevaCadena.trim();
   }
 
   public static String reverseWords(String cadena)
   {
     cadena = cadena + " ";
     String palabra = "";
     String nuevaCadena = "";
     for (int i = 0; i < cadena.length(); i++)
     {
       palabra = cadena.charAt(i) + palabra;
       if (cadena.charAt(i) == ' ')
       {
         nuevaCadena = nuevaCadena + palabra;
         palabra = "";
       }
     }
     return nuevaCadena.trim();
   }
 
   public static String reverse(String cadena)
   {
     String invertida = "";
     for (int x = cadena.length() - 1; x >= 0; x--)
       invertida = invertida + cadena.charAt(x);
     return invertida;
   }
 
   public static int countCharacter(String cadena, String caracter)
   {
     int frecuencia = 0;
     for (int i = 0; i <= cadena.length() - 1; i++)
     {
       if (String.valueOf(cadena.charAt(i)).equals(caracter))
         frecuencia++;
     }
     return frecuencia;
   }
 
   public static String toTitle(String cadena)
   {
     String[] palabras = cadena.split(" ");
     String titulo = "";
     for (int i = 0; i < palabras.length; i++)
     {
       if ((!palabras[i].equals("de")) && (!palabras[i].equals("y")) && (!palabras[i].equals("por")) && (!palabras[i].equals("en")) && (!palabras[i].equals("con")) && (!palabras[i].equals("la")))
         titulo = titulo + palabras[i].substring(0, 1).toUpperCase() + palabras[i].substring(1).toLowerCase();
       else
         titulo = titulo + palabras[i];
     }
     palabras = null;
     return titulo;
   }
 
   public String removeSpaces(String linea)
   {
     String resultado = "";
     for (int i = 0; i < linea.length(); i++)
     {
       if (linea.charAt(i) != ' ')
         resultado = resultado + linea.charAt(i);
     }
     return resultado;
   }
 
   public static String fillZero(Long numero, Long longitud)
   {
     String resultado = numero.toString();
     for (int i = 0; i < longitud.longValue() - resultado.length(); i++)
       resultado = "0" + resultado;
     return resultado;
   }
 
   public static boolean containsItemOnString(String[] first, String[] second)
   {
     for (int i = 0; i < first.length; i++)
     {
       for (int j = 0; j < second.length; j++)
       {
         if (first[i].equals(second[j]))
           return true;
       }
     }
     return false;
   }
 }

