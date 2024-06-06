import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";
import RecipeShow from "./RecipeShow";

const PrepareBurgerForm = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');

    const [burgers, setBurgers] = useState([{ name: '', amount: 0 }]);
    const [result, setResult] = useState(null);

    const handleBurgerChange = (index, field, value) => {
        const newBurgers = [...burgers];
        newBurgers[index][field] = field === 'amount' ? parseInt(value) : value;
        setBurgers(newBurgers);
    };

    const handleAddBurger = () => {
        setBurgers([...burgers, { name: '', amount: 0 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const burgersToPrepare = burgers.reduce((acc, burger) => {
            acc[burger.name] = burger.amount;
            return acc;
        }, {});

        try {
            const response = await fetch('/api/burger/prepare-burgers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(burgersToPrepare)
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
            } else {
                console.error('Error preparing burgers:', response.statusText);
                setResult(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setResult(null);
        }
    };

    // If authToken is null, redirect to '/'
    if (!authToken) {
        window.location.href = 'https://localhost:44491/';
        return null; // Return null or a loading indicator if necessary
    }

    const cerrarSesion = () => {
        window.location.href = 'https://localhost:44491/';
    };

    return (
        <div className="position-relative p-3">
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}>
                <Button color="secondary" onClick={cerrarSesion}>Cerrar Sesión</Button>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <RecipeShow />
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                {burgers.map((burger, index) => (
                    <div key={index} className="mb-3 row">
                        <div className="col">
                            <label>Burger Name:</label>
                            <input
                                type="text"
                                value={burger.name}
                                onChange={(e) => handleBurgerChange(index, 'name', e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="col">
                            <label>Amount to Prepare:</label>
                            <input
                                type="number"
                                value={burger.amount}
                                onChange={(e) => handleBurgerChange(index, 'amount', e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                    </div>
                ))}
                <div className="d-flex flex-column align-items-start">
                    <button type="button" onClick={handleAddBurger} className="btn btn-primary mb-3">Add Another Burger</button>
                    <button type="submit" className="btn btn-success">Prepare Burgers</button>
                </div>
            </form>
            {result && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Preparation Results:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PrepareBurgerForm;
