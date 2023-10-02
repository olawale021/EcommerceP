import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';
import ProductAPI from './api/ProductAPI';
import UserAPI from './api/UserAPI';
import CategoriesAPI from './api/CategoriesAPI';




export const GlobalState = createContext();

// Create a component named 'DataProvider' that will provide the context value to its children
export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)
    const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token')
        setToken(res.data.accessToken)
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        console.log(firstLogin)
        if(firstLogin) refreshToken()
    }, [])

    ProductAPI()

    const state = {
        token: [token, setToken],
        ProductsAPI : ProductAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(token)
    }
    return (
         // Wrap the children components in the 'GlobalState.Provider'
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}