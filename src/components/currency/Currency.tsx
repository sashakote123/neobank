import './styles.css'

import usd from './../../sources/images/currency/usd.svg'
import chf from './../../sources/images/currency/chf.svg'
import cny from './../../sources/images/currency/cny.svg'
import eur from './../../sources/images/currency/eur.svg'
import gbp from './../../sources/images/currency/gbp.svg'
import jpy from './../../sources/images/currency/jpy.svg'
import bank from './../../sources/images/currency/bank.svg'
import { useEffect, useState } from 'react'

interface ICurrency {
    img: string,
    name: string,
    value: number,
}

interface IImage {
    img: string,
    code: string
}

const imgArray: IImage[] = [
    {
        img: usd,
        code: 'usd'
    },
    {
        img: chf,
        code: 'chf'
    },
    {
        img: cny,
        code: 'cny'
    },
    {
        img: eur,
        code: 'eur'
    },
    {
        img: jpy,
        code: 'jpy'
    },
    {
        img: gbp,
        code: 'gbp'
    },


]

const Currency = () => {

    const [data, setData] = useState<ICurrency[]>([])

    useEffect(() => {
        fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_7sdww4ZUYaqyAWlAfxyLdw5G76TXj90nsJFNw69e")
            .then(resp => resp.json())
            .then(json => {
                const roubleCource: number = json.data.RUB.value.toFixed(3)
                const newData = imgArray.map((item: IImage) => ({
                    img: item.img,
                    name: json.data[item.code.toUpperCase()]?.code || item.code,
                    value: +(roubleCource / json.data[item.code.toUpperCase()]?.value).toFixed(2),
                }));
                setTimeout(() => setData(newData), 1500);
            })
    }, [])


    return (
        <div className="converter">
            <div className="left">
                <div className="converter__title">Exchange rate in Internet bank</div>
                <div className="converter__subtitle">Currency</div>
                <ul className="currency__list">

                    {data.length !== 0 ? data.map((item: ICurrency) => {
                        return (
                            <li key={item.name} className="currency__item">
                                <img src={item.img} alt="123" className="item__image" />
                                <div id="usdName" className="item__name">{item.name}:</div>
                                <div id="usd" className="item__value">{item.value}</div>
                            </li>
                        )
                    }) : <>loading...</>}

                </ul>
            </div>

            <div className="right">
                <div className="right__meta">
                    Update every 15 minutes
                    <div id="metaDate"></div>
                </div>
                <img src={bank} alt="" className="right__photo" />
            </div>
        </div>
    )

}







export default Currency;