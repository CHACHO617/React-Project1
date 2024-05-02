import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import './Login.css'
import ModalUsuario from "./ModalUsuario";



//IMPLEMENNT MODAL REGISTER



export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [mostrarModal, setMostrarModal] = useState(false)


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

    }


    const handleLoginAdmin = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/admins/loginadmin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identificacionAdmin: username,
                contrasenaAdmin: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            const authToken = data.token;
            console.log("Token is:" + authToken);
            console.log("Login successful ADMIN!");
            navigate('/crud', { state: { authToken } }); 
        } else {
            console.log("Error in login!");
            setErrorMessage('Wrong email or password');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }


    };

    const redirectLoginCliente= () => {
        window.location.href = 'https://localhost:44491/';
    };

    //THIS IS THE THE KEYPOINT
    return (
        <body>
            <div className="login-admin">
                <h1 className="login">Login Admin</h1>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                <form onSubmit={handleLoginAdmin}>
                    <div className="input-title1">Usuario</div>
                    <input
                        className="input1"
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <div className="input-title1">Constraseña</div>
                    <input
                        className="input1"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <button type="submit" className="button">Iniciar sesión</button>
                </form>

                <button className="link-button1" onClick={redirectLoginCliente} >Soy Cliente</button>

                <ModalUsuario
                    mostrarModal={mostrarModal}

                    setMostrarmodal={setMostrarModal}
                    guardarUsuario={guardarUsuario}

                />

            </div>
        </body>
    )
}