import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    const { categoryList, currentCategory, clearFilter, searchProduct, filterProduct } = props;
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(-1);

    const updateSearchQuery = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length >= 3) {
            searchProduct(e.target.value);
        }
    }

    const clearFilterFn = () => {
        setSearchQuery('');
        setMinPrice(0);
        setMaxPrice(-1);
        clearFilter();
    }

    const updateMinPrice = (e) => {
        setMinPrice(e.target.value);
        filterProduct(e.target.value, maxPrice, searchQuery);
    }

    const updateMaxPrice = (e) => {
        setMaxPrice(e.target.value);
        filterProduct(minPrice, e.target.value, searchQuery);
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
            <div className="price-filter">
                <div className="price-filter-select">
                    <div className="form-group">
                        <select onChange={updateMinPrice} value={minPrice} className="form-select">
                            <option value="0">0</option>
                            <option value="1000">1000</option>
                            <option value="2000">2000</option>
                            <option value="5000">5000</option>
                            <option value="10000">10000</option>
                            <option value="20000">20000</option>
                            <option value="50000">50000</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select onChange={updateMaxPrice} value={maxPrice} className="form-select">
                            {
                                minPrice < 1000 && <option value="1000">1000</option>
                            }
                            {
                                minPrice < 2000 && <option value="2000">2000</option>
                            }
                            {
                                minPrice < 5000 && <option value="5000">5000</option>
                            }
                            {
                                minPrice < 10000 && <option value="10000">10000</option>
                            }
                            {
                                minPrice < 20000 && <option value="20000">20000</option>
                            }
                            {
                                minPrice < 50000 && <option value="50000">50000</option>
                            }
                            <option value="-1">100000+</option>
                        </select>
                    </div>
                </div>
                <div className="price-filter-title">
                    <div>Min Price</div>
                    <div>Max Price</div>
                </div>
            </div>
            <div className="btn btn-primary clear-filter" onClick={clearFilterFn}> Clear All Filters</div>
        </div>
    )
}

export default Sidebar;
