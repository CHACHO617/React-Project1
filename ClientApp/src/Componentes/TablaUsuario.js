import React from 'react';
import { Table, Button } from 'reactstrap';

const TablaUsuario = ({ data, setEditar, mostrarModal, setMostrarmodal, eliminarUsuario }) => {

    const enviarDatos = (usuario) => {
        setEditar(usuario)
        setMostrarmodal(!mostrarModal)

    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Correo</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Contraseña</th>
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
                        <tr key={item.idUsuario}>
                            <td>{item.correoUsuario}</td>
                            <td>{item.nombreUsuario}</td>
                            <td>{item.apelllidoUsuario}</td>
                            <td>
                                <input
                                    type="password"
                                    value={item.contrasenaUsuario}
                                    disabled // Prevent user input
                                />
                            </td>
                            <td>
                                <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)}>
                                    Editar
                                </Button>
                                <Button color="danger" size="sm" onClick={() => eliminarUsuario(item.idUsuario) }>
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


export default TablaUsuario;
