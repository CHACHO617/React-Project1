// Recipe.jsx
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import TablaRecipe from "./TablaRecipe";
import ModalRecipe from "./ModalRecipe";

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);
    const navigate = useNavigate();

    const authToken = localStorage.getItem('authToken');

    const mostrarRecipes = async () => {
        try {
            const response = await fetch("/api/recipe/GetRecipes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setRecipes(data);
            } else {
                console.log("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        mostrarRecipes();
    }, []);

    const guardarRecipe = async (recipe) => {
        const response = await fetch("/api/recipe/PostRecipe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(recipe)
        });

        if (response.ok) {
            setMostrarModal(false);
            mostrarRecipes();
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    };

    const editarRecipe = async (recipe) => {
        const response = await fetch("/api/recipe/PutRecipe", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(recipe)
        });

        if (response.ok) {
            setMostrarModal(false);
            mostrarRecipes();
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    };

    const eliminarRecipe = async (id) => {
        if (!window.confirm("¿Estás seguro que deseas eliminar la receta seleccionada?")) {
            return;
        }
        const response = await fetch(`/api/recipe/DeleteRecipe/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        });
        if (response.ok) {
            mostrarRecipes();
        }
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Recetas</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(true)}>
                                Nueva Receta
                            </Button>
                            <hr />
                            <TablaRecipe
                                data={recipes}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarRecipe={eliminarRecipe}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalRecipe
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarRecipe={guardarRecipe}
                editar={editar}
                setEditar={setEditar}
                editarRecipe={editarRecipe}
            />
        </Container>
    );
};

export default Recipe;
