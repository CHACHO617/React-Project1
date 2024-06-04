import React from 'react';
import Ingredients from './Ingredientes'; // Assuming this is the name of your table component
import Recipe from './Recipe';
import RecipeIngredient from './RecipeIngredient';
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";


const redirectUsuarios = () => {
    window.location.href = 'https://localhost:44491/crud';

};
const redirectInventario1 = () => {
    window.location.href = 'https://localhost:44491/crudinventario1';
};
const redirectInventario2 = () => {
    window.location.href = 'https://localhost:44491/crudinventario2';
};
/*const redirectLogs = () => {
    window.location.href = 'https://localhost:44491/crudinventario2';
};*/
const redirectRecipes = () => {
    window.location.href = 'https://localhost:44491/crudingredientes';
};
const cerrarSesion = () => {
    window.location.href = 'https://localhost:44491/loginadmin';
};

const TripleIngredientTable = () => {
    return (
        <div>
            <div className="d-flex justify-content-between mt-3" style={{ padding: "0 8%" }}>
                <div>
                    <Button color="primary" style={{ marginRight: "10px" }} onClick={redirectUsuarios}>Usuarios</Button>
                    <Button color="primary" style={{ marginRight: "10px" }} onClick={redirectInventario1}>Inventario 1</Button>
                    <Button color="primary" onClick={redirectInventario2}>Inventario 2</Button>
                </div>
                <Button color="secondary" onClick={cerrarSesion}>Cerrar Sesión</Button>
            </div>
            <h2></h2>
            <Ingredients /> {/* Render the table component once */}

            <h2></h2>
            <Recipe /> {/* Render the table component a second time */}

            <h2></h2>
            <RecipeIngredient /> {/* Render the table component a third time */}
        </div>
    );
};

export default TripleIngredientTable;
