import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cart from './icons/cart.svg';
import User from './icons/user.svg';
import Logo from './icons/organicstore.svg';
import LogoutSvg from './icons/log-out.svg';
import './header.css';

function Header() {
    const state = useContext(GlobalState);
    console.log(state)
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;
    const [user] = state.userAPI.user;

    

    const adminRouter = () => {
        return (
            <ul className='admin-cre'>
                <li><Link to='/create_product'>AddProduct</Link></li>
                <li><Link to='/category'>Categories</Link></li>
                
            </ul>
        );
    };

   

    const loggedOut = async () => {
        await axios.get('/user/logout');
        localStorage.clear();
        setIsAdmin(false);
        setIsLogged(false);
    };

    const loggedRouter = () => {
        return (
            <>

                <li><Link to='/profile'><img src={User} alt='' width='30' /></Link></li>
                <li><Link to='/' onClick={loggedOut}><img src={LogoutSvg} alt='' width='30' /></Link></li>
    
            </>
        );
    };

    return (
        <header>
            <div className='logo'>
                <Link to='/'>
                    <img src={Logo} alt='' />
                </Link>
            </div>
            <ul>
                <li><Link to='/products'>Collection</Link></li>
                <li><Link to='/products'>Products</Link></li>
            </ul>
            <div className='header-icons'>
                {isAdmin && adminRouter()}
                {isLogged ? loggedRouter() : <li><Link to='/login'><img src={User} alt='' width='30' /></Link></li>}
                {isAdmin ? '' : 
                    <li>
                        <Link to='/cart'>
                            <img src={Cart} alt='' width='30' />
                        </Link>
                        <span>{cart.length}</span>
                    </li>
                }
                
            </div>
        </header>
    );
}

export default Header;
