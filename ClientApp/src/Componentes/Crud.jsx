import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import { useLocation } from 'react-router-dom';
import ModalUsuario from "./ModalUsuario";
import TablaUsuario from "./TablaUsuario";
import { useNavigate } from 'react-router-dom';




const App = () => {

    /*CRUD USUARIOS*/
    const [usuarios, setUsuarios] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)
    const location = useLocation();
    //const authToken = location.state?.authToken;
    const navigate = useNavigate();

    const authToken = localStorage.getItem('authToken');


    console.log("AuthTKN: "+authToken)

    const mostrarUsuarios = async () => {
        try {
            //let token = authToken; // Replace with your actual token

            const response = await fetch("api/usuarios/Lista", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Add the token with "Bearer" prefix
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
                console.log("Todo está bien");
            } else {
                console.log("Error en la lista");
                //navigate('/');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {

        mostrarUsuarios()
    }, [])

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
            mostrarUsuarios();
        }
        else {
            const errorMessage = await response.text();
            alert(errorMessage)
        }

    }

    const editarUsuario = async (usuario) => {

        

        const response = await fetch("api/usuarios/Editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${authToken}` // Add the token with "Bearer" prefix

            },
            body: JSON.stringify(usuario)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarUsuarios();

        }
        else {
            const errorMessage = await response.text();
            alert(errorMessage)
        }

    }


    const eliminarUsuario = async (id) => {
        var respuesta = window.confirm("¿Estás seguro que deseas eliminar el usuario seleccionado?");
        if (!respuesta) {
            return;
        }
        const response = await fetch("api/usuarios/Eliminar/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}` // Add the token with "Bearer" prefix
            }

        });
        if (response.ok) {
            setMostrarModal(false);
            mostrarUsuarios();
        }
    }

    const redirectInventario1 = () => {
        window.location.href = 'https://localhost:44491/crudinventario1';

    };
    const redirectInventario2 = () => {
        window.location.href = 'https://localhost:44491/crudinventario2';
    };

    const redirectRecetas = () => {
        window.location.href = 'https://localhost:44491/crudingredientes';
    };

    const redirectOrdenes = () => {
        window.location.href = 'https://localhost:44491/crudorders';
    };

    const cerrarSesion = () => {
        window.location.href = 'https://localhost:44491/loginadmin';
    };


    return (
        <div>
            <div className="d-flex justify-content-between mt-3" style={{ padding: "0 8%" }}>
                <div>
                    <Button color="primary" style={{ marginRight: "10px" }} onClick={redirectInventario1}>Inventario 1</Button>
                    <Button color="primary" style={{ marginRight: "10px" }} onClick={redirectInventario2}>Inventario 2</Button>
                    <Button color="primary" style={{ marginRight: "10px" }} onClick={redirectRecetas}>Recetas</Button>
                    <Button color="primary" onClick={redirectOrdenes}>Ordenes</Button>
                </div>
                <Button color="secondary" onClick={cerrarSesion}>Cerrar Sesión</Button>
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
        </div>
       
    );
};

export default App;


/*import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import { useLocation, Navigate } from 'react-router-dom';
import ModalUsuario from "./ModalUsuario";
import TablaUsuario from "./TablaUsuario";

const App = ({ authToken }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);
    const location = useLocation();

    // If authToken doesn't exist, redirect to login
    useEffect(() => {
        if (!authToken) {
            console.log("No esta autenticado")
            //return <Navigate to="/login" />;
        }
    }, [authToken]);

    const mostrarUsuarios = async () => {
        try {
            let token = authToken;

            const response = await fetch("api/usuarios/Lista", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
                console.log("Todo está bien");
            } else {
                console.log("Error en la lista");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        mostrarUsuarios();
    }, []);

    const guardarUsuario = async (usuario) => {
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
        }
    };

    const editarUsuario = async (usuario) => {
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
        }
    };

    const eliminarUsuario = async (id) => {
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
        }
    };

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
