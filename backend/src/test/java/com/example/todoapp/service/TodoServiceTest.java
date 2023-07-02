package com.example.todoapp.service;


import com.example.todoapp.model.Todo;
import com.example.todoapp.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Collections;
import java.util.List;
import static org.mockito.BDDMockito.given;
import static org.junit.jupiter.api.Assertions.assertEquals;



public class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getTodos_shouldReturnTodos() {
        // create a todo object with specific values
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setText("Get milk");
        todo.setCompleted(false);

        // use the todo object in the mock setup
        given(todoRepository.findAll()).willReturn(Collections.singletonList(todo));

        List<Todo> todos = todoService.getTodos();

        // test the count
        assertEquals(1, todos.size());

        // test the content
        Todo returnedTodo = todos.get(0);
        assertEquals(todo.getId(), returnedTodo.getId());
        assertEquals(todo.getText(), returnedTodo.getText());
        assertEquals(todo.getCompleted(), returnedTodo.getCompleted());
    }

}
