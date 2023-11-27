import styles from "./ErrorIndicator.module.css";
import fail from "/src/assets/img/errors/fail.png";

type PropsType = { errorData: string };

const Error404: React.FC<PropsType> = ({ errorData }) => {
  return (
    <div className={styles.error404}>
      <img className={styles.fail} src={fail} alt="fail" />
      <h2>{errorData}.</h2>
    </div>
  );
};

export default Error404;
