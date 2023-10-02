import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading/Loading';

import './Login.css';

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
        <div className='login-page'>
            <h2>Login</h2>
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
    );
}

export default Login;
