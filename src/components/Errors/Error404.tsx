import { FC } from "react";
import fail from "/src/assets/img/errors/fail.png";
import styles from "./ErrorIndicator.module.css";

type PropsType = { errorData: string };

const Error404: FC<PropsType> = ({ errorData }) => {
  return (
    <div className={styles.error404}>
      <img className={styles.fail} src={fail} alt="fail" />
      <h2>{errorData}.</h2>
    </div>
  );
};

export default Error404;
