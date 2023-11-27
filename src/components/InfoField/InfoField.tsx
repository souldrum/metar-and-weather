import styles from "./InfoField.module.css";

const InfoField: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.infoField}>{children}</div>;
};

export default InfoField;
