import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Home from "./components/Home";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";


function App() {
    const [calendarEvents, setCalendarEvents] = useState([]);

    const handleDateSelect = (arg) => {
        const title = prompt("Enter event title:");
        if (title) {
            const date = arg.start;
            const newEvent = {
                id: uuidv4(),
                title: title,
                date: date
            };
            setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
        }
    };


    const handleEventDelete = (eventId) => {
        setCalendarEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventId)
        );
    };

    const renderEventContent = (eventInfo) => {
        return (
            <div>
                <p>{eventInfo.event.title}</p>
                <button onClick={() => handleEventDelete(eventInfo.event.id)}>
                    Delete
                </button>
            </div>
        );
    };

    const handleEventClick = (arg) => {
        // Handle event click if needed
    };



    return (
        <Router>
            <div>
                <h1>Todo App</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/add">Add Todo</Link>
                        </li>
                        <li>
                            <Link to="/list">Todo List</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/add" element={<AddTodo />} />
                    <Route path="/list" element={<TodoList />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />}></Route>
                    <Route path="/register" element={<RegistrationForm />}></Route>
                </Routes>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    select={handleDateSelect}
                    events={calendarEvents}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                />
            </div>
        </Router>
    );
}

export default App;
