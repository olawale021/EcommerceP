import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import './OrderPage.css';

function OrderPage() {
    const state = useContext(GlobalState);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = state.userAPI.user;
    const userId = user._id;

    useEffect(() => {
        // Retrieve saved orders from local storage if they exist
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
            setLoading(false);
            return; // If there are saved orders, no need to fetch again
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/user/user/${userId}/orders`);
                setOrders(response.data);
                // Save the orders to local storage
                localStorage.setItem('orders', JSON.stringify(response.data));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div className="orders-container">
            <h2>Your Orders</h2>
            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <div>
                    {orders.map(order => (
                        <div key={order._id} className="order-card">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Date:</strong> {new Date(order.updatedAt).toLocaleDateString()}</p>
                            <p><strong>Total:</strong> ${order.totalAmount}</p>
                            <p><strong>Items:</strong> {order.items.length}</p>
                            <p><strong>Status:</strong> {order.paymentStatus}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderPage;
