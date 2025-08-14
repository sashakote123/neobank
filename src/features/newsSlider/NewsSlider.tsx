import NewsItem from '@/src/entities/newsItem/NewsItem';
import { INews } from '@/src/shared/types/types';

import './styles.css';

interface Props {
  offset: number;
  newsArray: INews[];
}

const NewsSlider: React.FC<Props> = ({ offset, newsArray }) => {
  return (
    <ul
      data-testid="list"
      style={{ transform: `translateX(${offset}px)` }}
      className="news__slider"
    >
      {newsArray.map((item, index) => (
        <NewsItem key={index} item={item} />
      ))}
    </ul>
  );
};
export default NewsSlider;
