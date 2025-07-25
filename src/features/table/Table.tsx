import styles from "./styles.module.css";
import triangle from "./assets/triangle.svg";
import { useState } from "react";
import { ISortConfig, ITableRow } from "./types";

interface Props {
  tableArray: ITableRow[];
}

const Table: React.FC<Props> = ({ tableArray }) => {
  const [array, setArray] = useState<ITableRow[]>(tableArray);

  const [sortConfig, setSortConfig] = useState<ISortConfig>({
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
