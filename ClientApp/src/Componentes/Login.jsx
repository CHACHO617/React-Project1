import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import './Login.css'


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();




    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/usuarios/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correoUsuario: username,
                contrasenaUsuario: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            const authToken = data.token;
            console.log("Token is:" + authToken);
            console.log("Login successful!");
            navigate('/crud', { state: { authToken } }); 
        } else {
            console.log("Error in login!");
            setErrorMessage('Wrong email or password');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            //here i want to show a message that says "Wrong email or password"
        }


    };

    //THIS IS THE THE KEYPOINT
    return (
        <body>
            <div className="div">
                <h1 className="login">Login</h1>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                <form onSubmit={handleLogin}>
                    <div className="input-title">Usuario</div>
                    <input
                        className="input"
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <div className="input-title">Constraseña</div>
                    <input
                        className="input"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <button type="submit" className="button">Iniciar sesión</button>
                </form>

            </div>
        </body>
    )
}