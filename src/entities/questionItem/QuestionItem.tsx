import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { IQuestion } from "./types";

import open from "./assets/open.svg";
import clsx from "clsx";

interface Props {
  question: IQuestion;
  isOpen: boolean;
  onToggle: () => void;
}

const QuestionItem: React.FC<Props> = ({ question, isOpen, onToggle }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const [height, setHeight] = useState(isOpen ? "auto" : "84px");

  useEffect(() => {
    if (isOpen) {
      setHeight(`${itemRef.current?.scrollHeight}px`);
    } else {
      setHeight("84px");
    }
  }, [isOpen]);

  const itemClass = (isOpen: boolean) =>
    clsx(styles.itemQuestion, {
      [styles.clampText]: !isOpen,
    });

  return (
    <li
      ref={itemRef}
      className={styles.listItem}
      style={{
        height,
        transition: "height 0.3s ease",
        overflow: "hidden",
      }}
    >
      <div className={styles.heading}>
        <div className={itemClass(isOpen)}>{question.question}</div>
        <button className={styles.openButton} onClick={onToggle}>
          <img
            src={open}
            alt="open"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>
      </div>
      <div className={styles.itemAnswer}>{question.answer}</div>
    </li>
  );
};
export default QuestionItem;
