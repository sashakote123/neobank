import { useEffect, useState } from "react";
import "./styles.css";
import MainBtn from "../mainBtn/MainBtn";
import { oldNewsArray } from "@/src/mock/oldNewsArray";
import { useGetNews } from "@/src/hooks/useGetNews";
import { INews } from "@/src/types/types";
import NewsButtons from "../newsButtons/NewsButtons";
import NewsSlider from "../newsSlider/NewsSlider";

const News = () => {
  const [leftScroll, setLeftScroll] = useState(1);

  const [isError, setIsError] = useState<boolean>(false);

  const { data, error } = useGetNews();
  const [newsArray, setNewsArray] = useState<INews[]>();

  useEffect(() => {
    setIsError(error);
    if (data) setNewsArray(data.slice(0, 10));
  }, [data, error]);

  const showOldNews = () => {
    setIsError(false);
    setNewsArray(oldNewsArray);
  };

  return (
    <section className="news">
      <h2 className="news__title">Current news from the world of finance</h2>
      <h3 className="news__subtitle">
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </h3>
      {isError ? (
        <div className="news__alert">
          Failed to fetch actual news
          <div onClick={showOldNews}>
            <MainBtn title="Show latest news" />
          </div>
        </div>
      ) : newsArray ? (
        <div className="carousel">
          <NewsSlider leftScroll={leftScroll} newsArray={newsArray} />
        </div>
      ) : (
        <>loading...</>
      )}

      <NewsButtons newsArray={newsArray} setLeftScroll={setLeftScroll} />
    </section>
  );
};
export default News;
