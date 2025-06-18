import './styles.css'

import usd from '@images/currency/usd.svg'
import chf from '@images/currency/chf.svg'
import cny from '@images/currency/cny.svg'
import eur from '@images/currency/eur.svg'
import gbp from '@images/currency/gbp.svg'
import jpy from '@images/currency/jpy.svg'
import bankIcon from '@images/currency/bank.svg';
import { useEffect, useState } from 'react'
import { useGetCurrency } from '@/src/hooks/useGetCurrency'
import { ICurrency, IImage } from '@/src/types/types'

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
    const { data, loading, error } = useGetCurrency('https://api.currencyapi.com/v3/latest?apikey=123', process.env.REACT_APP_CURRENCY_APIKEY)
    const [convertedData, setConvertedData] = useState<any[]>([]);

    useEffect(() => {
        if (data) {

            const roubleCourse = Number(data.RUB?.value.toFixed(3));
            const newData = imgArray.map((item) => ({
                img: item.img,
                name: data[item.code.toUpperCase()]?.code || item.code,
                value: +(roubleCourse / data[item.code.toUpperCase()]?.value).toFixed(2),
            }));
            setConvertedData(newData);
        }
    }, [data, error, loading]);

    return (
        <div className="converter">
            <div className="left">
                <div className="converter__title">Exchange rate in Internet bank</div>
                <div className="converter__subtitle">Currency</div>
                {error ? <div className="converter__alert">Failed to fetch actual currency</div> :
                    <ul className="currency__list">
                        {convertedData.map((item: ICurrency) => {
                            return (
                                <li key={item.name} className="currency__item">
                                    <img src={item.img} alt="itemImage" className="item__image" />
                                    <div id="usdName" className="item__name">{item.name}:</div>
                                    <div id="usd" className="item__value">{item.value}</div>
                                </li>
                            )
                        })}

                    </ul>}
            </div>

            <div className="right">
                <div className="right__meta">
                    Update every 15 minutes
                    <div id="metaDate"></div>
                </div>
                <img src={bankIcon} alt="bank" className="right__photo" />
            </div>
        </div>
    )
}

export default Currency;