import MainBtn from '../mainBtn/MainBtn';
import './styles.css'

import card1 from './../../sources/images/mainPage/cardImage1.png'
import card2 from './../../sources/images/mainPage/cardImage2.png'
import card3 from './../../sources/images/mainPage/cardImage3.png'
import card4 from './../../sources/images/mainPage/cardImage4.png'

import illustration from './../../sources/images/mainPage/Illustration.svg'
import check from './../../sources/images/mainPage/check.svg'

const CardBanner = () => {
    return (
        <section>
            <div className='banner'>
                <h1 className='banner__title'>Choose the design you like and apply for card right now</h1>
                <div className="main-btn">
                    <MainBtn title='Choose the card' />
                </div>

                <div className="banner__grid">
                    <img className='grid__image' src={card1} alt="img" />
                    <img className='grid__image' src={card2} alt="img" />
                    <img className='grid__image' src={card3} alt="img" />
                    <img className='grid__image' src={card4} alt="img" />
                </div>
            </div>

            <div className='options'>
                <img className='options__image' src={illustration} alt="illustration" />
                <h2 className='options__subtitle'>We Provide Many Features You Can Use</h2>
                <h3 className="options__desc">You can explore the features that we provide with fun and have their own functions each feature</h3>
                <ul className="options__list">
                    <li className="options__item">
                        <img src={check} alt="check" />
                        <div className="item__text">Powerfull online protection.</div>
                    </li>
                    <li className="options__item">
                        <img src={check} alt="check" />
                        <div className="item__text">Cashback without borders.</div>
                    </li>
                    <li className="options__item">
                        <img src={check} alt="check" />
                        <div className="item__text">Personal design</div>
                    </li>
                    <li className="options__item">
                        <img src={check} alt="check" />
                        <div className="item__text">Work anywhere in the world</div>
                    </li>
                </ul>
            </div>


        </section>
    );
}
export default CardBanner;