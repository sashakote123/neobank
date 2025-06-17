import { INews } from '../../types/types';
import './styles.css'
import img1 from './../../sources/images/news/demo1.jpg'


interface Props {
    item: INews
}

const NewsItem: React.FC<Props> = ({ item }) => {
    return (
        <li className="slider__item">
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
    );
}
export default NewsItem;