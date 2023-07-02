package com.example.todoapp.repository;
import com.example.todoapp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    Todo findByText(String s);
    // You don't need to provide any additional methods here
}
