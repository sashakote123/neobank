import { NavLink } from 'react-router';
import './styles.css'
import burger from './../../sources/images/header/burgerlight.svg'


type active = {
    isActive: boolean,
}

const SideMenu = ({ handler }: { handler: () => void }) => {
    const setActive = ({ isActive }: active) => isActive ? 'active-link' : '';
    return (
        <nav className='menu__nav'>
            <img onClick={handler} className='side-burger' src={burger} alt="burger" />
            <ul className="menu__list">
                <li className="menu__item">
                    <NavLink className={setActive} to='/'>Credit card</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink className={setActive} to='/product'>Product</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink className={setActive} to='/account'>Account</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink className={setActive} to='/resoures'>Resoures</NavLink>
                </li>
            </ul>
        </nav>
    );
}
export default SideMenu;