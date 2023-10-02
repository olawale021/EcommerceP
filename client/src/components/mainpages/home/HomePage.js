import React from 'react'
import { Link } from 'react-router-dom'
import Organic from './images/organic.png'
import Leaf from './images/leaf.png'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShippingIcon from './images/shipping-truck.svg'
import Certified from './images/certified.svg'
import Money from './images/money.svg'
import Return from './images/return-cash.svg'

import './homepage.css'
import TrendingProducts from '../../trendingproducts/TrendingProducts'


function HomePage() {
    return (
        <>
            <section className='section1'>
                <div className='section1-left'>
                    <img src={Organic} alt=''/> 
                </div>
                <div className='section1-right'>
                    <img src={Leaf} alt=''/>
                    <h3>Best Quality Products</h3>
                    <h1 style={{fontSize: '60px'}}>Join The Organic <br/> Movement!</h1>
                    <p>Shop Fresh, Healthy, and Organic Groceries: Your One-Stop 
                        Destination for Quality Food Products!</p><br/><br/>
                    <Link style={{backgroundColor: '#6A9738', borderRadius: '5px', padding: '12px 20px 12px 20px', color: 'white'}} to="/products" ><FontAwesomeIcon icon={faCartShopping} />SHOP NOW</Link>
                </div>
            </section>
            <section className='section2'>
                <div className='section2cont'>
                    <div className='desc'>
                        <img src={ShippingIcon} alt='' width='30px' style={{color: 'white'}}/>
                        <h4>Free Shipping</h4>
                    </div>
                    <p>Above $5 Only</p>
                </div>
                <div className='section2cont'>
                    <div className='desc'>
                        <img src={Certified} alt='' width='30px'/>
                        <h4>Certified Organic</h4>
                    </div>
                    <p>100% Guarantee</p>
                </div>
                <div className='section2cont'>
                    <div className='desc'>
                        <img src={Money} alt='' width='30px'/>
                        <h4>Huge Savings</h4>
                    </div>
                    <p>Above $5 Only</p>
                </div>
                <div className='section2cont'>
                    <div className='desc'>
                        <img src={Return} alt='' width='30px'/>
                        <h4>Easy Returns</h4>
                    </div>
                    <p>No Questions Asked</p>
                </div>
            </section>
            <section>
                <TrendingProducts/>
            </section>
        </>
    )
}

export default HomePage
