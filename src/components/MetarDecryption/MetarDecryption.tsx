import { TransformDataType } from "../../context/useMetarReducer";
import useApp from "../../hooks/useApp";
import InfoField from "../InfoField/InfoField";
import styles from "./MetarDecryption.module.css";

const MetarDecryption: React.FC = () => {
  const { transformData, metar } = useApp();

  type Key = keyof TransformDataType;

  const dataRows = Object.keys(transformData).map((key) => {
    return {
      id: key,
      text: transformData[key as Key].title,
      data: transformData[key as Key].data,
    };
  });

  if (!metar) {
    return null;
  }

  return (
    <InfoField>
      <h3>Decryption of some METAR data:</h3>
      <ul className={styles.list}>
        {dataRows.map(({ id, text, data }) => (
          <li key={id} className={styles.infoItem}>
            <span className={styles.title}>{text}</span>
            <span className={styles.data}>{data}</span>
          </li>
        ))}
      </ul>
    </InfoField>
  );
};

export default MetarDecryption;
