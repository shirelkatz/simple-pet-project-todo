import React, { useState } from 'react';

function CreateTodo({ onTodoCreated }) {
    const [text, setText] = useState('');
    const [done, setDone] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, done }),
        })
            .then(response => response.json())
            .then(data => {
                setText('');
                setDone(false);
                onTodoCreated(data); // Notify parent component about the new todo
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Text:
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
            </label>
            <label>
                Done:
                <input type="checkbox" checked={done} onChange={e => setDone(e.target.checked)} />
            </label>
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default CreateTodo;
