import React, {useState, useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

import Delete from './icons/delete-filled.svg'
import Edit from './icons/edit.svg'
import UpdateIcon from './icons/update-page.svg'

import './categories.css'

function Categories() {
  const state = useContext(GlobalState)
  const [categories, setCategories] = state.categoriesAPI.categories
  const [category, setCategory] = useState('')
  const [token] = state.token
  const [callback, setCallback] = state.categoriesAPI.callback
  const [onEdit, setOnEdit] = useState(false)
  const [id, setID] = useState('')


  const createCategory =  async (e) => {
    e.preventDefault()
    try {
      if (onEdit){
        const res = await axios.put(`api/category/${id}`, {name: category},{
          headers : {Authorization: token }
        
          })
          
          alert(res.data.msg)
      }else {
        const res = await axios.post('api/category', {name: category},{
          headers : {Authorization: token }
        
          })
          
          alert(res.data.msg)
        }
        setCategory('')
        setCallback(!callback)
    } catch (err) {
        alert(err.response.data.msg)
    }

  }

  const editCategory = async (id, name) => {
      setID(id)
      setCategory(name)
      setOnEdit(true)

  }

  const deleteCategory = async (id, ) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: {Authorization: token}
      } )
      alert(res.data.msg)
      setCallback(!callback)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  return (
    <div className='categories'>
        <form onSubmit={createCategory}>
            <label htmlFor='category'> Category</label>
            <input type='text' name='category' value={category} required onChange={e => setCategory(e.target.value)} /><br/><br/>
            { onEdit ?
              <button type='submit' style={{border: '2px solid transparent', backgroundColor: '#91C355', borderRadius: '5px', padding: '10px 50px 10px 50px', alignItems: 'left' }} > Edit Category </button>
              :
              <button type='submit' style={{border: '2px solid transparent', backgroundColor: '#91C355', borderRadius: '5px', padding: '10px 50px 10px 50px', alignItems: 'left' }} > Add Category </button>
            }
        </form>
        <div className='col'>
          {
            categories.map(category =>(
              <div className='row' key={category._id}>
                  <p>{category.name}</p>
                  <div className='row-icon'>
                    <button onClick={()=>editCategory(category._id, category.name)}>
                      <img src={Edit} alt='edit'style={{width: '20px', height: '20px'}}/> 
                    </button>
                    <button onClick={()=>deleteCategory(category._id)}>
                    <img src={Delete} alt='delete' style={{width: '20px', height: '20px', marginLeft: '20px'}}/> 
                    </button>
                  </div>
              </div>
            ))
          }

        </div>
    </div>
  )
}

export default Categories
