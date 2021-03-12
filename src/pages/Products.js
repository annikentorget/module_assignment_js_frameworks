import { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';
import { PRODUCTS_PATH } from '../utils/constants';
import Item from '../components/Item';

const Products = () => {
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [products, setProducts] = useState(null);
    const [render, setRender] = useState();
    const http = useAxios();
    
    useEffect(() => {
        const getProducts = async () => {
            try{
                const response = await http.get(PRODUCTS_PATH);
                console.log(response)
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);

    const deleteProduct = async (id, productTitle) => {
        try {
          const response = await http.delete(`${PRODUCTS_PATH}/${id}`);
          console.log(response);
          alert(`${productTitle} has been deleted.`);
        } catch (error) {
          console.log(error);
        } finally {
          setRender(render + 1);
        }
      };


    if(!auth) {
        history.push('/login');
    }

    if (!products) {
        return <h3>Loading...</h3>;
    }
    return (
        <>
            <h1 className='product__heading'>Products</h1>

            {products.map(product => {
                return (
                    <>
                        <Link key={product.id} to={`/edit/${product.id}`}>
                            <Item {...product} />
                        </Link>
                        <div className='deleteButtonBox'>
                            <button className='deleteButton' onClick={()=> deleteProduct(`${product.id}`, `${product.title}`) }>Delete product</button>
                        </div>
                    </>
                );
            })}
        </>
    );
};

export default Products;