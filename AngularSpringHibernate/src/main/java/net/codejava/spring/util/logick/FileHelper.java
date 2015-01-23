 package net.codejava.spring.util.logick;
 
 import java.io.File;
 import java.io.FileInputStream;
 import java.io.FileOutputStream;
 import java.io.IOException;
 import java.io.PrintStream;
 import java.nio.channels.FileChannel;
 import java.text.SimpleDateFormat;
 import java.util.Date;
 import org.apache.log4j.Logger;
 
 public class FileHelper
 {
   protected static Logger log = Logger.getLogger(FileHelper.class);
 
   public static void deleteFile(String nameFile)
   {
     File file = new File(nameFile);
     if (file.exists())
     {
       if (file.canWrite())
       {
         if (file.delete()) log.debug("Se elimino el archivo: " + nameFile + " con exito"); else
           log.debug("No se puede eliminar el archivo: " + nameFile);
       }
       else
         log.debug("No se tienen permisos de escritura para el archivo: " + nameFile);
     }
   }
 
   public static boolean isExists(String nameFile)
   {
     File file = new File(nameFile);
     if (file == null) {
       return false;
     }
 
     if (!file.exists()) {
       return false;
     }
     return true;
   }
 
   public static boolean isReadOnly(String nameFile)
   {
     File file = new File(nameFile);
     return file.canWrite();
   }
 
   public static String getModifiedDate(String nameFile)
   {
     File file = new File(nameFile);
     if (file.exists())
     {
       long t = file.lastModified();
       Date d = new Date(t);
       SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
       return sdf.format(d);
     }
 
     System.out.println("File not found!");
     return "Not Found";
   }
 
   public static String getExtension(String nameFile)
   {
     File file = new File(nameFile);
     if (file.exists())
     {
       String fname = file.getName();
       return fname.substring(fname.lastIndexOf('.') + 1, fname.length());
     }
 
     System.out.println("File not found!");
     return "Not Found";
   }
 
   public static long getSize(String nameFile)
   {
     File file = new File(nameFile);
     if (file.exists()) {
       return file.length() / 1024L;
     }
     return 0L;
   }
 
   public static int countFiles(String nameFile)
   {
     File file = new File(nameFile);
     int count = 0;
     for (File archivo : file.listFiles())
     {
       if (archivo.isFile())
         count++;
     }
     return count;
   }
 
   public static void copyFile(File sourceFile, File targetFile)
     throws IOException
   {
     if (!targetFile.exists()) targetFile.createNewFile();
     FileChannel source = null;
     FileChannel destination = null;
     try {
       source = new FileInputStream(sourceFile).getChannel();
       destination = new FileOutputStream(targetFile).getChannel();
 
       long count = 0L;
       long size = source.size();
       while ((count += destination.transferFrom(source, count, size - count)) < size);
     } finally {
       if (source != null) source.close();
       if (destination != null) destination.close();
     }
   }
 }
