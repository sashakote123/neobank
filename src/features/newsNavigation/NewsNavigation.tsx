import "./styles.css";

import leftArrow from "@images/news/left.svg";
import rightArrow from "@images/news/right.svg";
import leftArrowInTheEnd from "@images/news/left-end.svg";
import rightArrowInTheEnd from "@images/news/right-end.svg";
import { NewsNavigationProps } from "@/src/shared/types/types";
import { clsx } from "clsx";

const ArrowButton = ({
  direction,
  isDisabled,
  onNavigate,
}: {
  direction: "prev" | "next";
  isDisabled: boolean;
  onNavigate: (direction: "prev" | "next") => void;
}) => {
  const isPrev = direction === "prev";
  const icon = isDisabled
    ? isPrev
      ? leftArrow
      : rightArrow
    : isPrev
      ? leftArrowInTheEnd
      : rightArrowInTheEnd;

  const buttonClass = clsx("navigation-button", {
    "navigation-button--active": !isDisabled,
  });

  return (
    <button
      data-testid={`${direction}Btn`}
      onClick={() => onNavigate(direction)}
      disabled={isDisabled}
      className={buttonClass}
      aria-label={`Scroll ${direction}`}
    >
      <img
        data-testid={`${direction}Img`}
        className="button__image"
        src={icon}
        alt={direction}
      />
    </button>
  );
};

export const NewsNavigation: React.FC<NewsNavigationProps> = ({
  currentIndex,
  itemsCount,
  onNavigate,
  itemWidth = 400,
  visibleItems,
}) => {
  const isAtStart = currentIndex >= 0;
  const isAtEnd = visibleItems
    ? currentIndex <= -(itemsCount - visibleItems) * itemWidth
    : false;
  return (
    <div data-testid="navContainer" className="news-navigation">
      <ArrowButton
        direction="prev"
        isDisabled={isAtStart}
        onNavigate={onNavigate}
      />
      <ArrowButton
        direction="next"
        isDisabled={isAtEnd}
        onNavigate={onNavigate}
      />
    </div>
  );
};
