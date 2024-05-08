import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './LoginCliente.css'
import ModalUsuario from "C://Users//emeri//source//repos//React-Project1//ClientApp//src//Componentes//ModalUsuario";



//IMPLEMENNT MODAL REGISTER



export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [mostrarModal, setMostrarModal] = useState(false)

    // Reset authToken when the component mounts
    useEffect(() => {
        localStorage.removeItem('authToken');
    }, []);


    const guardarUsuario = async (usuario) => {

        const response = await fetch("api/usuarios/Guardar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(usuario)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            console.log("OK!!");
        }
        else {
            const errorMessage = await response.text();
            alert(errorMessage)
        }

    }


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
            localStorage.setItem('authToken', authToken);
            console.log("Login successful!");
            navigate('/newpage', { state: { authToken } });


        } else {
            console.log("Error in login!");
            setErrorMessage('Wrong email or password');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }


    };

    
    const redirectLoginAdmin = () => {
            window.location.href = 'https://localhost:44491/loginadmin';
    };

    



        //THIS IS THE THE KEYPOINT
        return (
            <body>
                <div className="login-cliente">
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

                    <button className="button-secondary" onClick={() => setMostrarModal(!mostrarModal)} >Registrarse</button>
                    <button className="link-button" onClick={redirectLoginAdmin}>Soy Administrador</button>

                    <ModalUsuario
                        mostrarModal={mostrarModal}

                        setMostrarmodal={setMostrarModal}
                        guardarUsuario={guardarUsuario}

                    />

                </div>
            </body>
        )
    }