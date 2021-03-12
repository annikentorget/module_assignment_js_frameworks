import { useParams } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { useState, useEffect } from 'react';
import Item from '../components/Item';
import { PRODUCTS_PATH } from '../utils/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../utils/schemas';

const AddProduct = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();
    const http = useAxios();

    const [submitting, setSubmitting] = useState(false)
    const [postError, setPostError] = useState(null)
    const [success, setSucces] = useState(null);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(productSchema)
    });

    const onSubmit = async data => {
        setSubmitting(true);
        setPostError(null);
        console.log(data);
        try {
            const response = await http.post(`${PRODUCTS_PATH}`, data)
            console.log(response)
            setProduct(response.data)
            setSucces(true)
        } catch (error) {
            console.log('error', error)
            setPostError(error.toString())
        } finally {
            setSubmitting(false);
        }
    };

        return (
            <>
                <h2>Add</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
  {postError && <p>{postError}</p>}
  <fieldset disabled={submitting}>
    <div>
      <input
        name='title'
        placeholder='Title'
        ref={register}
      />
      {errors.title && <p>{errors.title.message}</p>}
    </div>

    <div>
      <input
        name='price'
        placeholder='Price'
        ref={register}
        type='number'
      />
      {errors.price && <p>{errors.price.message}</p>}
    </div>
    <div>
      <textarea
        name='description'
        placeholder='Description'
        ref={register}
        type='text'
      />
      {errors.description && <p>{errors.description.message}</p>}
    </div>
    <div>
      <input
        name='image_url'
        placeholder='Image URL'
        ref={register}
        type='text'
      />
      {errors.image_url && <p>{errors.image_url.message}</p>}
    </div>

    <button type='submit'>{submitting ? 'Adding ...' : 'Add'}</button>
  </fieldset>
</form>
{success ? <p>Listing of {product.title} was added</p> : null}
                <Item {...product} />
            </>
        );
};

export default AddProduct;