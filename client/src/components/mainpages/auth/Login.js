import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading/Loading';
import Oragnic from '../home/images/organic.png'

import './Login.css';
import ShopCategories from '../../shopcategory/ShopCategories';
import CustomerReview from '../../customerreview/CustomerReview';

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate a 2-second delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            await axios.post('/user/login', { ...user });
            localStorage.setItem('firstLogin', true);
            window.location.href = '/products';
        } catch (err) {
            alert(err.response.data.msg);
            setLoading(false);
        }
    };

    return (
        <>
        <div className='login'> 
                <div className='login-page'>
                    <h2>Log in to your account</h2> <br/><br/><br/>
                    <form onSubmit={loginSubmit}>
                        <input
                            type='email'
                            name='email'
                            required
                            placeholder='Email'
                            onChange={onChangeInput}
                            value={user.email}
                        />
                        <input
                            type='password'
                            name='password'
                            required
                            placeholder='Password'
                            value={user.password}
                            onChange={onChangeInput}
                        />

                        <div className='row'>
                            <button type='submit' disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                            <Link to='/register'>Register</Link>
                        </div>
                    </form>

                    {/* {loading && <div className='loading-message'><Loading/></div>} */}
                </div>
        </div>
         <ShopCategories />
         <div>
            <CustomerReview/>
         </div>
         </>
    );
}

export default Login;
