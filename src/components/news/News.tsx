import './styles.css'

import img1 from './../../sources/images/news/demo1.jpg'
import left from './../../sources/images/news/left.svg'
import right from './../../sources/images/news/right.svg'

import leftend from './../../sources/images/news/left-end.svg'
import rightend from './../../sources/images/news/right-end.svg'

import { useEffect, useState } from 'react'
import MainBtn from '../mainBtn/MainBtn'
import { oldNewsArray } from '../../mock/oldNewsArray'

interface INews {
    urlToImage: string,
    url: string,
    title: string,
    description: string,
}



const News = () => {
    const [leftScroll, setLeftScroll] = useState(1)
    const [showed, setShowed] = useState(Math.trunc(window.screen.width / 360))

    const [leftEnd, setLeftEnd] = useState<boolean>(true)
    const [rightEnd, setRightEnd] = useState<boolean>(false)

    const [newsArray, setNewsArray] = useState<INews[]>()

    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=abaaefa084a84cae8fccaa669d4e55b6')
            .then(resp => resp.json())
            .then(json => setNewsArray(json.articles.slice(0, 10)))
            .catch(err => setError(true))
    }, [])


    const leftHandler = () => {
        if (showed === Math.trunc(window.screen.width / 360)) { setLeftEnd(true); return }
        setLeftScroll(prev => prev + 400)
        setShowed(showed - 1);
        setLeftEnd(false)
        setRightEnd(false)
    }

    const rightHandler = () => {

        if (newsArray?.length && showed === newsArray.length + 1) { setRightEnd(true); return }
        setLeftScroll(prev => prev - 400)
        setShowed(showed + 1);
        setLeftEnd(false)
        setRightEnd(false)
    }

    const showOldNews = () => {
        setError(false)
        setNewsArray(oldNewsArray)
    }

    return (
        <section className='news'>
            <h2 className="news__title">Current news from the world of finance</h2>
            <h3 className="news__subtitle">We update the news feed every 15 minutes. You can learn more by clicking on the news you are interested in.

            </h3>
            {error ? <div className='news__alert'>
                Failed to fetch actual news
                <div onClick={showOldNews}>
                    <MainBtn title='Show latest news' />
                </div>

            </div> :
                newsArray ? <div className='carousel'>
                    <ul style={{ marginLeft: `${leftScroll}px` }} className="news__slider">
                        {newsArray.map((item: INews, index: number) => {
                            return (
                                <li key={index} className="slider__item">
                                    {item.urlToImage ? <img
                                        src={item.urlToImage}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = img1;
                                        }}
                                        className='slider__image' alt="img" /> :
                                        <img src={img1} className='slider__image' alt="img" />}
                                    <a href={item.url} className="item__title">{item.title}</a>
                                    <div className="item__subtitle">{item.description}</div>
                                </li>
                            )
                        })}

                    </ul>
                </div > : <>loading...</>}


            <div className="news__buttons">
                {!leftEnd ? <div onClick={leftHandler} className="buttons__button-end">
                    <img src={leftend} alt="left" />
                </div> :
                    <div onClick={leftHandler} className="buttons__button">
                        <img src={left} alt="left" />
                    </div>}

                {!rightEnd ? <div onClick={rightHandler} className="buttons__button-end">
                    <img src={rightend} alt="right" />
                </div> :
                    <div onClick={rightHandler} className="buttons__button">
                        <img src={right} alt="right" />
                    </div>}
            </div>
        </section >
    );
}
export default News;