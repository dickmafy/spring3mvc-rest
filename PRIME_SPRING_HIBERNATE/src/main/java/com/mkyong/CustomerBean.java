package com.mkyong;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.mkyong.customer.bo.CustomerBo;
import com.mkyong.customer.model.Customer;

@SuppressWarnings("serial")
@ManagedBean(name="CustomerBean")
public class CustomerBean implements Serializable{
 
	//DI via Spring
	CustomerBo customerBo;
	public String name;
	public String address;
	public List<Customer> customerList;
	
	
	@PostConstruct
	public void init(){
		System.out.println("INIT");
		//System.out.println(customerBo.findAllCustomer().size()); 
	}
	
	public CustomerBean(){
		System.out.println("CONSTRUCTOR RUTA WEB-INF/applicationContext.xml ");
		
		ServletContext servletContext = (ServletContext) FacesContext.getCurrentInstance().getExternalContext().getContext();
		WebApplicationContext ctx =WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
		customerBo = (CustomerBo) ctx.getBean("customerBo");
		System.out.println(customerBo.findAllCustomer().size());
		setCustomerList(customerBo.findAllCustomer());
	}

	
	
	//add a new customer data into database
	public void addCustomer(){
		//System.out.println(customerBo.findAllCustomer().size()); 
		Customer cust = new Customer();
		cust.setName(getName());
		cust.setAddress(getAddress());
		customerBo.addCustomer(cust);
		clearForm();
		setCustomerList(customerBo.findAllCustomer());
	}
		
	
	//clear form values
	private void clearForm(){
		setName("");
		setAddress("");
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setCustomerBo(CustomerBo customerBo) {
		this.customerBo = customerBo;
	}



	public List<Customer> getCustomerList() {
		return customerList;
	}



	public void setCustomerList(List<Customer> customerList) {
		this.customerList = customerList;
	}

	public CustomerBo getCustomerBo() {
		return customerBo;
	}
	
	
}
