import React, { useState } from 'react';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        if (id === "username") {
            setUsername(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        if (!username | !password) {
            alert('Invalid input')
        } else {
            const existingUser = {
                "username": username,
                "password": password
            };
            console.log(existingUser);
            const encodedUserCredentials = window.btoa(existingUser.username + ":" + existingUser.password);
            const requestOptions = {
                method: "POST",
                headers: {
                    'Authorization' : 'Basic ' + encodedUserCredentials
                }
            };
            loginUser(requestOptions);
        }
    };


    const loginUser = (requestOptions) => {
        fetch(
            'http://localhost:8080/authentication/login', // make sure port number matches backend port
            requestOptions
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.text();
            })
            .then((token) => {
                console.log(token);
                localStorage.setItem('token', token);
                alert(`Successfully loggin in. Welcome, ${username}`);
            })
            .catch((error) => {
                console.log(error);
                alert('Login failed. please check your username and password');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form">
                <div className="form-body">
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">User Name </label>
                        <input className="form_input" type="text" onChange={(e) => handleInputChange(e)} id="username" placeholder="UserName" />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password"> Password </label>
                        <input className="form_input" type="password" id="password" onChange={(e) => handleInputChange(e)} placeholder="Password" />
                    </div>
                </div>
                <button type="submit" className="btn submit-btn">Login</button>
            </div>
        </form>
    );
}

export default LoginForm;