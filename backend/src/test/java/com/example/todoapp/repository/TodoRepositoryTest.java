package com.example.todoapp.repository;

import com.example.todoapp.model.Todo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

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
