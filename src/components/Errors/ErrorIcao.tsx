import InfoField from "../InfoField/InfoField";
import styles from "./ErrorIndicator.module.css";
import oops from "/src/assets/img/errors/oops.png";

const ErrorIcao = () => {
  return (
    <InfoField>
      <div className={styles.errorIcao}>
        <img className={styles.oops} src={oops} alt="Oops!" />
        <h2>
          There is no METAR information for this request. Check that the{" "}
          <a href="https://airportsbase.org/ICAO.php" target="blank">
            ICAO
          </a>{" "}
          code is entered correctly
        </h2>
      </div>
    </InfoField>
  );
};

export default ErrorIcao;
