import React, { Dispatch, useRef, useState } from "react";
import styles from "./styles.module.css";
import { IQuestion } from "./types";

import open from "./assets/open.svg";

interface Props {
  question: IQuestion;
  isOpen: boolean;
  onToggle: () => void;
}

const QuestionItem: React.FC<Props> = ({ question, isOpen, onToggle }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const fullHeight = itemRef.current?.scrollHeight || 0;

  return (
    <li
      ref={itemRef}
      className={styles.listItem}
      style={{
        height: isOpen ? `${fullHeight}px` : "84px",
        transition: "height 0.3s ease",
        overflow: "hidden",
      }}
    >
      <div className={styles.heading}>
        <div className={styles.itemQuestion}>{question.question}</div>
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
