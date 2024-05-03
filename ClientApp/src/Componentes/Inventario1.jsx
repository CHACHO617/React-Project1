import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import { useLocation } from 'react-router-dom';
import ModalUsuario from "./ModalUsuario";
import { useNavigate } from 'react-router-dom';
import TablaInventario1 from "./TablaInventario1";
import ModalInventario1 from "./ModalInventario1";
 



const Inventario1 = () => {

    /*CRUD INVENTARIO 1*/
    const [inventario1, setInventario1] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)
    const location = useLocation();
    const authToken = location.state?.authToken;
    const navigate = useNavigate();

    const mostrarInventario1 = async () => {
        try {
            const response = await fetch("api/inventarioa/ListaInv1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setInventario1(data);
                console.log("data retrieved");
            } else {
                console.log("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        mostrarInventario1();
    }, []);

    const guardarInventario1 = async (inventario1) => {

        const response = await fetch("api/inventarioa/GuardarInv1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(inventario1)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarInventario1();
        }
        else {
            const errorMessage = await response.text();
            alert(errorMessage)
        }

    }

    const editarInventario1 = async (inventario1) => {

        const response = await fetch("api/inventarioa/EditarInv1", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${authToken}` // Add the token with "Bearer" prefix

            },
            body: JSON.stringify(inventario1)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarInventario1();

        }
        else {
            const errorMessage = await response.text();
            alert(errorMessage)
        }

    }

    const eliminarInventario1 = async (id) => {
        var respuesta = window.confirm("¿Estás seguro que deseas eliminar el usuario seleccionado?");
        if (!respuesta) {
            return;
        }
        const response = await fetch("api/inventarioa/EliminarInv1/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}` // Add the token with "Bearer" prefix
            }

        });
        if (response.ok) {
            setMostrarModal(false);
            mostrarInventario1();
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center mt-3">
                <Button color="primary" style={{ marginRight: "40px" }} onClick={() => console.log("Navigate to Inventario 1")}>Inventario 1</Button>
                <Button color="primary" onClick={() => console.log("Navigate to Inventario 2")}>Inventario 2</Button>
            </div>

            <Container>
                <Row className="mt-5">
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Inventario 1</h5>
                            </CardHeader>
                            <CardBody>
                                <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>
                                    Nuevo Ingrediente
                                </Button>
                                <hr />
                                <TablaInventario1
                                    data={inventario1}
                                    setEditar={setEditar}
                                    mostrarModal={mostrarModal}
                                    setMostrarmodal={setMostrarModal}

                                    eliminarInventario1={eliminarInventario1}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <ModalInventario1
                    mostrarModal={mostrarModal}

                    setMostrarmodal={setMostrarModal}
                    guardarInventario1={guardarInventario1}

                    editar={editar}
                    setEditar={setEditar}
                    editarInventario1={editarInventario1}
                />

            </Container>
        </div>

    );
};

export default Inventario1;
