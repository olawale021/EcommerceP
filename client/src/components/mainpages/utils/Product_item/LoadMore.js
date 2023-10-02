import React, {useContext} from 'react'
import {GlobalState} from '../../../../GlobalState'
import "./Filter.css"

function LoadMore() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.ProductsAPI.products
    const [category, setCategory] = state.ProductsAPI.category
    const [categories] = state.categoriesAPI.categories
    const [sort, setSort] = state.ProductsAPI.sort
    const [search, setSearch] = state.ProductsAPI.search
    const [page, setPage] = state.ProductsAPI.page
    const [result, setResult] = state.ProductsAPI.result
  return (
    <div className='load-more'>
      {
        result < page * 9 ? ""
        : <button onClick={()=>setPage(page + 1)}>Load More</button>
      }
    </div>
  )
}

export default LoadMore
