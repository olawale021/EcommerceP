import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from "../../../GlobalState";
import Loading from '../utils/Loading/Loading';
import ProductItem from '../utils/Product_item/ProductItem';
import "./Product.css";
import axios from 'axios';
import Filters from "../utils/Product_item/Filters"
import LoadMore from '../utils/Product_item/LoadMore';

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.ProductsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [callback, setCallback] = state.ProductsAPI.callback;
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading]= useState(false)
  const [token]=state.token;



  const deleteProduct = async  (id, public_id) => {
    console.log(id)
    
    try {
        setLoading(true)
        const destroyImg = axios.post(`/api/destroy`, {public_id: public_id},{
            headers: {Authorization: token}
        })
        const deleteProduct = axios.delete(`/api/products/${id}`,{
            headers: {Authorization: token}
        })
        await destroyImg
        await deleteProduct
        setLoading(false)
        setCallback(!callback)
    } catch (err) {
        alert(err.response.data.msg)
    }
}

  const checkAll = () => {
    const newProducts = products.map(product => ({
      ...product,
      checked: !isChecked
    }));
    setProducts(newProducts);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('/api/products');
      setProducts(res.data.products);
    };
    getProducts();
  }, [setProducts]);

  const deleteAll = () => {
    products.forEach(product => {
        if(product.checked) deleteProduct(product._id, product.images.public._id)
    })
  }

  return (
    <>
    <Filters/>
      {isAdmin && (
        <div className='delete-all' style={{textAlign:'right', margin: '20px'}}>
          <span  style={{textTransform: 'uppercase', color: 'black', letterSpacing: '1.3px'}}>Select All</span>
          <input style={{height:'25px', width:'25px', transform: 'translateX(5px', margin:'0 15px'}}
            type='checkbox'
            checked={isChecked}
            onChange={checkAll}
          />
          <button  onClick={deleteAll} style={{border: '1px solid #91C355', padding: '10px 25px', color: '#91C355', textTransform: 'uppercase'}}>Delete All</button>
        </div>
      )}
      <div className='products'>
        {products.map(product => (
          <ProductItem
            key={product._id}
            product={product}
            setProducts={setProducts}
            isAdmin={isAdmin}
            callback={callback}
            setCallback={setCallback}
            products={products}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
      <LoadMore/>
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
