import React from 'react'
import { Table, Button } from 'reactstrap';

const TablaInventario1 = ({ data, setEditar, mostrarModal, setMostrarmodal, eliminarInventario1 }) => {
    const enviarDatos = (inventario1) => {
        setEditar(inventario1)
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
                            <td>{item.idInventario1}</td>
                            <td>{item.nombreIngrediente1}</td>
                            <td>{item.cantidadIngrediente1}</td>
                            <td>{item.unidadIngrediente1}</td>
                            <td>
                                <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)}>
                                    Editar
                                </Button>
                                <Button color="danger" size="sm" onClick={() => eliminarInventario1(item.idInventario1)}>
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

export default TablaInventario1
