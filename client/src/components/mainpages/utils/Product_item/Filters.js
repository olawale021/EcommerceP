import React, {useContext} from 'react'
import {GlobalState} from '../../../../GlobalState'
import "./Filter.css"

function Filters() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.ProductsAPI.products
    const [category, setCategory] = state.ProductsAPI.category
    const [categories] = state.categoriesAPI.categories
    const [sort, setSort] = state.ProductsAPI.sort
    const [search, setSearch] = state.ProductsAPI.search
    const [page, setPage] = state.ProductsAPI.page
    const [result, setResult] = state.ProductsAPI.result


    const handleCategory = (e) => {
        setCategory(e.target.value)
    }
  return (
    <div className='filter-menu'>
        <div className='row'>
            <span>Filters:</span>
            <select name='category' value={category} onChange={handleCategory}>
                <option value="">All Products</option>
                {
                    categories.map(category => (
                        <option value={"category=" + category._id} key={category._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </div>
            <input type='text' value={search} placeholder='Search'
            onChange={e => setSearch(e.target.value.toLowerCase())}/>

        <div className='row'>
                    <span>Sort:</span>
                    <select value={sort} onChange={e =>setSort(e.target.value)}>
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best Sales</option>
                    <option value="sort=-price">Price: High-Low</option>
                    <option value="sort=price">Price: Low-High</option>
                    </select>
                </div>
    </div>
  )
}

export default Filters
