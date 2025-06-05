import MainBtn from '../mainBtn/MainBtn';
import './styles.css'

import logo from './../../sources/images/header/NeoBank.svg'
import burger from './../../sources/images/header/burger.svg'
import { Link, NavLink } from 'react-router';
import { useState } from 'react';
import SideMenu from '../sideMenu/SideMenu';

type active = {
    isActive: boolean,
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)


    const setActive = ({ isActive }: active) => isActive ? 'active-link' : '';

    const menuHandler = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <div className="container">
            <header className='header'>
                <img className='header__logo' src={logo} alt="logo" />
                <nav className='header__nav'>
                    <ul className="nav__list">
                        <li className="list__item">
                            <NavLink className={setActive} to='/'>Credit card</NavLink>
                        </li>
                        <li className="list__item">
                            <NavLink className={setActive} to='/product'>Product</NavLink>
                        </li>
                        <li className="list__item">
                            <NavLink className={setActive} to='/account'>Account</NavLink>
                        </li>
                        <li className="list__item">
                            <NavLink className={setActive} to='/resoures'>Resoures</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className='header__buttons'>
                    <MainBtn title='Online Bank' />
                    {!isOpen ? <img onClick={menuHandler} className='btn-burger' src={burger} alt="burger" /> : null}
                    {/* <img onClick={menuHandler} className='btn-burger' src={burger} alt="burger" /> */}
                </div>
                {isOpen ? <SideMenu handler={menuHandler} /> : null}
            </header>
        </div>

    );
}
export default Header;