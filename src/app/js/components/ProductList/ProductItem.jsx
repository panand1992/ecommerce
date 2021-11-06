import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem(props) {
    const { productName, price, productId } = props;

    return (
        <Link className="product-item" to={`/product/${btoa(productId)}/details`}>
            <div className="product-img">
                <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
            </div>
            <div className="product-name">{productName}</div>
            <div className="product-price">&#8377; {price}</div>
        </Link>
    )
}

export default ProductItem;
