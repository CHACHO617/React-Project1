import React, { useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";

const MostUsedIngredient = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [ingredient, setIngredient] = useState(null);
    const [error, setError] = useState('');

    const handleFetch = async () => {
        if (new Date(startDate) > new Date(endDate)) {
            setError('Start date must be before end date.');
            return;
        }

        try {
            const response = await fetch(`api/order/mostUsedIngredient?startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setIngredient(data);
                setError('');
            } else {
                setError('No ingredients found in the specified date range.');
                setIngredient(null);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError('Error fetching data.');
            setIngredient(null);
        }
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Most Used Ingredient</h5>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <label>
                                    Start Date:
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    End Date:
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </label>
                            </div>
                            <Button color="primary" onClick={handleFetch} className="mt-3">
                                Fetch Most Used Ingredient
                            </Button>
                            {error && <div style={{ color: 'red' }} className="mt-3">{error}</div>}
                            {ingredient && (
                                <div className="mt-3">
                                    <h2>Ingrediente mas usado</h2>
                                    <p>Nombre Ingrediente: {ingredient.nombreIngrediente}</p>
                                    <p>Cantidad Usada: {ingredient.cantidadIngrediente}</p>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MostUsedIngredient;
