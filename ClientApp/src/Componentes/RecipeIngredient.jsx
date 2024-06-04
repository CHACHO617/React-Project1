import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import TablaRecipeIngredient from "./TablaRecipeIngredient";
import ModalRecipeIngredient from "./ModalRecipeIngredient";

const RecipeIngredient = () => {
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);

    const authToken = localStorage.getItem('authToken');

    const mostrarRecipeIngredients = async () => {
        try {
            const response = await fetch("/api/recipeingredient/GetRecipeIngredients", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setRecipeIngredients(data);
            } else {
                console.log("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        mostrarRecipeIngredients();
    }, []);

    const guardarRecipeIngredient = async (recipeIngredients) => {
        const response = await fetch("/api/recipeingredient/PostRecipeIngredient", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(recipeIngredients)
        });

        if (response.ok) {
            setMostrarModal(false);
            mostrarRecipeIngredients();
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    };

    const editarRecipeIngredient = async (recipeIngredient) => {
 
        const response = await fetch("/api/recipeingredient/PutRecipeIngredient", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(recipeIngredient)
        });

        if (response.ok) {
            setMostrarModal(false);
            mostrarRecipeIngredients();
        } else {
            const errorMessage = await response.text();
            alert("HOLAAA" + errorMessage);
        }
    };

    const eliminarRecipeIngredient = async (id) => {
        if (!window.confirm("¿Estás seguro que deseas eliminar el ingrediente de la receta seleccionada?")) {
            return;
        }
        const response = await fetch(`/api/recipeingredient/DeleteRecipeIngredients/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        });
        if (response.ok) {
            mostrarRecipeIngredients();
        }
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Ingredientes de Recetas</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(true)}>
                                Nuevo Ingrediente de Receta
                            </Button>
                            <hr />
                            <TablaRecipeIngredient
                                data={recipeIngredients}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarRecipeIngredient={eliminarRecipeIngredient}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalRecipeIngredient
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarRecipeIngredient={guardarRecipeIngredient}
                editar={editar}
                setEditar={setEditar}
                editarRecipeIngredient={editarRecipeIngredient}
            />
        </Container>
    );
};

export default RecipeIngredient;
