import './styles.css';
import logo from '@images/footer/footerLogo.svg';

const linksArray: string[] = [
    'About bank',
    'Ask a Question',
    'Quality of service',
    'Requisites',
    'Press center',
    'Bank career',
    'Investors',
    'Analytics',
    'Business and processes',
    'Compliance and business ethics',
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__heading">
                    <img src={logo} alt="logo" className="footer__logo" />
                    <div className="footer__contacts">
                        <a href="tel:+74959842513" className="contacts__number">
                            +7 (495) 984 25 13
                        </a>
                        <a
                            href="mailto:info@neoflex.ru"
                            className="contacts__mail"
                        >
                            info@neoflex.ru
                        </a>
                    </div>
                </div>
                <ul className="footer__links">
                    {linksArray.map((item: string) => {
                        return (
                            <li key={item} className="links__item">
                                {item}
                            </li>
                        );
                    })}
                </ul>
                <div className="footer__alert">
                    We use cookies to personalize our services and improve the
                    user experience of our website. Cookies are small files
                    containing information about previous visits to a website.
                    If you do not want to use cookies, please change your
                    browser settings
                </div>
            </div>
        </footer>
    );
};
export default Footer;
