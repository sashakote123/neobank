import { useCallback, useEffect, useRef, useState } from 'react';

import { NewsNavigation } from '@/src/features/newsNavigation/NewsNavigation';
import NewsSlider from '@/src/features/newsSlider/NewsSlider';
import MainBtn from '@/src/shared/mainBtn/MainBtn';
import { oldNewsArray } from '@/src/shared/mock/oldNewsArray';
import { INews } from '@/src/shared/types/types';
import useElementWidth from '@/src/widgets/news/hooks/useElementWidth';
import useGetNews from '@/src/widgets/news/hooks/useGetNews';

import './styles.css';

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
    (direction: 'prev' | 'next') => {
      setOffset((prev) => {
        setVisibleItems(Math.max(1, Math.floor(newsWidth / itemWidth)));
        const maxOffset = -(newsArray.length - visibleItems) * itemWidth;
        if (direction === 'prev') {
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
        <h2 data-testid="errorHeader" className="news__title">
          Current news from the world of finance
        </h2>
        <div data-testid="error" className="news__alert">
          Failed to fetch actual news
          <MainBtn data-testid="button" onClick={showOldNews} title="Show latest news" />
        </div>
      </section>
    );
  }

  if (!newsArray.length) {
    return <section className="news">loading...</section>;
  }

  return (
    <section ref={newsRef} className="news">
      <h2 data-testid="header" className="news__title">
        Current news from the world of finance
      </h2>
      <h3 data-testid="subtitle" className="news__subtitle">
        We update the news feed every 15 minutes. You can learn more by clicking on the news you are
        interested in.
      </h3>

      <div data-testid="carousel" className="carousel">
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
