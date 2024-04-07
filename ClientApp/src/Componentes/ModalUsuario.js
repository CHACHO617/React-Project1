
import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button} from "reactstrap"

const modeloUsuario = {
    idUsuario : 0,
    correoUsuario: "",
    nombreUsuario: "",
    apelllidoUsuario: "",
    contrasenaUsuario: ""
}

const ModalUsuario = ({ mostrarModal, setMostrarmodal, guardarUsuario, editar, setEditar, editarUsuario}) => {

    const [usuario, setUsuario] = useState(modeloUsuario)

    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setUsuario(
            {
                ...usuario,
                [e.target.name] : e.target.value
            }
        )
    }


    const enviarDatos = () => {

        if (usuario.idUsuario === 0) {
            guardarUsuario(usuario);
        } else {
            editarUsuario(usuario)
        }
        setUsuario(modeloUsuario)
    }

    useEffect(() => {
        if (editar != null) {
            setUsuario(editar)
        }
        else {
            setUsuario(modeloUsuario)
        }

    }, [editar])

    const cerrarModal = () => {
        setMostrarmodal(!mostrarModal)
        if (editar != null) {
            setEditar(null)
        } 

    }

    return (
        <Modal isOpen={mostrarModal}>

            <ModalHeader>
                {usuario.idUsuario == 0 ? "Nuevo Usuario" : "Editar Usuario"}
            </ModalHeader>
            <ModalBody>
                <Form>

                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correoUsuario" onChange={(e) => actualizarDato(e)} value={usuario.correoUsuario}/>
                    </FormGroup>

                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombreUsuario" onChange={(e) => actualizarDato(e)} value={usuario.nombreUsuario}/>
                    </FormGroup>

                    <FormGroup>
                        <Label>Apellido</Label>
                        <Input name="apelllidoUsuario" onChange={(e) => actualizarDato(e)} value={usuario.apelllidoUsuario} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Contraseña</Label>
                        <Input name="contrasenaUsuario" onChange={(e) => actualizarDato(e)} value={usuario.contrasenaUsuario} type="password"/>
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

            )
}

export default ModalUsuario;