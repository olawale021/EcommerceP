import React, {useContext} from 'react'
import {Routes, Route} from "react-router-dom"
import Products from "./products/Products"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Cart from "./cart/Cart"
import NotFound from "./utils/not_found/NotFound"
import DetailProduct from './products/detailProducts/DetailProduct'
import HomePage from './home/HomePage'
import { GlobalState } from '../../GlobalState'
import Categories from './categories/Categories'
import CreateProduct from '../mainpages/createProduct/createProduct'
import CategoryProducts from './categories/CategoryProducts'
import UserProfile from './userprofile/userProfile'
import OrderPage from './orders/OrderPage'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    return (
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/category' element={isLogged ? <Categories /> : <Login />} />
            <Route path='/create_product' element={isLogged ? <CreateProduct /> : <Login />} />
            <Route path='products/edit_product/:id' element={isLogged ? <CreateProduct /> : <Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/orders' element={<OrderPage />} />
            <Route path='/products' element={isLogged ? <Products /> : <Login />} />
            <Route path='/detail/:id' element={<DetailProduct />} />
            <Route path="/category/:category" element={<CategoryProducts />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Pages
