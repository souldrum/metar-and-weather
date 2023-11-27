import { FC } from "react";
import useApp from "../../hooks/useApp";
import styles from "./ClearButton.module.css";

const ClearButton: FC = () => {
  const { metar, resetData, errorData } = useApp();
  if (!metar && !errorData) {
    return null;
  }

  return (
    <div className={styles.clearButtonWrap}>
      <button className={styles.clearButton} onClick={resetData}>
        Clear
      </button>
    </div>
  );
};

export default ClearButton;
