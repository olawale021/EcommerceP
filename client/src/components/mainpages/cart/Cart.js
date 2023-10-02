import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

import DeleteIcon from './images/delete.svg'
import './cart.css'

function Cart() {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [total, setTotal] = useState(0)
  const [token] = state.token
  
    useEffect(()=>{
      const getTotal = () => {
        const total = cart.reduce((prev,item)=>{
          return prev + (item.price * item.quantity)

        }, 0)
        setTotal(total)
      }
        getTotal()
    }, [cart])
    console.log(cart)
    const addtoCart = async () => {
      await axios.patch('/user/addcart', {cart}, {
        headers: {Authorization: token}
      })
    }


    const increment =(id , product) =>{
      cart.forEach(item => {
        if(item._id === id){
          item.quantity +=1
        }
      })
      setCart ([...cart, product])
      addtoCart()
    }

    const decrement = (id, product) => {
      cart.forEach(item => {
          if (item._id === id) {
              if (item.quantity > 1) { // Check if quantity is greater than 0
                  item.quantity -= 1;
              }
          }
      });
      setCart([...cart]);
      addtoCart()
  };

  const removeProduct = (id) =>{
      if(window.confirm("Do you want to delete this product?")){
        cart.forEach((item, index)=>{
      if(item._id === id){
        cart.splice(index,1)
      }
    })
    setCart([...cart]);
    addtoCart()
    } 
  }
  

    if(cart.length === 0)
    return <h2 style={{textAlign: 'center', fontSize: '5rem'}}>Cart Empty</h2>
  return (
    <div>
      {
        cart.map(product =>(
          <div className='detail cart' key={product._id}>
                <img src={product.images.url} alt=''/>
                <div className='box-detail'>
                        <h2>{product.title}</h2>
                    <p style={{fontSize: '20px'}}>${product.price * product.quantity}</p>
                    <p>{product.description}</p>
                    <div className='amount'>
                          <button onClick={()=> decrement(product._id)}> - </button>
                          <span>{product.quantity}</span>
                          <button onClick={()=> increment(product._id)}> + </button>
                    </div>
                    <div className="delete" onClick={()=>removeProduct(product._id)}> <img src={DeleteIcon} alt='' style={{width: '20px', height: '20px'}} /></div>
                </div>
        </div>
        ))
      }
      <div className='total'>
          <h3>Total : $ {total}</h3>
          <Link to='#'>Payment</Link>
      </div>
    </div>
  )
}

export default Cart
