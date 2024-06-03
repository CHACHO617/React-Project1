// TablaIngredientes.js
import React from "react";
import { Table, Button } from "reactstrap";

const TablaIngredientes = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarIngrediente }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre Ingrediente</th>
                    <th>Unidad Ingrediente</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((ingrediente, index) => (
                    <tr key={ingrediente.ingredientId}>
                        <th scope="row">{index + 1}</th>
                        <td>{ingrediente.nombreIngrediente}</td>
                        <td>{ingrediente.unidadIngrediente}</td>
                        <td>
                            <Button
                                size="sm"
                                color="warning"
                                onClick={() => {
                                    setEditar(ingrediente);
                                    setMostrarModal(!mostrarModal);
                                }}
                            >
                                Editar
                            </Button>
                            {' '}
                            <Button
                                size="sm"
                                color="danger"
                                onClick={() => eliminarIngrediente(ingrediente.ingredientId)}
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

export default TablaIngredientes;
