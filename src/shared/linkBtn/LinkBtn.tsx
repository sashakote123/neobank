import { Link } from "react-router";
import styles from "./styles.module.css";

interface Props {
  title: string;
  link?: string;
}

const LinkBtn: React.FC<Props> = ({ title, link = "/" }) => {
  return (
    <Link data-testid="linkBtn" className={styles.linkBtn} to={link}>
      {title}
    </Link>
  );
};
export default LinkBtn;
