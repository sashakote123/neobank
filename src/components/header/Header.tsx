import MainBtn from '../mainBtn/MainBtn';
import './styles.css'

import logo from './../../sources/images/header/NeoBank.svg'
import { Link, NavLink } from 'react-router';

type active = {
    isActive: boolean,
}

const Header = () => {

    const setActive = ({ isActive }: active) => isActive ? 'active-link' : '';

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
                <MainBtn title='Online Bank' />
            </header>
        </div>

    );
}
export default Header;