import React, {useContext, useState} from 'react'
import{Link} from "react-router-dom"
import {GlobalState} from "../../../../GlobalState"
import "./ProductItem.css"
import axios from 'axios'
import Loading from '../Loading/Loading'

function ProductItem({product, isAdmin, callback, products, setCallback, setProducts, deleteProduct}) {
    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart
    const [token] = state.token
    const [loading, setLoading] = useState(false)

    // const deleteProduct = async () => {
    //     console.log(product);
    //     try {
    //         setLoading(true)
    //         const destroyImg = await axios.post(
    //             `/api/destroy`,
    //             { public_id: product.images.public_id }, // request body
    //             { headers: { Authorization: token } } // config object
    //         );
    //         const deleteProduct = await axios.delete(
    //             `/api/products/${product._id}`,
    //             { headers: { Authorization: token } } // config object
    //         );
    //         await destroyImg
    //         await deleteProduct
    //         setLoading(false)
    //         setCallback(!callback)
    //     } catch (err) {
    //         alert(err.response.data.msg);
    //     }
    // }

    const handleCheck = (id) => {
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }
    if (loading) return <div className=''><Loading/></div>
    
    return (
        <div className='product_card'>
            {
                isAdmin && <input type='checkbox' checked={product.checked} onChange={()=>handleCheck(product._id)} />
            }
            <img src={product.images.url} alt=""/>

            <div className='product_box'>
                <h2>{product.title}</h2>
                <h1>${product.price}</h1>
                <p>{product.description}</p>
            </div>
            <div className='row_btn'>
                { isAdmin ? <>
                    <Link id="btn_buy" to="#!" onClick={()=>deleteProduct(product._id, product.images.public_id)}>
                        DELETE
                    </Link>
                    <Link id="btn_view" to={`edit_product/${product._id}`}>
                        EDIT
                    </Link>
                    </>:
                    <>
                        <Link id="btn_buy" to="#!" onClick={()=>addCart(product)} >
                        BUY
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}>
                        VIEW
                    </Link>
                    </>
                }
            </div>
        </div>
    )
}

export default ProductItem
