import MainBtn from '../mainBtn/MainBtn';
import './styles.css'

import card1 from './../../sources/images/mainPage/cardImage1.png'
import card2 from './../../sources/images/mainPage/cardImage2.png'
import card3 from './../../sources/images/mainPage/cardImage3.png'
import card4 from './../../sources/images/mainPage/cardImage4.png'

import illustration from './../../sources/images/mainPage/Illustration.svg'
import OptionsListItem from '../optionsListItem/OptionsListItem';


const optionsArray: string[] = ['Powerfull online protection.', 'Cashback without borders.', 'Personal design.', 'Work anywhere in the world.']
const imagesArray: string[] = [card1, card2, card3, card4]

const CardBanner = () => {
    return (
        <section>
            <div className='banner'>
                <h1 className='banner__title'>Choose the design you like and apply for card right now</h1>
                <div className="main-btn">
                    <MainBtn title='Choose the card' />
                </div>

                <div className="banner__grid">
                    {imagesArray.map((item: string) => {
                        return <img key={item} className='grid__image' src={item} alt="img" />
                    })}
                </div>
            </div>

            <div className='options'>
                <img className='options__image' src={illustration} alt="illustration" />
                <h2 className='options__subtitle'>We Provide Many Features You Can Use</h2>
                <h3 className="options__desc">You can explore the features that we provide with fun and have their own functions each feature</h3>
                <ul className="options__list">
                    {optionsArray.map((item: string) => <OptionsListItem key={item} text={item} />)}
                </ul>
            </div>


        </section>
    );
}
export default CardBanner;