import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h1>Hi!</h1>
            <h2>Welcome back, dear..</h2>
            <input
                type="text"
                placeholder="Dings, äh, sag doch eben Deinen Namen.."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="..und Passwort."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>3, 2, 1..</button>
        </div>
        );
    }