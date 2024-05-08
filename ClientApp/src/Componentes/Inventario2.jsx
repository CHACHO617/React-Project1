import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import { useLocation } from 'react-router-dom';
import ModalUsuario from "./ModalUsuario";
import { useNavigate } from 'react-router-dom';
import TablaInventario2 from "./TablaInventario2";
import ModalInventario2 from "./ModalInventario2";
//Faltan imports




const Inventario2 = () => {

    /*CRUD INVENTARIO 2*/
    const [inventario2, setInventario2] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)
    const location = useLocation();
    //const authToken = location.state?.authToken;
    const navigate = useNavigate();

    const authToken = localStorage.getItem('authToken');


    const mostrarInventario2 = async () => {
        try {
            const response = await fetch("api/inventariob/ListaInv2", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setInventario2(data);
                console.log("data retrieved");
            } else {
                console.log("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        mostrarInventario2();
    }, []);

    const guardarInventario2 = async (inventario2) => {

        const response = await fetch("api/inventariob/GuardarInv2", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${authToken}`,

            },
            body: JSON.stringify(inventario2)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarInventario2();
        }
        else {
            const errorMessage = await response.text();
            alert(errorMessage)
        }

    }

    const editarInventario2 = async (inventario2) => {

        const response = await fetch("api/inventariob/EditarInv2", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${authToken}` // Add the token with "Bearer" prefix

            },
            body: JSON.stringify(inventario2)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarInventario2();

        }
        else {
            const errorMessage = await response.text();
            alert(errorMessage)
        }

    }

    const eliminarInventario2 = async (id) => {
        var respuesta = window.confirm("¿Estás seguro que deseas eliminar el usuario seleccionado?");
        if (!respuesta) {
            return;
        }
        const response = await fetch("api/inventariob/EliminarInv2/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}` // Add the token with "Bearer" prefix
            }

        });
        if (response.ok) {
            setMostrarModal(false);
            mostrarInventario2();
        }
    }

    const redirectUsuarios = () => {
        window.location.href = 'https://localhost:44491/crud';
    };
    const redirectInventario1 = () => {
        window.location.href = 'https://localhost:44491/crudinventario1';
    };

    const cerrarSesion = () => {
        window.location.href = 'https://localhost:44491/loginadmin';
    };

    return (
        <div>
            <div className="d-flex justify-content-between mt-3" style={{ padding: "0 8%" }}>
                <div>
                    <Button color="primary" style={{ marginRight: "10px" }} onClick={redirectInventario1}>Inventario 1</Button>
                    <Button color="primary" onClick={redirectUsuarios}>Usuarios</Button>
                </div>
                <Button color="secondary" onClick={cerrarSesion}>Cerrar Sesión</Button>
            </div>

            <Container>
                <Row className="mt-5">
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Inventario 2</h5>
                            </CardHeader>
                            <CardBody>
                                <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>
                                    Nuevo Ingrediente
                                </Button>
                                <hr />
                                <TablaInventario2
                                    data={inventario2}
                                    setEditar={setEditar}
                                    mostrarModal={mostrarModal}
                                    setMostrarmodal={setMostrarModal}

                                    eliminarInventario2={eliminarInventario2}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <ModalInventario2
                    mostrarModal={mostrarModal}

                    setMostrarmodal={setMostrarModal}
                    guardarInventario2={guardarInventario2}

                    editar={editar}
                    setEditar={setEditar}
                    editarInventario2={editarInventario2}
                />

            </Container>
        </div>

    );
};

export default Inventario2;
