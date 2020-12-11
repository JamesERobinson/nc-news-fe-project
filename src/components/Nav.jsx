import React from 'react';
import { Link } from '@reach/router';
const Nav = () => {
    return (
        <nav className='nav'>
            <Link to ='/'>
            <button className='nav-home-button'>Home</button>
            </Link>
        </nav>
    );
};

export default Nav;