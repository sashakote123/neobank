import './styles.css'

import img1 from './../../sources/images/news/demo1.jpg'
import left from './../../sources/images/news/left.svg'
import right from './../../sources/images/news/right.svg'
import { useRef, useState } from 'react'

interface INews {
    img: string,
    title: string,
    subtitle: string,
}

const newsArray: INews[] = [
    {
        img: img1,
        title: 'Ethereum just pulled off its final test run ahead of one of the most important events in crypto - CN',
        subtitle: 'Ethereum is moving closer to adopting a proof-of-stake model for its network, which is less energy i',
    },
    {
        img: img1,
        title: 'Jim Cramer explains what Wednesday s market action reveals about the state of inflation - CNBC Telev',
        subtitle: 'Jim Cramer explains what Wednesday s market action reveals about the state of inflation - CNBC Telev',
    },
    {
        img: img1,
        title: 'Dow futures tick higher after Wednesday s market rally - CNBC',
        subtitle: 'Dow futures tick higher after Wednesday s market rally - CNBC',
    },
    {
        img: img1,
        title: 'Ethereum just pulled off its final test run ahead of one of the most important events in crypto - CN',
        subtitle: 'Ethereum is moving closer to adopting a proof-of-stake model for its network, which is less energy i',
    },
    {
        img: img1,
        title: 'Dow futures tick higher after Wednesday s market rally - CNBC',
        subtitle: 'Dow futures tick higher after Wednesday s market rally - CNBC',
    },
    {
        img: img1,
        title: 'Ethereum just pulled off its final test run ahead of one of the most important events in crypto - CN',
        subtitle: 'Ethereum is moving closer to adopting a proof-of-stake model for its network, which is less energy i',
    },
    {
        img: img1,
        title: 'Jim Cramer explains what Wednesday s market action reveals about the state of inflation - CNBC Telev',
        subtitle: 'Jim Cramer explains what Wednesday s market action reveals about the state of inflation - CNBC Telev',
    },
    {
        img: img1,
        title: 'Ethereum just pulled off its final test run ahead of one of the most important events in crypto - CN',
        subtitle: 'Ethereum is moving closer to adopting a proof-of-stake model for its network, which is less energy i',
    }
]




const News = () => {
    const [leftScroll, setLeftScroll] = useState(0)
    const [showed, setShowed] = useState(Math.trunc(window.screen.width / 400))



    const leftHandler = () => {
        console.log(Math.trunc(window.screen.width / 360));
        if (showed === Math.trunc(window.screen.width / 360)) return
        setLeftScroll(prev => prev + 400)
        setShowed(showed - 1);
        console.log(showed);
    }

    const rightHandler = () => {

        if (showed === newsArray.length + 1) return
        setLeftScroll(prev => prev - 400)
        setShowed(showed + 1);
        console.log(showed);
    }

    return (
        <section className='news'>
            <h2 className="news__title">Current news from the world of finance</h2>
            <h3 className="news__subtitle">We update the news feed every 15 minutes. You can learn more by clicking on the news you are interested in.

            </h3>
            <div className='carousel'>
                <ul style={{ marginLeft: `${leftScroll}px` }} className="news__slider">
                    {newsArray.map((item: INews, index: number) => {
                        return (
                            <li key={index} className="slider__item">
                                <img src={item.img} alt="img" />
                                <div className="item__title">{item.title}</div>
                                <div className="item__subtitle">{item.subtitle}</div>
                            </li>
                        )
                    })}

                </ul>
            </div>

            <div className="news__buttons">
                <div onClick={leftHandler} className="buttons__button">
                    <img src={left} alt="left" />
                </div>
                <div onClick={rightHandler} className="buttons__button">
                    <img src={right} alt="right" />
                </div>
            </div>
        </section>
    );
}
export default News;