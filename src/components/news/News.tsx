import { useState, useEffect, useCallback, useRef } from "react";
import "./styles.css";
import MainBtn from "../mainBtn/MainBtn";
import { oldNewsArray } from "@/src/mock/oldNewsArray";
import useGetNews from "@/src/hooks/useGetNews";
import NewsSlider from "../newsSlider/NewsSlider";
import { NewsNavigation } from "../newsNavigation/NewsNavigation";
import { INews } from "@/src/types/types";
import useElementWidth from "@/src/hooks/useElementWidth";

const News = () => {
  const [offset, setOffset] = useState(0);
  const { data, error } = useGetNews();
  const [isError, setIsError] = useState<Error | undefined>(error);
  const [newsArray, setNewsArray] = useState<INews[]>([]);
  const itemWidth = 400;

  const [visibleItems, setVisibleItems] = useState<number>(1);
  const newsRef = useRef<HTMLDivElement>(null);
  const newsWidth = useElementWidth(newsRef);

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
        setVisibleItems(Math.max(1, Math.floor(newsWidth / itemWidth)));
        const maxOffset = -(newsArray.length - visibleItems) * itemWidth;
        if (direction === "prev") {
          return Math.min(0, prev + itemWidth);
        } else {
          return Math.max(maxOffset, prev - itemWidth);
        }
      });
    },
    [newsArray.length, newsWidth, visibleItems]
  );

  if (isError) {
    return (
      <section className="news">
        <h2 className="news__title">Current news from the world of finance</h2>
        <div className="news__alert">
          Failed to fetch actual news
          <MainBtn onClick={showOldNews} title="Show latest news" />
        </div>
      </section>
    );
  }

  if (!newsArray.length) {
    return <section className="news">loading...</section>;
  }

  return (
    <section ref={newsRef} className="news">
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
          visibleItems={visibleItems}
        />
      </div>
    </section>
  );
};
export default News;
