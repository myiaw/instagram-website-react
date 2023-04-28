import {useState} from 'react';

function Register() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState([]);

    async function Register(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users", {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            window.location.href = "/login";
        } else {
            setUsername("");
            setPassword("");
            setEmail("");
            setError("Registration failed");
        }
    }

    return (
        <div className="container mt-5">
            <h1>Register</h1>
            <form onSubmit={Register}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" name="email" placeholder="Email"
                           value={email} onChange={(e) => (setEmail(e.target.value))}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" placeholder="Username"
                           value={username} onChange={(e) => (setUsername(e.target.value))}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password"
                           value={password} onChange={(e) => (setPassword(e.target.value))}/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <label>{error}</label>
            </form>
        </div>
    );
}

export default Register;
