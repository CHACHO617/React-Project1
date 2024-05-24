import React, { useState } from 'react';

const PrepareBurgerForm = () => {
    const [burgerName, setBurgerName] = useState('');
    const [amount, setAmount] = useState(0);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const burgersToPrepare = {
            [burgerName]: parseInt(amount)
        };

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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Burger Name:</label>
                    <input
                        type="text"
                        value={burgerName}
                        onChange={(e) => setBurgerName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Amount to Prepare:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
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
