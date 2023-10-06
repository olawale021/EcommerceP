import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from "../../../GlobalState"
import ProductItem from "../utils/Product_item/ProductItem"

function CategoryProducts() {
    const params = useParams(); // Access route parameters
    const state = useContext(GlobalState);
    const [products] = state.ProductsAPI.products;
    const [categoryProducts, setCategoryProducts] = useState([]);

    
    
    useEffect(() => {
        if (params.category) {
            setCategoryProducts(products.filter(product => {
                console.log(product); // Log individual product
                return product.category === params.category;
            }));
        }
    }, [products, params.category]);

    console.log(params.category);
    
    return (
        <div className="category-products-container">
            <h3>Shop Electronics & Gadgets</h3>
            {categoryProducts.map(product => (
                <ProductItem key={product._id} product={product} />
            ))}
        </div>
    );
}

export default CategoryProducts;
