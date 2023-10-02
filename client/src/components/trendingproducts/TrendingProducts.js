import React ,{useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import {GlobalState} from "../../GlobalState"
import ProductItem from "../mainpages/utils/Product_item/ProductItem";
import Leaf from './images/leaf.png';

import './trendingproducts.css'; 



function TrendingProducts() {
    const params = useParams();
    const state = useContext(GlobalState)
    const [products]= state.ProductsAPI.products
    const[detailProduct,setDetailProduct] = useState([])

    useEffect(()=>{
        if(params.id){
            products.forEach(product =>{
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[products,params.id])

    console.log(products)
    const recentlyAddedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);


  return (
    <div className="trending-products-container">
        <div className="trending-products-inner">
            <h2 className="trending-products-title">Trending Products</h2>
            <img src={Leaf} alt='' className="trending-products-image"/>
            <div className="products-grid">
                {
                    recentlyAddedProducts.map(product => (
                        <ProductItem key={product._id} product={product}/> 
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default TrendingProducts;
