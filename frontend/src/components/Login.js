import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../userContext';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            userContext.setUserContext(data);
            navigate("/");
        } else {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" value={username}
                           onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
            {error && <p className="mt-3 text-danger">{error}</p>}
        </div>
    );
}

export default Login;
