import { FC, PropsWithChildren } from "react";
import styles from "./InfoField.module.css";

const InfoField: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.infoField}>{children}</div>;
};

export default InfoField;
