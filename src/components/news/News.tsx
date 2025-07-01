import { useState, useEffect, useCallback } from "react";
import "./styles.css";
import MainBtn from "../mainBtn/MainBtn";
import { oldNewsArray } from "@/src/mock/oldNewsArray";
import { useGetNews } from "@/src/hooks/useGetNews";
import NewsSlider from "../newsSlider/NewsSlider";
import { NewsNavigation } from "../newsNavigation/NewsNavigation";
import { INews } from "@/src/types/types";

const News = () => {
  const [offset, setOffset] = useState(0);
  const { data, error } = useGetNews();
  const [isError, setIsError] = useState<Error | undefined>(error);
  const [newsArray, setNewsArray] = useState<INews[]>([]);
  const itemWidth = 360;

  useEffect(() => {
    setIsError(error);
    if (data) setNewsArray(data);
  }, [data, error]);

  const showOldNews = () => {
    setNewsArray(oldNewsArray);
    setIsError(undefined);
  };

  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      setOffset((prev) => {
        const visibleItems = Math.max(
          1,
          Math.floor(window.innerWidth / itemWidth)
        );
        const maxOffset = -(newsArray.length - visibleItems) * itemWidth;

        if (direction === "prev") {
          return Math.min(0, prev + itemWidth);
        } else {
          return Math.max(maxOffset, prev - itemWidth);
        }
      });
    },
    [itemWidth, newsArray.length]
  );

  if (isError) {
    return (
      <section className="news">
        <h2 className="news__title">Current news from the world of finance</h2>
        <div className="news__alert">
          Failed to fetch actual news
          <div onClick={showOldNews}>
            <MainBtn title="Show latest news" />
          </div>
        </div>
      </section>
    );
  }

  if (!newsArray.length) {
    return <section className="news">loading...</section>;
  }

  return (
    <section className="news">
      <h2 className="news__title">Current news from the world of finance</h2>
      <h3 className="news__subtitle">
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </h3>

      <div className="carousel">
        <NewsSlider offset={offset} newsArray={newsArray} />
        <NewsNavigation
          currentIndex={offset}
          itemsCount={newsArray.length}
          onNavigate={handleNavigate}
          itemWidth={itemWidth}
        />
      </div>
    </section>
  );
};
export default News;
