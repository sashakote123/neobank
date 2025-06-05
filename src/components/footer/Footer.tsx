import './styles.css'
import logo from './../../sources/images/footer/footerLogo.svg'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__heading">
                    <img src={logo} alt="" className="footer__logo" />
                    <div className="footer__contacts">
                        <div className="contacts__number">
                            +7 (495) 984 25 13
                        </div>
                        <div className="contacts__mail">
                            info@neoflex.ru
                        </div>
                    </div>
                </div>
                <ul className="footer__links">
                    <li className="links__item">About bank</li>
                    <li className="links__item">Ask a Question</li>
                    <li className="links__item">Quality of service</li>
                    <li className="links__item">Requisites</li>
                    <li className="links__item">Press center</li>
                    <li className="links__item">Bank career</li>
                    <li className="links__item">Investors</li>
                    <li className="links__item">Analytics</li>
                    <li className="links__item">Business and processes</li>
                    <li className="links__item">Compliance and business ethics</li>
                </ul>
                <div className="footer__alert">
                    We use cookies to personalize our services and improve the user experience of our website. Cookies are small files containing information about previous visits to a website. If you do not want to use cookies, please change your browser settings
                </div>
            </div>
        </footer>

    );
}
export default Footer;