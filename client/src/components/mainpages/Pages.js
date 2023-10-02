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


function Pages() {
    const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  return (
   


    <Routes>
        <Route path='/' exact Component={HomePage}/>
        <Route path='/login'  Component={isLogged ? NotFound : Login}/>
        <Route path='/category'  Component={isLogged ? Categories : Login}/>
        <Route path='/create_product'  Component={isLogged ? CreateProduct : Login}/>
        <Route path='products/edit_product/:id'  Component={isLogged ? CreateProduct : Login}/>
        <Route path='/register'  Component={Register}/>
        <Route path='/cart'  Component={Cart}/>
        <Route path='/products'  Component={isLogged ? Products : Login}/>
        <Route path='products/detail/:id'  Component={DetailProduct}/>

        <Route path='*'  Component={NotFound}/>

    </Routes>
  )
}

export default Pages
