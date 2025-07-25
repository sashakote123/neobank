import styles from "./styles.module.css";
import triangle from "./assets/triangle.svg";
import { useState } from "react";

interface ITableRow {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
}

const data: ITableRow[] = [
  {
    number: 0,
    date: "2025-07-24",
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 230500.0,
  },
  {
    number: 1,
    date: "2025-08-24",
    totalPayment: 40339.68,
    interestPayment: 3265.42,
    debtPayment: 37074.26,
    remainingDebt: 193425.74,
  },
  {
    number: 2,
    date: "2025-09-24",
    totalPayment: 40339.68,
    interestPayment: 2740.2,
    debtPayment: 37599.48,
    remainingDebt: 155826.26,
  },
  {
    number: 3,
    date: "2025-10-24",
    totalPayment: 40339.68,
    interestPayment: 2207.54,
    debtPayment: 38132.14,
    remainingDebt: 117694.12,
  },
  {
    number: 4,
    date: "2025-11-24",
    totalPayment: 40339.68,
    interestPayment: 1667.34,
    debtPayment: 38672.34,
    remainingDebt: 79021.78,
  },
  {
    number: 5,
    date: "2025-12-24",
    totalPayment: 40339.68,
    interestPayment: 1119.48,
    debtPayment: 39220.2,
    remainingDebt: 39801.58,
  },
  {
    number: 6,
    date: "2026-01-24",
    totalPayment: 40339.68,
    interestPayment: 563.86,
    debtPayment: 39775.82,
    remainingDebt: 25.76,
  },
];

interface ISortComfig {
  direction: boolean;
  column: keyof ITableRow | null;
}

const Table = () => {
  const [array, setArray] = useState<ITableRow[]>(data);

  const [sortConfig, setSortConfig] = useState<ISortComfig>({
    column: null,
    direction: false,
  });

  const sortArray = (column: keyof ITableRow) => {
    let direction: false | true = false;
    if (sortConfig.column === column)
      direction = sortConfig.direction
        ? (sortConfig.direction = false)
        : (sortConfig.direction = true);

    setSortConfig({ column, direction });

    const sortedTable = [...array].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (direction) {
        if (typeof valueA === "number" && typeof valueB === "number") {
          return valueA - valueB;
        } else if (typeof valueA === "string" && typeof valueB === "string") {
          return Number(new Date(valueA)) - Number(new Date(valueB));
        }
        return 0;
      } else {
        if (typeof valueA === "number" && typeof valueB === "number") {
          return valueB - valueA;
        } else if (typeof valueA === "string" && typeof valueB === "string") {
          return Number(new Date(valueB)) - Number(new Date(valueA));
        }
        return 0;
      }
    });

    setArray(sortedTable);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableRow}>
          {Object.keys(array[0]).map((key) => {
            return (
              <th key={key} className={styles.tableHeader}>
                <button onClick={() => sortArray(key as keyof ITableRow)}>
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  <img
                    src={triangle}
                    style={{
                      transform:
                        sortConfig.column === key
                          ? `rotate(${sortConfig.direction ? "0deg" : "180deg"})`
                          : "rotate(0deg)",
                      opacity: sortConfig.column === key ? 1 : 0.3,
                    }}
                    alt="triangle"
                  />
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {array.map((item: ITableRow) => {
          return (
            <tr key={item.number} className={styles.tableRow}>
              {Object.keys(item).map((key) => {
                return (
                  <td key={key} className={styles.bodyItem}>
                    {item[key as keyof ITableRow]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
