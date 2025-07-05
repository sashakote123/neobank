import { useState } from "react";
import "./styles.css";

import MainBtn from "../../shared/mainBtn/MainBtn";
import logo from "@images/header/NeoBank.svg";
import burger from "@images/header/burger.svg";
import { Link, NavLink } from "react-router";
import SideMenu from "../sideMenu/SideMenu";
import { ILink } from "@/src/shared/types/types";
import clsx from "clsx";

type active = {
  isActive: boolean;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const setActive = ({ isActive }: active) => clsx({ "active-link": isActive });

  const menuHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const linksArray: ILink[] = [
    { to: "/card", text: "Credit card" },
    { to: "/product", text: "Product" },
    { to: "/account", text: "Account" },
    { to: "/resoures", text: "Resoures" },
  ];

  return (
    <div className="container">
      <header className="header">
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </NavLink>
        <nav className="header__nav">
          <ul className="nav__list">
            {linksArray.map((item: ILink) => {
              return (
                <li key={item.text} className="list__item">
                  <NavLink className={setActive} to={item.to}>
                    {item.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="header__buttons">
          <MainBtn title="Online Bank" />
          {!isOpen ? (
            <img
              onClick={menuHandler}
              className="btn-burger"
              src={burger}
              alt="burger"
            />
          ) : null}
        </div>
        {isOpen ? <SideMenu handler={menuHandler} /> : null}
      </header>
    </div>
  );
};
export default Header;
