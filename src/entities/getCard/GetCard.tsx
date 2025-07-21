import styles from "./styles.module.css";

const stepsArray: string[] = [
  "Fill out an online application - you do not need to visit the bank",
  "Find out the bank's decision immediately after filling out the application",
  "The bank will deliver the card free of charge, wherever convenient, to your city",
];

const GetCard = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>How to get a card</h2>
      <ul className={styles.steps}>
        {stepsArray.map((item: string, index: number) => {
          return (
            <li className={styles.step} key={item}>
              <div className={styles.stepIndex}>{index + 1}</div>
              <div className={styles.stepText}>{item}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default GetCard;
