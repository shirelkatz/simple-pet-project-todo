package com.example.todoapp.repository;

import com.example.todoapp.model.Todo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

    @Test
    public void testFindByText() {
        // create some todos and save them to the repository
        Todo todo1 = new Todo();
        todo1.setText("Todo 1");
        todoRepository.save(todo1);

        Todo todo2 = new Todo();
        todo2.setText("Todo 2");
        todoRepository.save(todo2);

        // Test the dynamic repository method
        Todo foundTodo = todoRepository.findByText("Todo 1");

        // Assert that the found todo matches the expected value
        assertEquals("Todo 1", foundTodo.getText());
    }

    // perform the repository method invocation



    @BeforeEach
    public void setUp() {
        todoRepository.save(new Todo());
    }

    @Test
    public void findAll_shouldReturnTodos() {
        List<Todo> todos = todoRepository.findAll();
        assertEquals(1, todos.size());
    }
    


}
