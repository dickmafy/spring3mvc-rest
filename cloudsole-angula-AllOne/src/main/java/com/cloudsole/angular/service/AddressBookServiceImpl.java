package com.cloudsole.angular.service;

import com.cloudsole.angular.model.AddressBook;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tmichels on 8/3/14.
 */
@Service
public class AddressBookServiceImpl implements AddressBookService {

    List<AddressBook> addressBooks = new ArrayList<AddressBook>();
    private static Long id = 0L;

    public List<AddressBook> viewAllAddressBook() {
        return addressBooks;
    }

    public void createAddressBook(AddressBook addressBook) {
        addressBook.setId(id);
        addressBooks.add(addressBook);
        ++id;
    }

    public void updateAddressBook(int pos, AddressBook updateAddressBook) {
        addressBooks.set(pos, updateAddressBook);
    }

    public void deleteAddressBook(int id) {
        addressBooks.remove(id);
    }

    public void deleteAllAddressBook() {
        addressBooks.clear();
        id = 0L;
    }

    public AddressBook findAddressBook(int id) {
        return addressBooks.get(id);
    }
}
