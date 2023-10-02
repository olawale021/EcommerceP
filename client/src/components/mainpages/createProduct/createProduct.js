import { useContext, useState, useEffect } from "react"
import React from 'react'
import axios from "axios"
import { GlobalState } from "../../../GlobalState"
import Loading from "../utils/Loading/Loading"
import { useNavigate, useParams } from 'react-router-dom'

import './createProduct.css'
const initialState = {
  product_id: '',
  title: '',
  price: '',
  description: '',
  content: '',
  category: '',
  id: '',
}


function CreateProduct() {
  const [product, setProduct] = useState(initialState)
  const state = useContext(GlobalState)
  const [categories] = state.categoriesAPI.categories
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  const navigate = useNavigate()
  const param =useParams()
  const [products, setProducts] = state.ProductsAPI.products
  const [onEdit, setOnEdit] = useState(false)


  const [callback, setCallback]= state.ProductsAPI.callback


  useEffect(()=>{
    if(param.id){
      setOnEdit(true)
      products.forEach(product => {
        if(product._id === param.id) {
          setProduct(product) 
          setImages(product.images)
        }
      })
      
    }else{
      setOnEdit(false)
      setImages(false)
      setProduct(initialState)
    } 
  },[param.id])

    const handleChangeInput = e => {
      const {name, value} = e.target
      setProduct({...product, [name]:value})
  }


  const styleUpload = {
    display: images ? 'block' : 'none'
  }

  const handleUpload = async (e) =>{
    e.preventDefault()
    try {
      if(!isAdmin) return alert("You are not an Admin")
      const file = e.target.files[0]
      if(!file) return alert("No file Selected")
      if(file.type !== "image/jpeg" && file.type !== "image/png") return alert("File type is not supported")

      let formData = new FormData();

      formData.append('files', file)

      setLoading(true)
      const res = await axios.post('/api/upload', formData, {
        headers: {'content-type': 'multipart/form-data' , Authorization: token }
      })
      
      setLoading(false)
      setImages(res.data)
      
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleDestroy = async (e) => {
    try {
        if(!isAdmin) return alert('you are not an admin');
        setLoading(true)
        await axios.post('/api/destroy', {public_id: images.public_id},{
            headers: {Authorization : token}
        })
        setLoading(false)
        setImages(false)

    } catch (err) {
        alert(err.response.data.msg)
    }
} 

const handleSubmit = async (e) => {
  e.preventDefault()
      try {
        if(!isAdmin) return alert('You are not an Admin')
        if(!images) return alert('No Image Found')
        if(onEdit){
          await axios.put(`/api/products/${product._id}`, {...product, images},{
            headers: {Authorization : token}
        })
        }else {
          await axios.post('/api/products', {...product, images},{
            headers: {Authorization : token}
        })
        }
        
    setImages(false)
    setProduct(initialState)
    setCallback(!callback)
    console.log(callback)
    navigate('/products')
  } catch (err) {
    alert(err.response.data.msg)
  }
}

  return (
    <div className="create_product">
        <div className="upload">
            <input type="file" name="files" id="file_up" onChange={handleUpload}/>
            {
              loading ? <div id="file_img"><Loading/></div>
            
                :<div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ''} alt=""/>
                    <span onClick={handleDestroy}>x</span>
                </div>
            }
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
                <label htmlFor="product" >Product_id</label>
                <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleChangeInput} disabled={onEdit}/>
          </div>
          <div className="row">
                <label htmlFor="product">Title</label>
                <input type="text" name="title" id="title" required value={product.title} onChange={handleChangeInput}/>
          </div>
          <div className="row">
                <label htmlFor="product">Price</label>
                <input type="number" name="price" id="price" required value={product.price} onChange={handleChangeInput}/>
          </div>
          <div className="row">
                <label htmlFor="product">Description</label>
                <textarea rows="5" type="text" name="description" id="description" required value={product.description} onChange={handleChangeInput}/>
          </div>
          <div className="row">
                <label htmlFor="product">Content</label>
                <textarea rows="7" type="text" name="content" id="content" required value={product.content} onChange={handleChangeInput}/>
          </div>
          <div className="row">
                <label htmlFor="product">Category</label>
                <select type="text" name="category" id="category" value={product.category} onChange={handleChangeInput}>
                  <option value="">Select a Category</option>
                    {
                      categories.map(category=>(
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))
                    }
                </select>
          </div>
          <button type="submit">{onEdit ? "Edit Product" : "Create Product"}</button>
        </form>
    </div>
  )
}

export default CreateProduct
