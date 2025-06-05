import './styles.css'

import img1 from './../../sources/images/news/demo1.jpg'
import left from './../../sources/images/news/left.svg'
import right from './../../sources/images/news/right.svg'

const News = () => {
    return (
        <section className='news'>
            <h2 className="news__title">Current news from the world of finance</h2>
            <h3 className="news__subtitle">We update the news feed every 15 minutes. You can learn more by clicking on the news you are interested in.

            </h3>
            <ul className="news__slider">
                <li className="slider__item">
                    <img src={img1} alt="img" />
                    <div className="item__title">Ethereum just pulled off its
                        final test run ahead of one
                        of the most important
                        events in crypto - CN</div>
                    <div className="item__subtitle">Ethereum is moving closer to
                        adopting a proof-of-stake model
                        for its network, which is less
                        energy i</div>
                </li>

                <li className="slider__item">
                    <img src={img1} alt="img" />
                    <div className="item__title">Ethereum just pulled off its
                        final test run ahead of one
                        of the most important
                        events in crypto - CN</div>
                    <div className="item__subtitle">Ethereum is moving closer to
                        adopting a proof-of-stake model
                        for its network, which is less
                        energy i</div>
                </li>

                <li className="slider__item">
                    <img src={img1} alt="img" />
                    <div className="item__title">Ethereum just pulled off its
                        final test run ahead of one
                        of the most important
                        events in crypto - CN</div>
                    <div className="item__subtitle">Ethereum is moving closer to
                        adopting a proof-of-stake model
                        for its network, which is less
                        energy i</div>
                </li>

                <li className="slider__item">
                    <img src={img1} alt="img" />
                    <div className="item__title">Ethereum just pulled off its
                        final test run ahead of one
                        of the most important
                        events in crypto - CN</div>
                    <div className="item__subtitle">Ethereum is moving closer to
                        adopting a proof-of-stake model
                        for its network, which is less
                        energy i</div>
                </li>
            </ul>
            <div className="news__buttons">
                <div className="buttons__button">
                    <img src={left} alt="left" />
                </div>
                <div className="buttons__button">
                    <img src={right} alt="right" />
                </div>
            </div>
        </section>
    );
}
export default News;