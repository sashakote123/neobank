import { useState } from "react";
import styles from "./styles.module.css";
import { IQuestion, ISection } from "./types";
import QuestionItem from "@/src/entities/questionItem/QuestionItem";

const questionsArray: ISection[] = [
  {
    sectionTitle: "Issuing and receiving a card",
    questions: [
      {
        question: "How to get a card?",
        answer:
          "We will deliver your card by courier free of charge. Delivery in Moscow and St. Petersburg - 1-2 working days. For other regions of the Russian Federation - 2-5 working days.",
      },
      {
        question:
          "What documents are needed and how old should one be to get a card?",
        answer: "Need a passport. You must be between 20 and 70 years old.",
      },
      {
        question: "In what currency can I issue a card?",
        answer: "In rubles, dollars or euro",
      },
      {
        question: "How much income do I need to get a credit card?",
        answer:
          "To obtain a credit card, you will need an income of at least 25,000 rubles per month after taxes.",
      },
      {
        question:
          "How do I find out about the bank's decision on my application?",
        answer:
          "After registration, you will receive an e-mail with a decision on your application.",
      },
    ],
  },
  {
    sectionTitle: "Using a credit card",
    questions: [
      {
        question: "What is an interest free credit card?",
        answer:
          "A credit card with a grace period is a bank card with an established credit limit, designed for payment, reservation of goods and services, as well as for receiving cash, which allows you to use credit funds free of charge for a certain period.",
      },
      {
        question: "How to activate a credit card",
        answer:
          "You can activate your credit card and generate a PIN code immediately after receiving the card at a bank branch using a PIN pad.",
      },
      {
        question: "What is a settlement date?",
        answer:
          "The settlement date is the date from which you can pay off the debt for the reporting period. The settlement date falls on the first calendar day following the last day of the reporting period. The first settlement date is reported by the bank when transferring the issued credit card to the client, and then in the monthly account statement.",
      },
      {
        question: "What do I need to know about interest rates?",
        answer:
          "For each reporting period from the 7th day of the previous month to the 6th day of the current month inclusive, a statement is generated for the credit card. The statement contains information on the amount and timing of the minimum payment, as well as the total amount of debt as of the date of issue.",
      },
    ],
  },
];

const Questions = () => {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const handleToggle = (question: string) => {
    setOpenQuestion((prev) => (prev === question ? null : question));
  };

  return (
    <section className={styles.container}>
      <ul className={styles.questionsList}>
        {questionsArray.map((item: ISection) => {
          return (
            <li key={item.sectionTitle}>
              <h4 className={styles.sectionTitle}>{item.sectionTitle}</h4>
              <ul>
                {item.questions.map((question: IQuestion) => {
                  return (
                    <QuestionItem
                      key={question.question}
                      question={question}
                      isOpen={openQuestion === question.question}
                      onToggle={() => handleToggle(question.question)}
                    />
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Questions;
