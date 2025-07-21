import "./styles.css";
import { INews } from "@/src/shared/types/types";
import sliderImage from "@images/news/demo1.jpg";

interface Props {
  item: INews;
}

const NewsItem: React.FC<Props> = ({ item }) => {
  return (
    <li className="slider__item">
      {item.image_url ? (
        <img
          src={item.image_url}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = sliderImage;
          }}
          className="slider__image"
          alt="img"
        />
      ) : (
        <img src={sliderImage} className="slider__image" alt="img" />
      )}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="item__title"
      >
        {item.title}
      </a>
      <div className="item__subtitle">{item.description}</div>
    </li>
  );
};
export default NewsItem;
