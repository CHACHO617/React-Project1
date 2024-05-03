
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const modeloInventario2 = {
    idInventario2: 0,
    nombreIngrediente2: "",
    cantidadIngrediente2: 0,
    unidadIngrediente2: "",
}

const ModalInventario2 = ({ mostrarModal, setMostrarmodal, guardarInventario2, editar, setEditar, editarInventario2 }) => {
    const [inventario2, setInventario2] = useState(modeloInventario2);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Unidades');

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setInventario2({
            ...inventario2,
            unidadIngrediente2: option
        });
    };

    const actualizarDato = (e) => {
        setInventario2({
            ...inventario2,
            [e.target.name]: e.target.value
        });
    }

    const enviarDatos = () => {
        if (inventario2.idInventario2 === 0) {
            guardarInventario2(inventario2);
        } else {
            editarInventario2(inventario2);
        }
        setInventario2(modeloInventario2);
    }

    useEffect(() => {
        if (editar != null) {
            setInventario2(editar);
        } else {
            setInventario2(modeloInventario2);
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
                {inventario2.idInventario2 === 0 ? "Nuevo Item" : "Editar Item"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre Ingrediente</Label>
                        <Input name="nombreIngrediente2" onChange={(e) => actualizarDato(e)} value={inventario2.nombreIngrediente2} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Cantidad Ingrediente</Label>
                        <Input name="cantidadIngrediente2" onChange={(e) => actualizarDato(e)} value={inventario2.cantidadIngrediente2} />
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

export default ModalInventario2;