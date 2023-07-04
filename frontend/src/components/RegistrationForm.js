import React from "react";
import { useState } from "react";

function RegistrationForm() {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "username") {
            setUsername(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, email, password);
        if (!username || !email || !password) {
            alert("Invalid input");
        } else {
            const newUser = {
                "username": username,
                "email": email,
                "password": password
            };
            console.log(newUser);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            };
            registerUser(requestOptions);
        }
    };

    const registerUser = (requestOptions) => {
        fetch(
            'http://localhost:8080/authentication/register',
            requestOptions
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.status)
            } else {
                alert(`Successfully registered. Welcome, ${username}!`);
            }
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form">
                <div className="form-group">
                    <label className="form-label" htmlFor="username">User Name </label>
                    <input className="form_input" type="text" onChange={(e) => handleInputChange(e)} id="username" placeholder="UserName" />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email </label>
                    <input className="form_input" type="email" id="email" onChange={(e) => handleInputChange(e)} placeholder="Email" />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password"> Password </label>
                    <input className="form_input" type="password" id="password" onChange={(e) => handleInputChange(e)} placeholder="Password" />
                </div>

                <button type="submit" className="btn submit-btn">Register</button>
            </div>
        </form>
    );
}

export default RegistrationForm;
