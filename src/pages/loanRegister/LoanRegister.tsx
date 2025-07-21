import { useParams } from "react-router";
import styles from "./styles.module.css";

const LoanRegister = () => {
  const params = useParams();

  console.log(params);

  return <div>hello</div>;
};
export default LoanRegister;
