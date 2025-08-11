import { ILink } from "@/src/shared/types/types";
import "./styles.css";
import logo from "@images/footer/footerLogo.svg";

const linksArray: ILink[] = [
  { text: "About bank", to: "!#" },
  { text: "Ask a Question", to: "!#" },
  { text: "Quality of service", to: "!#" },
  { text: "Requisites", to: "!#" },
  { text: "Press center", to: "!#" },
  { text: "Bank career", to: "!#" },
  { text: "Investors", to: "!#" },
  { text: "Analytics", to: "!#" },
  { text: "Business and processes", to: "!#" },
  { text: "Compliance and business ethics", to: "!#" },
];

const Footer: React.FC = () => {
  return (
    <footer data-testid="footer" className="footer">
      <div className="container">
        <div className="footer__heading">
          <img src={logo} alt="logo" className="footer__logo" />
          <div className="footer__contacts">
            <a href="tel:+74959842513" className="contacts__number">
              +7 (495) 984 25 13
            </a>
            <a href="mailto:info@neoflex.ru" className="contacts__mail">
              info@neoflex.ru
            </a>
          </div>
        </div>
        <ul className="footer__links">
          {linksArray.map((item: ILink) => {
            return (
              <li key={item.text} className="links__item">
                <a href={item.to}>{item.text}</a>
              </li>
            );
          })}
        </ul>
        <div className="footer__alert">
          We use cookies to personalize our services and improve the user
          experience of our website. Cookies are small files containing
          information about previous visits to a website. If you do not want to
          use cookies, please change your browser settings
        </div>
      </div>
    </footer>
  );
};
export default Footer;
