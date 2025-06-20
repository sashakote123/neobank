import './styles.css';
import { NavLink } from 'react-router';
import burger from '@images/header/burgerlight.svg';
import { ILink } from '@/src/types/types';

type active = {
    isActive: boolean;
};

const linksArray: ILink[] = [
    { to: '/', text: 'Credit card' },
    { to: '/product', text: 'Product' },
    { to: '/account', text: 'Account' },
    { to: '/resoures', text: 'Resoures' },
];

const SideMenu = ({ handler }: { handler: () => void }) => {
    const setActive = ({ isActive }: active) => (isActive ? 'active-link' : '');
    return (
        <nav className="menu__nav">
            <img
                onClick={handler}
                className="side-burger"
                src={burger}
                alt="burger"
            />
            <ul className="menu__list">
                {linksArray.map((item: ILink) => {
                    return (
                        <li key={item.text} className="menu__item">
                            <NavLink className={setActive} to={item.to}>
                                {item.text}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
export default SideMenu;
