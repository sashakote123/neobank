import clsx from "clsx";
import styles from "./styles.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  small?: boolean;
}
const MainBtn: React.FC<Props> = ({ title, small = false, ...rest }) => {
  return (
    <button
      data-testid="mainBtn"
      {...rest}
      className={clsx(styles.button, {
        [styles.small]: small,
      })}
    >
      {title}
    </button>
  );
};
export default MainBtn;
