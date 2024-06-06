import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const OrderDetailsModal = ({ orderId, isOpen, toggle }) => {
    const [orderDetails, setOrderDetails] = useState([]);

    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`/api/order/GetOrderDetailsByOrderId/${orderId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${authToken}`, // Add the token with "Bearer" prefix

                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrderDetails(data);
                } else {
                    console.error("Error fetching order details:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        if (isOpen && orderId) {
            fetchOrderDetails();
        }
    }, [isOpen, orderId]);

    return (
        <Modal isOpen={isOpen} toggle={toggle} style={{ maxWidth: "80%" }}> {/* Set max-width directly in the style attribute */}
            <ModalHeader toggle={toggle}>Order Details</ModalHeader>
            <ModalBody>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order Detail ID</th>
                            <th>Burger Name</th>
                            <th>Amount Ordered</th>
                            <th>Prepared From Inventory 1</th>
                            <th>Prepared From Inventory 2</th>
                            <th>Unable To Prepare</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((detail) => (
                            <tr key={detail.orderDetailId}>
                                <td>{detail.orderDetailId}</td>
                                <td>{detail.burgerName}</td>
                                <td>{detail.amountOrdered}</td>
                                <td>{detail.preparedFromInventory1}</td>
                                <td>{detail.preparedFromInventory2}</td>
                                <td>{detail.unableToPrepare}</td>
                                {/* Add more cells as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default OrderDetailsModal;
