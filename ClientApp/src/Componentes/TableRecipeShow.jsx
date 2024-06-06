// TablaRecipe.jsx
import React from 'react';
import { Table, Button } from "reactstrap";

const TablaRecipeShow = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarRecipe }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre de Receta</th>
                </tr>
            </thead>
            <tbody>
                {data.map((recipe) => (
                    <tr key={recipe.recipeId}>
                        <th scope="row">{recipe.recipeId}</th>
                        <td>{recipe.recipeName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TablaRecipeShow;
