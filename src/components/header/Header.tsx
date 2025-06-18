import MainBtn from '../mainBtn/MainBtn';
import './styles.css'

import logo from '@images/header/NeoBank.svg'
import burger from '@images/header/burger.svg'
import { NavLink } from 'react-router';
import { useState } from 'react';
import SideMenu from '../sideMenu/SideMenu';
import { ILink } from '@/src/types/types';

type active = {
    isActive: boolean,
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)


    const setActive = ({ isActive }: active) => isActive ? 'active-link' : '';

    const menuHandler = () => {
        setIsOpen(prev => !prev)
    }


    const linksArray: ILink[] = [
        { to: '/', text: 'Credit card' },
        { to: '/product', text: 'Product' },
        { to: '/account', text: 'Account' },
        { to: '/resoures', text: 'Resoures' },
    ]

    return (
        <div className="container">
            <header className='header'>
                <img className='header__logo' src={logo} alt="logo" />
                <nav className='header__nav'>
                    <ul className="nav__list">
                        {linksArray.map((item: ILink) => {
                            return <li key={item.text} className="list__item">
                                <NavLink className={setActive} to={item.to}>{item.text}</NavLink>
                            </li>
                        })}
                    </ul>
                </nav>
                <div className='header__buttons'>
                    <MainBtn title='Online Bank' />
                    {!isOpen ? <img onClick={menuHandler} className='btn-burger' src={burger} alt="burger" /> : null}
                </div>
                {isOpen ? <SideMenu handler={menuHandler} /> : null}
            </header>
        </div>

    );
}
export default Header;