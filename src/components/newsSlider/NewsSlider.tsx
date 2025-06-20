import './styles.css';
import { INews } from '@/src/types/types';
import NewsItem from '../newsItem/NewsItem';

interface Props {
    leftScroll: number;
    newsArray: INews[];
}

const NewsSlider: React.FC<Props> = ({ leftScroll, newsArray }) => {
    return (
        <ul style={{ marginLeft: `${leftScroll}px` }} className="news__slider">
            {newsArray.map((item: INews, index: number) => {
                return <NewsItem key={index} item={item} />;
            })}
        </ul>
    );
};
export default NewsSlider;
