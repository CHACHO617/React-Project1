import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap";

const initialRecipeIngredient = {
    recipeId: 0,
    Recipe: null,
    ingredientId: 0,
    Ingredient: null,
    cantidadItem: 0
};

const ModalRecipeIngredient = ({ mostrarModal, setMostrarModal, guardarRecipeIngredient, editar, setEditar, editarRecipeIngredient }) => {
    const [recipeIngredient, setRecipeIngredient] = useState(initialRecipeIngredient);
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);

    const authToken = localStorage.getItem('authToken');

    const fetchRecipeData = async () => {
        try {
            const recipesResponse = await fetch("/api/recipe/GetRecipes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (recipesResponse.ok) {
                const data = await recipesResponse.json();
                setRecipes(data);
            } else {
                setError("Error fetching recipes data");
            }

            const ingredientsResponse = await fetch("/api/ingredient/GetIngredients", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (ingredientsResponse.ok) {
                const data = await ingredientsResponse.json();
                setIngredients(data);
            } else {
                setError("Error fetching ingredients data");
            }
        } catch (error) {
            setError("Error fetching data: " + error);
        }
    };

    const actualizarDato = (e) => {
        setRecipeIngredient({
            ...recipeIngredient,
            [e.target.name]: e.target.value,
        });
    };

    const enviarDatos = async () => {
        try {
            // Fetch Recipe by ID
            const recipeResponse = await fetch(`/api/recipe/GetRecipeId/${recipeIngredient.recipeId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (!recipeResponse.ok) {
                throw new Error("Failed to fetch Recipe");
            }
            const recipeData = await recipeResponse.json();

            // Fetch Ingredient by ID
            const ingredientResponse = await fetch(`/api/ingredient/GetIngredientId/${recipeIngredient.ingredientId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (!ingredientResponse.ok) {
                throw new Error("Failed to fetch Ingredient");
            }
            const ingredientData = await ingredientResponse.json();

            // Construct updatedRecipeIngredient object
            const updatedRecipeIngredient = {
                recipeId: recipeIngredient.recipeId, // Ensure you have the correct field here
                Recipe: recipeData,
                ingredientId: recipeIngredient.ingredientId, // Ensure you have the correct field here
                Ingredient: ingredientData,
                cantidadItem: recipeIngredient.cantidadItem
            };

            // Call backend API
            if (editar === null) {
                guardarRecipeIngredient(updatedRecipeIngredient);
            } else {
                editarRecipeIngredient(updatedRecipeIngredient);
            }
            setRecipeIngredient(initialRecipeIngredient);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error
        }
    };

    useEffect(() => {
        if (editar !== null) {
            setRecipeIngredient(editar);
        } else {
            setRecipeIngredient(initialRecipeIngredient);
        }
    }, [editar]);

    useEffect(() => {
        fetchRecipeData();
    }, []);

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal);
        if (editar !== null) {
            setEditar(null);
        }
    };

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {editar === null ? "Nuevo Ingrediente de Receta" : "Editar Ingrediente de Receta"}
            </ModalHeader>
            <ModalBody>
                {error && <p>{error}</p>}
                <Form>
                    <FormGroup>
                        <Label>Receta</Label>
                        <Input
                            type="select"
                            name="recipeId"
                            onChange={actualizarDato}
                            value={recipeIngredient.recipeId}
                            disabled={editar !== null} // Disable select when editing
                        >
                            <option value="0">Seleccione una receta</option>
                            {recipes.map((recipe) => (
                                <option key={recipe.recipeId} value={recipe.recipeId}>
                                    {recipe.recipeName}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Ingrediente</Label>
                        <Input
                            type="select"
                            name="ingredientId"
                            onChange={actualizarDato}
                            value={recipeIngredient.ingredientId}
                            disabled={editar !== null} // Disable select when editing
                        >
                            <option value="0">Seleccione un ingrediente</option>
                            {ingredients.map((ingredient) => (
                                <option key={ingredient.ingredientId} value={ingredient.ingredientId}>
                                    {ingredient.nombreIngrediente}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Cantidad</Label>
                        {editar === null ? (
                            <Input
                                type="number"
                                name="cantidadItem"
                                onChange={actualizarDato}
                                value={recipeIngredient.cantidadItem}
                            />
                        ) : (
                            <Input
                                type="number"
                                name="cantidadItem"
                                onChange={actualizarDato}
                                value={recipeIngredient.cantidadItem}
                                 // Make input readonly when editing
                            />
                        )}
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" size="sm" onClick={cerrarModal}>
                    Regresar
                </Button>
                <Button color="primary" size="sm" onClick={enviarDatos}>
                    Guardar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalRecipeIngredient;
