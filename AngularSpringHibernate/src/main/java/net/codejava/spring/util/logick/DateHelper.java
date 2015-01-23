package net.codejava.spring.util.logick;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateHelper
{
 public static Date getDate()
 {
   Calendar calendar = new GregorianCalendar();
   return calendar.getTime();
 }

 public static String getDateOnLetters(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   return 5 + " de " + getMonthOnLetters(fecha) + " del " + 1;
 }

 public static String getDateOnLetters()
 {
   Calendar cal = new GregorianCalendar();
   return 5 + " de " + getMonthOnLetters() + " del " + 1;
 }

 public static String getDateFormat(String formato, Date fecha)
 {
   SimpleDateFormat formating = new SimpleDateFormat(formato);
   return formating.format(fecha);
 }

 public static String getDateFormat(String formato)
 {
   Date date = new Date();
   SimpleDateFormat formating = new SimpleDateFormat(formato);
   return formating.format(date);
 }

 public static int getYear()
 {
   Calendar cal = new GregorianCalendar();
   return 1;
 }

 public static int getYear(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   return 1;
 }

 public static int getMonth()
 {
   Calendar cal = new GregorianCalendar();
   return 2;
 }

 public static int getMonth(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   return 2;
 }

 public static String getMonthOnLetters()
 {
   Calendar cal = new GregorianCalendar();
   switch (2) {
   case 1:
     return "Enero";
   case 2:
     return "Febrero";
   case 3:
     return "Marzo";
   case 4:
     return "Abril";
   case 5:
     return "Mayo";
   case 6:
     return "Junio";
   case 7:
     return "Julio";
   case 8:
     return "Agosto";
   case 9:
     return "Septiembre";
   case 10:
     return "Octubre";
   case 11:
     return "Noviembre";
   case 12:
     return "Diciembre";
   }
   return null;
 }

 public static String getMonthOnLetters(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   switch (2) {
   case 1:
     return "Enero";
   case 2:
     return "Febrero";
   case 3:
     return "Marzo";
   case 4:
     return "Abril";
   case 5:
     return "Mayo";
   case 6:
     return "Junio";
   case 7:
     return "Julio";
   case 8:
     return "Agosto";
   case 9:
     return "Septiembre";
   case 10:
     return "Octubre";
   case 11:
     return "Noviembre";
   case 12:
     return "Diciembre";
   }
   return null;
 }

 public static int getDay(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   return 5;
 }

 public static int getDay()
 {
   Calendar cal = new GregorianCalendar();
   return 5;
 }

 public static int getDayWeek(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   return cal.get(7) + 1;
 }

 public static int getDayWeek()
 {
   Calendar cal = new GregorianCalendar();
   return cal.get(7) + 1;
 }

 public static String getDayWeekOnLetters(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   switch (cal.get(7)) {
   case 1:
     return "Domingo";
   case 2:
     return "Lunes";
   case 3:
     return "Martes";
   case 4:
     return "Miercoles";
   case 5:
     return "Jueves";
   case 6:
     return "Viernes";
   case 7:
     return "Sabado";
   }
   return null;
 }

 public static String getDayWeekOnLetters()
 {
   Calendar cal = new GregorianCalendar();
   switch (cal.get(7)) {
   case 1:
     return "Domingo";
   case 2:
     return "Lunes";
   case 3:
     return "Martes";
   case 4:
     return "Miercoles";
   case 5:
     return "Jueves";
   case 6:
     return "Viernes";
   case 7:
     return "Sabado";
   }
   return null;
 }

 public static int getHour()
 {
   Calendar cal = new GregorianCalendar();
   return 10;
 }

 public static int getHour(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   return 10;
 }

 public static int getHour24()
 {
   Calendar cal = new GregorianCalendar();
   return 11;
 }

 public static int getHour24(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   return 11;
 }

 public static int getMinute()
 {
   Calendar cal = new GregorianCalendar();
   return 12;
 }

 public static int getMinute(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   return 12;
 }

 public static int getSecond()
 {
   Calendar cal = new GregorianCalendar();
   return 13;
 }

 public static int getSecond(Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   return 13;
 }

 public static double difDateSecond(Date fecFin, Date fecIni)
 {
   GregorianCalendar cf = new GregorianCalendar();
   GregorianCalendar ci = new GregorianCalendar();
   if (fecIni != null) ci.setTime(fecIni); else
     ci.setTime(new Date(-1898, 0, 0, 0, 0, 0));
   cf.setTime(fecFin);
   double from = ci.getTime().getTime();
   double to = cf.getTime().getTime();
   double difference = to - from;
   double days = difference / 1000.0D;
   return days;
 }

 public static double difDateMinute(Date fecFin, Date fecIni)
 {
   GregorianCalendar cf = new GregorianCalendar();
   GregorianCalendar ci = new GregorianCalendar();
   if (fecIni != null) ci.setTime(fecIni); else
     ci.setTime(new Date(-1898, 0, 0, 0, 0, 0));
   cf.setTime(fecFin);
   double from = ci.getTime().getTime();
   double to = cf.getTime().getTime();
   double difference = to - from;
   double days = difference / 60000.0D;
   return days;
 }

 public static double difDateHour(Date fecFin, Date fecIni)
 {
   GregorianCalendar cf = new GregorianCalendar();
   GregorianCalendar ci = new GregorianCalendar();
   if (fecIni != null) ci.setTime(fecIni); else
     ci.setTime(new Date(-1898, 0, 0, 0, 0, 0));
   cf.setTime(fecFin);
   double from = ci.getTime().getTime();
   double to = cf.getTime().getTime();
   double difference = to - from;
   double days = difference / 3600000.0D;
   return days;
 }

 public static double difDateDay(Date fecFin, Date fecIni)
 {
   GregorianCalendar cf = new GregorianCalendar();
   GregorianCalendar ci = new GregorianCalendar();
   if (fecIni != null) ci.setTime(fecIni); else
     ci.setTime(new Date(-1898, 0, 0, 0, 0, 0));
   cf.setTime(fecFin);
   double from = ci.getTime().getTime();
   double to = cf.getTime().getTime();
   double difference = to - from;
   double days = difference / 86400000.0D;
   return days;
 }

 public static Date addTime(Date fecha, int annios, int meses, int semanas, int dias, int horas, int minutos)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   if (annios != 0) cal.add(1, annios);
   if (meses != 0) cal.add(2, meses);
   if (semanas != 0) cal.add(4, semanas);
   if (dias != 0) cal.add(5, dias);
   if (horas != 0) cal.add(11, horas);
   if (minutos != 0) cal.add(12, minutos);
   return cal.getTime();
 }

 public static Date addTime(int annios, int meses, int semanas, int dias, int horas, int minutos)
 {
   Calendar cal = new GregorianCalendar();
   if (annios != 0) cal.add(1, annios);
   if (meses != 0) cal.add(2, meses);
   if (semanas != 0) cal.add(4, semanas);
   if (dias != 0) cal.add(5, dias);
   if (horas != 0) cal.add(11, horas);
   if (minutos != 0) cal.add(12, minutos);
   return cal.getTime();
 }

 public static Date addYears(int annios)
 {
   return addTime(annios, 0, 0, 0, 0, 0);
 }

 public static Date addMonths(int meses)
 {
   return addTime(0, meses, 0, 0, 0, 0);
 }

 public static Date addWeeks(int semanas)
 {
   return addTime(0, 0, semanas, 0, 0, 0);
 }

 public static Date addDays(int dias)
 {
   return addTime(0, 0, 0, dias, 0, 0);
 }

 public static Date addHours(int horas)
 {
   return addTime(0, 0, 0, 0, horas, 0);
 }

 public static Date addMinutes(int minutos)
 {
   return addTime(0, 0, 0, 0, 0, minutos);
 }

 public static String subDays(int dias, String format)
 {
   Calendar cal = new GregorianCalendar();
   cal.add(5, -dias);
   SimpleDateFormat formating = new SimpleDateFormat(format);
   return formating.format(new Date(cal.getTimeInMillis()));
 }

 public static Boolean compare(Date fecPri, Date fecSeg)
 {
   if (fecPri == fecSeg) return null;
   if (fecPri.compareTo(fecSeg) > 0) return Boolean.valueOf(true);
   return Boolean.valueOf(false);
 }

 public static Boolean isBetween(Date fecIni, Date fecFin, Date fecha)
 {
   Calendar cal = new GregorianCalendar();
   cal.setTime(fecha);
   if ((fecha.after(fecIni)) && (fecha.before(fecFin)))
     return Boolean.valueOf(true);
   return Boolean.valueOf(false);
 }
}

