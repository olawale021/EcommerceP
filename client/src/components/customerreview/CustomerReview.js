import React from 'react'
import FiveStar from './images/5stars.png'
import User from './images/user.svg'
import { Link } from 'react-router-dom'

import './customerreview.css'

function CustomerReview() {
  return (
    <div>
    <h3 style={{textAlign: 'center', fontSize: '40px', paddingTop: '5%', backgroundColor: '#F8F6F4'}}>Customer Review</h3>
    <div className='review-container'>
        <div className='review-container-item'>
            <img className='star' src={FiveStar} alt=''/>
            <p>Outstanding shopping experience! Exceptional product range, swift delivery, and 
              top-notch customer service. Easily the best e-commerce store I've encountered. 
              Highly recommend to everyone!</p>
              <div className='user'>
                <img src={User} alt='' width='30' height='30'/>
                <span>Filani Olawale</span>
              </div>
        </div>

        <div className='' id='deals'>
            <h2 style={{color: 'white', paddingTop: '15%', fontSize: '30px', textAlign: 'center', paddingBottom: '20%'}}>
                Deal of The Day <br/>
                15% Off On All Fashion!
            </h2>
            <Link to='category/651a3c25a1d30e2e7fed8a4c' style={{ 
        color: 'white', 
        textDecoration: 'none', 
        fontSize: '20px', 
        padding: '10px 20px', 
        border: '2px solid #91C355', 
        backgroundColor: '#91C355',
        borderRadius: '5px'
    }} >SHOP NOW </Link>
        </div>

        <div className='review-container-item'>
            <img  className='star' src={FiveStar} alt='' width= '80px'/>
            <p>Fantastic shopping experience! Outstanding product range, swift delivery, 
              and top-notch customer service. Highly recommend this store for all your shopping needs. Five stars!</p>
              <div className='user'>
                <img src={User} alt='' width='30' height='30'/>
                <span>Big Steppa</span>
              </div>
        </div>
        
    </div>

    </div>
  )
}

export default CustomerReview
