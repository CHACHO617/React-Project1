import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import ModalUsuario from "./Componentes/ModalUsuario";
import TablaUsuario from "./Componentes/TablaUsuario";

import { Routes, Route } from 'react-router-dom';
import Crud from "./Componentes/Crud";
import Login from "./Componentes/Login";
import LoginCliente from "./Componentes/LoginCliente"
import Inventario1 from "./Componentes/Inventario1";
import Inventario2 from "./Componentes/Inventario2";
import PrepareBurgerForm from "./Componentes/PrepareBurgerForm";

const App = () => {

    return (      

     <div className="App">
          <Routes>
            <Route path="/crud" element={<Crud />} />
            <Route index element={<LoginCliente />} />
            <Route path="/loginadmin" element={<Login />} />
            <Route path="/crudinventario1" element={<Inventario1 />} />
            <Route path="/crudinventario2" element={<Inventario2 />} />
                <Route path="/newpage" element={<PrepareBurgerForm/>} />
        </Routes>
    </div>

    );
};



export default App;




/*ESTO ES LO QUE COMENTE  */
/**
 * 
 * 
    return (
        <>
         <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Usuarios</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>
                                Nuevo Usuario
                            </Button>
                            <hr />
                            <TablaUsuario data={usuarios}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarmodal={setMostrarModal}

                                eliminarUsuario={eliminarUsuario }
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <ModalUsuario
                mostrarModal={mostrarModal}

                setMostrarmodal={setMostrarModal}
                guardarUsuario={guardarUsuario}

                editar={editar}
                setEditar={setEditar}
                editarUsuario={editarUsuario}
                />


            </Container>
        </>

    );
 */



/*import React, { useState } from "react";


const App = () => {
    console.log("App")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const navigate = useNavigate();
    
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
            //setAuthToken(authToken);
            console.log("Login successful!");
            // Redirect to CRUD page or perform any other action upon successful login
        } else {
            console.log("Error in login!");

        }

    };



    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default App; */

/*
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import ModalUsuario from "./Componentes/ModalUsuario";
import TablaUsuario from "./Componentes/TablaUsuario";

const App = () => {

    const [usuarios, setUsuarios] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)

    const mostrarUsuarios = async () => {
        try {
            const response = await fetch("api/usuarios/Lista");
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
            } else {
                console.log("Error fetching user list");
            }
        } catch (error) {
            console.error("Error occurred while fetching user list:", error);
        }
    }

    useEffect(() => {
        mostrarUsuarios();
    }, [])

    const login = async (usuario) => {
        try {
            const response = await fetch("api/usuarios/Login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.Token); // Store the token in localStorage
                // Redirect or perform any action after successful login
                console.log("Login successful");
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
        }
    }

    const guardarUsuario = async (usuario) => {
        try {
            const response = await fetch("api/usuarios/Guardar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                setMostrarModal(!mostrarModal);
                mostrarUsuarios();
            } else {
                console.log("Error saving user");
            }
        } catch (error) {
            console.error("Error occurred while saving user:", error);
        }
    }

    const editarUsuario = async (usuario) => {
        try {
            const response = await fetch("api/usuarios/Editar", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                setMostrarModal(!mostrarModal);
                mostrarUsuarios();
            } else {
                console.log("Error editing user");
            }
        } catch (error) {
            console.error("Error occurred while editing user:", error);
        }
    }

    const eliminarUsuario = async (id) => {
        try {
            var respuesta = window.confirm("¿Estás seguro que deseas eliminar el usuario seleccionado?");
            if (!respuesta) {
                return;
            }
            const response = await fetch("api/usuarios/Eliminar/" + id, {
                method: 'DELETE'
            });
            if (response.ok) {
                setMostrarModal(false);
                mostrarUsuarios();
            } else {
                console.log("Error deleting user");
            }
        } catch (error) {
            console.error("Error occurred while deleting user:", error);
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Usuarios</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>
                                Nuevo Usuario
                            </Button>
                            <hr />
                            <TablaUsuario
                                data={usuarios}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarmodal={setMostrarModal}
                                eliminarUsuario={eliminarUsuario}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <ModalUsuario
                mostrarModal={mostrarModal}
                setMostrarmodal={setMostrarModal}
                guardarUsuario={guardarUsuario}
                editar={editar}
                setEditar={setEditar}
                editarUsuario={editarUsuario}
            />

        </Container>
    );
};

export default App;*/
