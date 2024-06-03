// ModalIngrediente.js
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const modeloIngrediente = {
    ingredientId: 0,
    nombreIngrediente: "",
    unidadIngrediente: "Unidades", // Default value for the dropdown
};

const ModalIngrediente = ({ mostrarModal, setMostrarModal, guardarIngrediente, editar, setEditar, editarIngrediente }) => {
    const [ingrediente, setIngrediente] = useState(modeloIngrediente);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Unidades');

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIngrediente({
            ...ingrediente,
            unidadIngrediente: option,
        });
    };

    const actualizarDato = (e) => {
        setIngrediente({
            ...ingrediente,
            [e.target.name]: e.target.value,
        });
    };

    const enviarDatos = () => {
        if (ingrediente.ingredientId === 0) {
            guardarIngrediente(ingrediente);
        } else {
            editarIngrediente(ingrediente);
        }
        setIngrediente(modeloIngrediente);
    };

    useEffect(() => {
        if (editar != null) {
            setIngrediente(editar);
            setSelectedOption(editar.unidadIngrediente);
        } else {
            setIngrediente(modeloIngrediente);
            setSelectedOption('Unidades');
        }
    }, [editar]);

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal);
        if (editar != null) {
            setEditar(null);
        }
    };

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {ingrediente.ingredientId === 0 ? "Nuevo Ingrediente" : "Editar Ingrediente"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre Ingrediente</Label>
                        <Input
                            name="nombreIngrediente"
                            onChange={actualizarDato}
                            value={ingrediente.nombreIngrediente}
                        />
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
    );
};

export default ModalIngrediente;
