import "./styles.css";
import { INews } from "@/src/types/types";
import NewsItem from "../newsItem/NewsItem";

interface Props {
  offset: number;
  newsArray: INews[];
}

const NewsSlider: React.FC<Props> = ({ offset, newsArray }) => {
  return (
    <ul
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
