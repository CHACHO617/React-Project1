// Ingredientes.js
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import TablaIngredientes from "./TablaIngredientes";
import ModalIngrediente from "./ModalIngrediente";

const Ingredientes = () => {
    const [ingredientes, setIngredientes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);
    const navigate = useNavigate();

    const authToken = localStorage.getItem('authToken');

    const mostrarIngredientes = async () => {
        try {
            const response = await fetch("/api/ingredient/GetIngredients", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setIngredientes(data);
            } else {
                console.log("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        mostrarIngredientes();
    }, []);

    const guardarIngrediente = async (ingrediente) => {
        const response = await fetch("/api/ingredient/PostIngredient", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(ingrediente)
        });

        if (response.ok) {
            setMostrarModal(false);
            mostrarIngredientes();
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    };

    const editarIngrediente = async (ingrediente) => {
        const response = await fetch("/api/ingredient/PutIngredient", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(ingrediente)
        });

        if (response.ok) {
            setMostrarModal(false);
            mostrarIngredientes();
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    };

    const eliminarIngrediente = async (id) => {
        if (!window.confirm("¿Estás seguro que deseas eliminar el ingrediente seleccionado?")) {
            return;
        }
        const response = await fetch(`/api/ingredient/DeleteIngredient/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        });
        if (response.ok) {
            mostrarIngredientes();
        }
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Ingredientes</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(true)}>
                                Nuevo Ingrediente
                            </Button>
                            <hr />
                            <TablaIngredientes
                                data={ingredientes}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarIngrediente={eliminarIngrediente}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalIngrediente
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarIngrediente={guardarIngrediente}
                editar={editar}
                setEditar={setEditar}
                editarIngrediente={editarIngrediente}
            />
        </Container>
    );
};

export default Ingredientes;
