// ModalRecipe.jsx
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap";

const modeloRecipe = {
    recipeId: 0,
    recipeName: "",
    recipeIngredients: []
};

const ModalRecipe = ({ mostrarModal, setMostrarModal, guardarRecipe, editar, setEditar, editarRecipe }) => {
    const [recipe, setRecipe] = useState(modeloRecipe);

    const actualizarDato = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value,
        });
    };

    const enviarDatos = () => {
        if (recipe.recipeId === 0) {
            guardarRecipe(recipe);
        } else {
            editarRecipe(recipe);
        }
        setRecipe(modeloRecipe);
    };

    useEffect(() => {
        if (editar != null) {
            setRecipe(editar);
        } else {
            setRecipe(modeloRecipe);
        }
    }, [editar]);

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal);
        if (editar != null) {
            setEditar(null);
        }
    };

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {recipe.recipeId === 0 ? "Nueva Receta" : "Editar Receta"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre de Receta</Label>
                        <Input
                            name="recipeName"
                            onChange={actualizarDato}
                            value={recipe.recipeName}
                        />
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

export default ModalRecipe;
