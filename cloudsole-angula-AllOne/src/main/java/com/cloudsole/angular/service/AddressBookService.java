package com.cloudsole.angular.service;

import com.cloudsole.angular.model.AddressBook;

import java.util.List;

/**
 * Created by tmichels on 8/3/14.
 */
public interface AddressBookService {
     List<AddressBook> viewAllAddressBook();
     void createAddressBook(AddressBook addressBook);
     void updateAddressBook(int pos, AddressBook updateAddressBook);
     void deleteAddressBook(int id);
     void deleteAllAddressBook();
     AddressBook findAddressBook(int id);
}
