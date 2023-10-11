import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

import DeleteIcon from './images/delete.svg'
import './cart.css'
import ShopCategories from '../../shopcategory/ShopCategories'


function Cart() {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [user] = state.userAPI.user;
  const userId = user._id;
  const [total, setTotal] = useState(0)
  const [token] = state.token
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Checkout");

  
    useEffect(()=>{
      const getTotal = () => {
        const total = cart.reduce((prev,item)=>{
          return prev + (item.price * item.quantity)
        }, 0)
        setTotal(Math.round(total))       // set total get approximated value
      }
        getTotal()
    }, [cart])
    
    const addtoCart = async () => {
      await axios.patch('/user/addcart', {cart}, {
        headers: {Authorization: token}
      })
    }

console.log (user)
    const increment =(id , product) =>{
      cart.forEach(item => {
        if(item._id === id){
          item.quantity +=1
        }
      })
      setCart ([...cart])
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
    return (
    <>
    <h2 style={{textAlign: 'center', fontSize: '5rem', height: '500px'}}>Cart Empty</h2>
    
    <div>
        <ShopCategories />
      </div>
      </>
      )
      return (
        <>
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
              <button onClick={() => {
                    setButtonLabel("Please wait...");
                    setTimeout(() => {
                        setShowOrderForm(true);
                    }, 500); 
                    setButtonLabel("Checkout");
                }}>
                    {buttonLabel}
              </button>

            </div>
          </div>
    
          {showOrderForm && (
             <OrderForm userId={userId} cart={cart.map(item => ({ productId: item._id, quantity: item.quantity }))} total={total} onComplete={() => setShowOrderForm(false)} />
             )}
    
          <ShopCategories />
        </>
      );
    }
    

    function OrderForm({ userId, cart, total, onComplete }) {
      console.log(cart)
      const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      });

      const [paymentMethod, setPaymentMethod] = useState('');

      const handleAddressChange = e => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }));
    };
    
      const submitOrder = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/user/orders', { 
            userId: userId,
            items: cart, 
            totalAmount: total, 
            shippingAddress: address,
            paymentMethod: paymentMethod
          });
          if (response.status === 201) {
            onComplete();
            alert('Order placed successfully!');
          } else {
            alert('There was an issue placing your order.');
          }
        } catch (error) {
          console.log(error);
          alert('Error placing the order:', error.response.data.msg);
        }
      };
    
      return (
        <div style={{backgroundColor: '#FAF9F8'}}>
        <form onSubmit={submitOrder}>
          <h4>SHIPPING ADDRESS</h4>
              <div className="address-inputs">
                          <label>
                              Street:
                              <input 
                                  type="text"
                                  name="street"
                                  value={address.street}
                                  onChange={handleAddressChange}
                                  required
                              />
                          </label>

                          <label>
                              City:
                              <input 
                                  type="text"
                                  name="city"
                                  value={address.city}
                                  onChange={handleAddressChange}
                                  required
                              />
                          </label>

                          <label>
                              State:
                              <input 
                                  type="text"
                                  name="state"
                                  value={address.state}
                                  onChange={handleAddressChange}
                              />
                          </label>

                          <label>
                              Postal Code:
                              <input 
                                  type="text"
                                  name="postalCode"
                                  value={address.postalCode}
                                  onChange={handleAddressChange}
                                  required
                              />
                          </label>

                          <label>
                              Country:
                              <input 
                                  type="text"
                                  name="country"
                                  value={address.country}
                                  onChange={handleAddressChange}
                                  required
                              />
                          </label>
                    </div>
      
                    <label>
                      Payment Method:
                      <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                      <option value="">Choose Payment Method</option>
                        <option value="CreditCard">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="BankTransfer">Bank Transfer</option>
                      </select>
                    </label>
                  <button type="submit">Submit Order</button>
    </form>
    </div>
  );
}
    
    export default Cart;