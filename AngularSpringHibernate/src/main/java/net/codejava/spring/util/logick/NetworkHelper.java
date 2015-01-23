package net.codejava.spring.util.logick;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;

public class NetworkHelper
{
  public static String getHost()
  {
    try
    {
      InetAddress address = InetAddress.getLocalHost();
      address = InetAddress.getLocalHost();
      String hostName = address.getHostName();
      return hostName.substring(hostName.indexOf("/") + 1);
    }
    catch (UnknownHostException e) {
      e.printStackTrace();
    }return null;
  }

  public static String getIpLocal()
  {
    try
    {
      InetAddress address = InetAddress.getLocalHost();
      address = InetAddress.getLocalHost();
      String ip = address.getHostAddress();
      return ip.substring(ip.indexOf("/") + 1);
    }
    catch (UnknownHostException e) {
      e.printStackTrace();
    }return null;
  }

  public static String getIpPublica()
  {
    String ip = null;
    try
    {
      URL tempURL = new URL("http://checkip.dyndns.com/");
      HttpURLConnection tempConn = (HttpURLConnection)tempURL.openConnection();
      InputStream tempInStream = tempConn.getInputStream();
      InputStreamReader tempIsr = new InputStreamReader(tempInStream);
      BufferedReader tempBr = new BufferedReader(tempIsr);
      ip = tempBr.readLine();
      ip = ip.replace("<html><head><title>Current IP Check</title></head><body>Current IP Address: ", "");
      ip = ip.replace("</body></html>", "");
      tempBr.close();
      tempInStream.close();
      tempURL = null;
      tempConn = null;
      tempInStream = null;
      tempIsr = null;
      tempBr = null;
    }
    catch (Exception ex) {
      ip = "Unknown";
    }return ip;
  }
}

