import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Table, Button } from "reactstrap";
import OrderDetailsModal from "./OrderDetailsModal";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const authToken = localStorage.getItem('authToken');

    const fetchOrders = async () => {
        try {
            const response = await fetch("/api/order/GetAllOrders", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error("Error fetching orders:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const openModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Orders</h5>
                        </CardHeader>
                        <CardBody>
                            <Table striped responsive>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Email</th>
                                        <th>Order Date</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.orderId}>
                                            <td>{order.orderId}</td>
                                            <td>{order.email}</td>
                                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                                            <td>
                                                <Button color="primary" size="sm" onClick={() => openModal(order.orderId)}>
                                                    View Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <OrderDetailsModal orderId={selectedOrderId} isOpen={isModalOpen} toggle={toggleModal} />
        </Container>
    );
};

export default Orders;
