import styles from "./styles.module.css";

const stepsArray: string[] = [
  "Fill out an online application - you do not need to visit the bank",
  "Find out the bank's decision immediately after filling out the application",
  "The bank will deliver the card free of charge, wherever convenient, to your city",
];

const GetCard = () => {
  return (
    <section data-testid="getCard" className={styles.container}>
      <h2 data-testid="title" className={styles.sectionTitle}>
        How to get a card
      </h2>
      <ul data-testid="list" className={styles.steps}>
        {stepsArray.map((item: string, index: number) => {
          return (
            <li data-testid="listitem" className={styles.step} key={item}>
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
