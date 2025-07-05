import { PointerEvent, useRef, useState } from "react";
import styles from "./styles.module.css";

interface Props {
  minAmount: number;
  maxAmount: number;
}

const SelectAmount: React.FC<Props> = ({ minAmount, maxAmount }) => {
  const [current, setCurrent] = useState<number>(15000);

  const [currentPosition, setCurrentPosition] = useState<number>(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const dragndropHandler = (event: PointerEvent<HTMLDivElement>) => {};

  return (
    <div className={styles.amount}>
      <h3 className={styles.amountTitle}>Select amount</h3>
      <div className={styles.amountSlider}>
        <div className={styles.sliderCurrent}>{current}</div>
        <div ref={sliderRef} className={styles.sliderLine}>
          <div
            ref={thumbRef}
            onPointerDown={(e) => dragndropHandler(e)}
            className={styles.btn}
            style={{ transform: `translateX(${currentPosition}px)` }}
          ></div>
          <div className={styles.texts}>
            <div className={styles.lineText}>{minAmount}</div>
            <div className={styles.lineText}>{maxAmount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectAmount;
