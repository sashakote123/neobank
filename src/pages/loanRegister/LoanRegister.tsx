import { useNavigate, useParams } from "react-router";
import styles from "./styles.module.css";
import { useEffect } from "react";

const LoanRegister = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/admin/application/${applicationId}`).then(
      (resp) => {
        if (!resp.ok) navigate("/*");
      }
    );
  }, [applicationId, navigate]);

  return <div>hello</div>;
};
export default LoanRegister;
