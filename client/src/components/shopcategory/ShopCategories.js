import React, {useContext} from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'

import Pets from './images/pets.jpg'
import Fitness from './images/fitness.jpg'
import Electronics from './images/Electronics.jpg'
import CategoryProducts from '../mainpages/categories/CategoryProducts'
import './shopcategories.css'

function ShopCategories({}) {
  const state = useContext(GlobalState)
    const [products] = state.ProductsAPI.products;
    const [categories] = state.categoriesAPI.categories
    console.log(categories)
  
  return (
    <>
    <h2 style={{paddingTop: '5%', textAlign: 'center', fontSize: '35px', fontFamily: "'Bree Serif', serif", backgroundColor: '#FAF9F8'}}>SHOP BY CATEGORIES</h2>
    <div className='container'>
      <div className='container-item'>
        <h4>Shop Pet Supplies</h4>
        <Link to={`/category/651ac8bc6227092ada396233`} >
            <img src={Pets} alt='' width='300vh' />
            <br/><br/>
            <p>See More</p>
        </Link>
      </div>
      <div className='container-item'>
        <h4>For Your Fitness Needs</h4>
        <Link to={`/category/651ac9f86227092ada396238`} >
            <img src={Fitness} alt='' width='300vh' />
            <br/><br/>
            <p>See More</p>
        </Link>
      </div>
      <div className='container-item'>
        <h4>Shop Electronics & Gadgets</h4>
        <Link to={`/category/651a3c25a1d30e2e7fed8a4c`} >
            <img src={Electronics} alt='' width='300vh' />
            <br/><br/>
            <p>See More</p>
        </Link>
      </div>
    </div>
    </>
  )
}

export default ShopCategories
