import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './images/organicwhite.png'


import './footer.css'

function Footer() {
  return (
    <div className='footer'>
            <div style={{marginRight: '10%'}}>
                <img src={Logo} alt='' />
                <p>Discover a world of premium products at your fingertips. 
                    Shop now for unbeatable deals, top-quality items, and exceptional customer service. 
                    Elevate your shopping experience with us today.</p>
            </div>

            <div className='footer-item'>
                <h3>Quick Links</h3>
                    <li><Link>About</Link></li>
                    <li><Link>Cart</Link></li>
                    <li><Link>Checkout</Link></li>
                    <li><Link>Contact</Link></li>
                    <li><Link>Home</Link></li>
                    <li><Link>My Account</Link></li>
                    <li><Link>Shop</Link></li>
                
            </div>

            <div className='footer-item'>
                <h3>Site Links</h3>
                    <li><Link>Privacy Policy</Link></li>
                    <li><Link>Shipping Details</Link></li>
                    <li><Link>Offers Coupons</Link></li>
                    <li><Link>Terms & Conditions</Link></li>
            </div>
      
    </div>
  )
}

export default Footer
