import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState({});  // New state for user details

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/info', {
                        headers: { Authorization: token }
                    });
                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                    setCart(res.data.cart);
                    setUser(res.data);  // Store the user details
                } catch (err) {
                    alert(err.response.data.msg);
                }
            }
            getUser();
        }
    }, [token]);

    const addCart = async (product) => {
        if (!isLogged) return alert('Please Login');

        const check = cart.every(item => {
            return item._id !== product._id;
        });

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }]); // Update the cart state

            await axios.patch('/user/addCart', { cart: [...cart, { quantity: 1 }] }, {
                headers: { Authorization: token }
            });
        } else {
            alert('Added to Cart');
        }
    };

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        addCart: addCart,
        cart: [cart, setCart],
        user: [user, setUser]  // Return user state
    };
}

export default UserAPI;
