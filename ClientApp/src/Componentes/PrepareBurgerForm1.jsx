import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";

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
        <div className="position-relative">
            <Button color="secondary" className="position-absolute top-0 end-0 m-3" onClick={cerrarSesion}>Cerrar Sesión</Button>
            <form onSubmit={handleSubmit}>
                {burgers.map((burger, index) => (
                    <div key={index}>
                        <label>Burger Name:</label>
                        <input
                            type="text"
                            value={burger.name}
                            onChange={(e) => handleBurgerChange(index, 'name', e.target.value)}
                            required
                        />
                        <label>Amount to Prepare:</label>
                        <input
                            type="number"
                            value={burger.amount}
                            onChange={(e) => handleBurgerChange(index, 'amount', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddBurger}>Add Another Burger</button>
                <button type="submit">Prepare Burgers</button>
            </form>
            {result && (
                <div>
                    <h2>Preparation Results:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PrepareBurgerForm;
