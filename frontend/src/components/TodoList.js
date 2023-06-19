import React, { useEffect, useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/todos')
            .then(response => response.json())
            .then(data => setTodos(data));
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <h2>{todo.text}</h2>
                    <p>{todo.done ? 'Completed' : 'Incomplete'}</p>
                </div>
            ))}
        </div>
    );
}

export default TodoList;