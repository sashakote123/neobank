import clsx from 'clsx';

import { useState } from 'react';

import { ITableRow } from '@/src/shared/types/types';

import triangle from './assets/triangle.svg';
import styles from './styles.module.css';
import { ISortConfig } from './types';

interface Props {
  tableArray: ITableRow[];
}

const FIRSTSYMBOLREG = /([A-Z])/g;

const Table: React.FC<Props> = ({ tableArray }) => {
  const [array, setArray] = useState<ITableRow[]>(tableArray);

  const [sortConfig, setSortConfig] = useState<ISortConfig>({
    column: null,
    direction: false,
  });

  const sortArray = (column: keyof ITableRow) => {
    const direction = sortConfig.column === column ? !sortConfig.direction : true;

    setSortConfig({ column, direction });

    const sortedTable = [...array].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (direction) {
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          return Number(new Date(valueA)) - Number(new Date(valueB));
        }
        return 0;
      } else {
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueB - valueA;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          return Number(new Date(valueB)) - Number(new Date(valueA));
        }
        return 0;
      }
    });

    setArray(sortedTable);
  };

  return (
    <table data-testid="table" className={styles.table}>
      <thead>
        <tr className={styles.tableRow}>
          {array.length > 0
            ? Object.keys(array[0]).map((key) => {
                return (
                  <th key={key} className={styles.tableHeader}>
                    <button onClick={() => sortArray(key as keyof ITableRow)}>
                      {key.replace(FIRSTSYMBOLREG, ' $1').toUpperCase()}
                      <img
                        data-testid="headerImg"
                        src={triangle}
                        className={clsx(
                          sortConfig.column === key ? styles.active : styles.inactive,
                          sortConfig.column === key &&
                            (sortConfig.direction ? styles.rotateDown : styles.rotateUp)
                        )}
                        alt="triangle"
                      />
                    </button>
                  </th>
                );
              })
            : null}
        </tr>
      </thead>
      <tbody>
        {array.map((item: ITableRow) => {
          return (
            <tr key={item.number} className={styles.tableRow}>
              {Object.keys(item).map((key) => {
                return (
                  <td data-testid="item" key={key} className={styles.bodyItem}>
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
