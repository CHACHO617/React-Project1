import React from 'react';
import { Table, Button } from 'reactstrap';

const TablaInventario2 = ({ data, setEditar, mostrarModal, setMostrarmodal, eliminarInventario2 }) => {
    const enviarDatos = (inventario2) => {
        setEditar(inventario2)
        setMostrarmodal(!mostrarModal)
    }

    return (
        <Table stripped responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.length < 1 ? (
                    <tr>
                        <td colSpan="3">No hay registros</td>
                    </tr>
                ) : (
                    data.map((item) => (
                        <tr>
                            <td>{item.idInventario2}</td>
                            <td>{item.nombreIngrediente2}</td>
                            <td>{item.cantidadIngrediente2}</td>
                            <td>{item.unidadIngrediente2}</td>
                            <td>
                                <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)}>
                                    Editar
                                </Button>
                                <Button color="danger" size="sm" onClick={() => eliminarInventario2(item.idInventario2)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    );
};

export default TablaInventario2
