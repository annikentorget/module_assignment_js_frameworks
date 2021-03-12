const Item = props => {
    const { title, description, image_url, price } = props;
    return (
        <div className='product'>
            <h2 className='product__title'>{title}</h2>
            <img className='product__image' src={image_url} alt={title} />
            <h3 className='product__price'>{price}</h3>
            <p className='product__description'>{description}</p>
        </div>
    );
};

export default Item;