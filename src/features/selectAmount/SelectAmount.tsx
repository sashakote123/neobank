import { ChangeEvent, PointerEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { getCurrent, getPosition } from "./functions";
import { useFormContext } from "react-hook-form";
import { IFormFields } from "@/src/shared/types/types";

interface Props {
  minAmount: number;
  maxAmount: number;
}

const SelectAmount: React.FC<Props> = ({ minAmount, maxAmount }) => {
  const { register, setValue } = useFormContext<IFormFields>();

  const [current, setCurrent] = useState<number>(minAmount);
  const [currentPosition, setCurrentPosition] = useState<number>(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const dragndropHandler = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!thumbRef.current || !sliderRef.current) return;

    const sliderRect = thumbRef.current.getBoundingClientRect();
    const sliderX = sliderRect.left;

    const startX = event.clientX - sliderX;

    const handleMouseMove = (e: PointerEvent) => {
      if (!sliderRef.current) return;

      let newPos =
        e.clientX - startX - sliderRef.current.getBoundingClientRect().left;

      if (newPos <= 0) {
        setCurrentPosition(0);
        setCurrent(minAmount);
      } else if (newPos >= sliderRef.current.clientWidth - 24) {
        setCurrent(maxAmount);
        setCurrentPosition(sliderRef.current.clientWidth - 24);
      } else {
        setCurrentPosition(newPos);
        setCurrent(
          getCurrent(
            newPos,
            sliderRef.current.clientWidth,
            maxAmount,
            minAmount
          )
        );
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener(
        "pointermove",
        handleMouseMove as unknown as EventListener
      );
      document.removeEventListener("pointerup", handleMouseUp as EventListener);
    };

    document.addEventListener(
      "pointermove",
      handleMouseMove as unknown as EventListener
    );
    document.addEventListener("pointerup", handleMouseUp as EventListener);
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    if (!sliderRef.current) return;
    setCurrent(+e.target.value);
    setCurrentPosition(
      getPosition(
        +e.target.value,
        sliderRef.current.clientWidth,
        maxAmount,
        minAmount
      )
    );
  };

  useEffect(() => {
    setValue("amount", current);
  }, [current, setValue]);

  return (
    <div className={styles.amount}>
      <h3 className={styles.amountTitle}>Select amount</h3>
      <div className={styles.amountSlider}>
        <input
          {...register("amount")}
          value={current}
          onChange={changeForm}
          type="number"
          className={styles.sliderCurrent}
        />
        <div ref={sliderRef} className={styles.sliderLine}>
          <div
            style={{ width: `${currentPosition}px` }}
            className={styles.coloredLine}
          ></div>
          <div className={styles.line}></div>
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
