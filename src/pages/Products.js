import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';

const Products = () => {
    const [auth] = useContext(AuthContext);
    const history = useHistory();

    if(!auth){
        history.push('/login');
    }

    return (
    <h1>Products</h1>
    );
};

export default Products;