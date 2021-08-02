import React, {useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom'
import FilterCategory from './news/FilterCategory';

import "../styles/header.scss"

const Header = () => {

    const location = useLocation();

    const activeStyle = {
        background: 'rgba(196, 196, 196, .3)',
        fontWeight: '700'
    }

    const [isActiveBurger, setIsActiveBurger] = useState(false)

    return (
        <header className={isActiveBurger?'active':''}>
            <div className="header__inner">
                <div className={
                    isActiveBurger?
                    'burger active'
                    :
                    'burger'
                } onClick={()=>setIsActiveBurger(!isActiveBurger)}>
                    <span className='burger__el top'></span>
                    <span className='burger__el mid'></span>
                    <span className='burger__el bot'></span>
                </div>
                <div className="logo">
                    <h1 className="logo__title">MyApp</h1>
                </div>
                <nav className={isActiveBurger?'active':''}>
                    <ul className="nav-list">
                        <li className="nav-list__item">
                            <NavLink
                            className='nav-list__link home'
                            to='/'
                            activeStyle={activeStyle}
                            exact
                            onClick={()=>setIsActiveBurger(false)}
                            >Home</NavLink>
                        </li>
                        <li className="nav-list__item">
                            <NavLink
                            className='nav-list__link news'
                            to='/news'
                            activeStyle={activeStyle}
                            onClick={()=>setIsActiveBurger(false)}
                            >News</NavLink>
                        </li>
                    </ul>
                </nav>
                {
                    location.pathname === '/news' ?
                    <FilterCategory />  
                    :
                    null
                }
                                 
            </div>
        </header>
    )
};

export default Header;