import React, { useEffect } from 'react';

import CategoryItem from './CategoryItem.jsx';
import "../../../styles/categories.scss";

function CategoryList(props) {
    const { fetchCategories, categoryList } = props;

    console.log(categoryList);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <div className="category-list">
                {
                    categoryList.length > 0 && categoryList.map((category) => (
                        <CategoryItem
                            key={category.categoryId}
                            categoryId={category.categoryId}
                            categoryName={category.name}
                        />
                    ))
                }
            </div>
            <div className="category-title">Select a category to start shopping</div>
        </>
    )
}

export default CategoryList;
