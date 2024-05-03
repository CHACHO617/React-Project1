import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const modeloInventario1 = {
    idInventario1: 0,
    nombreIngrediente1: "",
    cantidadIngrediente1: 0,
    unidadIngrediente1: "",
}

const ModalInventario1 = ({ mostrarModal, setMostrarmodal, guardarInventario1, editar, setEditar, editarInventario1 }) => {
    const [inventario1, setInventario1] = useState(modeloInventario1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Unidades');

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setInventario1({
            ...inventario1,
            unidadIngrediente1: option
        });
    };

    const actualizarDato = (e) => {
        setInventario1({
            ...inventario1,
            [e.target.name]: e.target.value
        });
    }

    const enviarDatos = () => {
        if (inventario1.idInventario1 === 0) {
            guardarInventario1(inventario1);
        } else {
            editarInventario1(inventario1);
        }
        setInventario1(modeloInventario1);
    }

    useEffect(() => {
        if (editar != null) {
            setInventario1(editar);
        } else {
            setInventario1(modeloInventario1);
        }
    }, [editar]);

    const cerrarModal = () => {
        setMostrarmodal(!mostrarModal);
        if (editar != null) {
            setEditar(null);
        }
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {inventario1.idInventario1 === 0 ? "Nuevo Item" : "Editar Item"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre Ingrediente</Label>
                        <Input name="nombreIngrediente1" onChange={(e) => actualizarDato(e)} value={inventario1.nombreIngrediente1} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Cantidad Ingrediente</Label>
                        <Input name="cantidadIngrediente1" onChange={(e) => actualizarDato(e)} value={inventario1.cantidadIngrediente1} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Unidad Ingrediente</Label>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle caret>
                                {selectedOption}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => handleOptionSelect('Unidades')}>Unidades</DropdownItem>
                                <DropdownItem onClick={() => handleOptionSelect('Gramos')}>Gramos</DropdownItem>
                                <DropdownItem onClick={() => handleOptionSelect('Rodajas')}>Rodajas</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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

export default ModalInventario1;
;