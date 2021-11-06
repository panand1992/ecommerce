import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    const { categoryList, currentCategory, clearFilter, searchProduct } = props;
    const [searchQuery, setSearchQuery] = useState('');

    const updateSearchQuery = (e) => {
        setSearchQuery(e.target.value);
        if(e.target.value.length >= 3) {
            searchProduct(e.target.value);
        }
    }

    const clearFilterFn = () => {
        setSearchQuery('');
        clearFilter();
    }

    return (
        <div className="product-list-sidebar">
            <div className="sidebar-title">Search</div>
            <div className="sidebar-search form-group">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="form-control"
                    value={searchQuery}
                    onChange={updateSearchQuery}
                />
            </div>
            <div className="sidebar-title">Categories</div>
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
            <div className="sidebar-title">Filter by Price</div>
            <div className="btn btn-primary clear-filter" onClick={clearFilterFn}> Clear All Filters</div>
        </div>
    )
}

export default Sidebar;
