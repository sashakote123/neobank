import { useState, useEffect } from "react";
import "./styles.css";

import leftArrow from "@images/news/left.svg";
import rightArrow from "@images/news/right.svg";
import leftArrowInTheEnd from "@images/news/left-end.svg";
import rightArrowInTheEnd from "@images/news/right-end.svg";
import { NewsNavigationProps } from "@/src/types/types";
import useResize from "@/src/hooks/useResize";

export const NewsNavigation: React.FC<NewsNavigationProps> = ({
  currentIndex,
  itemsCount,
  onNavigate,
  itemWidth = 400,
}) => {
  const { windowWidth } = useResize();

  const visibleItems = Math.max(1, Math.floor(windowWidth / itemWidth));
  const isAtStart = currentIndex >= 0;
  const isAtEnd = currentIndex <= -(itemsCount - visibleItems + 2) * itemWidth;

  const ArrowButton = ({ direction }: { direction: "prev" | "next" }) => {
    const isPrev = direction === "prev";
    const isDisabled = isPrev ? isAtStart : isAtEnd;
    const icon = isDisabled
      ? isPrev
        ? leftArrow
        : rightArrow
      : isPrev
        ? leftArrowInTheEnd
        : rightArrowInTheEnd;

    return (
      <button
        onClick={() => onNavigate(direction)}
        disabled={isDisabled}
        className={`navigation-button ${isDisabled ? "" : "navigation-button--active"}`}
        aria-label={`Scroll ${direction}`}
      >
        <img className="button__image" src={icon} alt={direction} />
      </button>
    );
  };

  return (
    <div className="news-navigation">
      <ArrowButton direction="prev" />
      <ArrowButton direction="next" />
    </div>
  );
};
