import React from 'react';
import { Table, Button } from "reactstrap";

const TablaRecipeIngredient = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarRecipeIngredient }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Id Receta</th>
                    <th>Id Ingrediente</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((recipeIngredient) => (
                    <tr key={`${recipeIngredient.recipeId}-${recipeIngredient.ingredientId}`}>
                        <td>{recipeIngredient.recipeId}</td>
                        <td>{recipeIngredient.ingredientId}</td>
                        <td>{recipeIngredient.cantidadItem}</td>
                        
                        <td>
                            <Button
                                size="sm"
                                color="warning"
                                onClick={() => {
                                    setEditar(recipeIngredient);
                                    setMostrarModal(!mostrarModal);
                                }}
                            >
                                Editar
                            </Button>
                            {' '}
                            <Button
                                size="sm"
                                color="danger"
                                onClick={() => eliminarRecipeIngredient(recipeIngredient.recipeId, recipeIngredient.ingredientId)}
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

export default TablaRecipeIngredient;
