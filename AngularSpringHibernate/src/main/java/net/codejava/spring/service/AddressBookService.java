package net.codejava.spring.service;

import java.util.List;

import net.codejava.spring.model.AddressBook;

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
