import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import ProductItem from '../../utils/Product_item/ProductItem';
import './detailProduct.css'
import Leaf from '../../home/images/leaf.png'


function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState); // Access the GlobalState context
    const [products] = state.ProductsAPI.products;
    const [detailProduct, setDetailProduct] = useState({images: {}}); 

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) {
                    setDetailProduct(product);
                }
            });
        }
    }, [products, params.id]); 

    console.log(detailProduct);
    if (detailProduct.length === 0) return 0;

  return (
    <>
        <div className='detail'>
                <img src={detailProduct.images.url} alt=''/>
                <div className='box-detail'>
                    <div className='row'>
                        <h2>{detailProduct.title}</h2>
                    </div>
                    <p style={{fontSize: '20px'}}>${detailProduct.price}</p>
                    <p>{detailProduct.description}</p>
                    <Link to="/cart" className="cart">BUY NOW</Link>
                </div>
        </div>
        <div className="trending-products-container">
        <div className="trending-products-inner">
            <h2 className="trending-products-title">Related Products</h2>
            <img src={Leaf} alt='' className="trending-products-image"/>
            <div className="products-grid">
            {
                    products.map(product => {
                        return product.category === detailProduct.category
                        ? <ProductItem key={product._id} product={product}/> : null
                    })
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default DetailProduct
