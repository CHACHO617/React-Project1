// TablaRecipe.jsx
import React from 'react';
import { Table, Button } from "reactstrap";

const TablaRecipe = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarRecipe }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre de Receta</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((recipe) => (
                    <tr key={recipe.recipeId}>
                        <th scope="row">{recipe.recipeId}</th>
                        <td>{recipe.recipeName}</td>
                        <td>
                            <Button
                                size="sm"
                                color="warning"
                                onClick={() => {
                                    setEditar(recipe);
                                    setMostrarModal(!mostrarModal);
                                }}
                            >
                                Editar
                            </Button>
                            {' '}
                            <Button
                                size="sm"
                                color="danger"
                                onClick={() => eliminarRecipe(recipe.recipeId)}
                            >
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TablaRecipe;
