import React from 'react';
import { Link } from 'react-router-dom';

import "../../../styles/vendorSidebar.scss";

function Sidebar(props) {
    const { activeTab } = props;

    return (
        <div className="vendor-sidebar">
            <Link
                to={"/vendor"}
                className={activeTab === 'home' ? 'active' : undefined}
            >
                Home
            </Link>
            <Link
                to={"/vendor/details"}
                className={activeTab === 'vendorDetails' ? 'active' : undefined}
            >
                Vendor Details
            </Link>
            <Link
                to={"/vendor/product/add"}
                className={activeTab === 'addProduct' ? 'active' : undefined}
            >
                Add Product
            </Link>
            <Link
                to={"/vendor/payments"}
                className={activeTab === 'payments' ? 'active' : undefined}
            >
                Payments
            </Link>
        </div>
    )
}

export default Sidebar;
