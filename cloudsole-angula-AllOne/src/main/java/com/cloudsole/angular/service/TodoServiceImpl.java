package com.cloudsole.angular.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tmichels on 8/1/14.
 */

@Service
public class TodoServiceImpl implements TodoService {

	List<String> todos = new ArrayList<String>();

	public List<String> allTodos() {
		return todos;
	}

	public void addTodo(String todo) {
		todos.add(todo);
	}

	public void deleteTodo(String todo) {
		if (todos.contains(todo)) {
			todos.remove(todo);
		}
	}

	public void deleteAll() {
		todos.clear();
	}

	public void updateTodo(int position, String todo) {
		todos.set(position, todo);
	}
}
