import React, { useEffect } from  'react';
import { Link } from 'react-router-dom';

function CategoryItem(props) {
    const { categoryName, categoryId } = props;

    return(
        <div className="category-item">
            <Link to={`/products${categoryId ? `?categoryId=${btoa(categoryId)}` : ''}`}>{categoryName}</Link>
        </div>
    )
}

export default CategoryItem;
