import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    const { categoryList, currentCategory } = props;

    return (
        <div className="product-list-sidebar">
            {
                categoryList.length > 0 && categoryList.map((category) => (
                    <Link
                        key={category.categoryId}
                        to={`/products?categoryId=${btoa(category.categoryId)}`}
                        className={category.categoryId == currentCategory ? 'active' : undefined}
                    >
                        {category.name}
                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar;
