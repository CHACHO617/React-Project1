import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import ModalUsuario from "./Componentes/ModalUsuario";
import TablaUsuario from "./Componentes/TablaUsuario";

const App = () => {

    const [usuarios, setUsuarios] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)



    const mostrarUsuarios = async () => {

        const response = await fetch("api/usuarios/Lista");

        if (response.ok) {
            const data = await response.json()
            setUsuarios(data)
            console.log("Todo esta bien")

        }
        else {
            console.log("Error en la lista")
        }

    }

    useEffect(() => {

        mostrarUsuarios()
    }, [])

    const guardarUsuario = async (usuario) => {

        const response = await fetch("api/usuarios/Guardar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(usuario)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarUsuarios();
        }

    }

    const editarUsuario = async (usuario) => {

        const response = await fetch("api/usuarios/Editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(usuario)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarUsuarios();
        }

    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Usuarios</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>
                                Nuevo Usuario
                            </Button>
                            <hr />
                            <TablaUsuario data={usuarios}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarmodal={setMostrarModal}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <ModalUsuario
                mostrarModal={mostrarModal}

                setMostrarmodal={setMostrarModal}
                guardarUsuario={guardarUsuario}

                editar={editar}
                setEditar={setEditar}
                editarUsuario={editarUsuario}
            />

        </Container>
    );
};

export default App;
