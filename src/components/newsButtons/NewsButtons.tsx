import { useState } from 'react'
import './styles.css'

import left from './../../sources/images/news/left.svg'
import right from './../../sources/images/news/right.svg'

import leftend from './../../sources/images/news/left-end.svg'
import rightend from './../../sources/images/news/right-end.svg'
import { INews } from '../../types/types'

interface Props {
    setLeftScroll: (prev:React.SetStateAction<number>) => void,
    newsArray: INews[] | undefined
}

const NewsButtons: React.FC<Props> = ({ newsArray, setLeftScroll }) => {

    const [showed, setShowed] = useState(Math.trunc(window.screen.width / 360))

    const [leftEnd, setLeftEnd] = useState<boolean>(true)
    const [rightEnd, setRightEnd] = useState<boolean>(false)

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


    return (
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
    );
}
export default NewsButtons;