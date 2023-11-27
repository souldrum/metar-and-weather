import cn from "classnames";
import { FC } from "react";
import { useSeasonColor } from "../../hooks/useSeasonColor";
import styles from "./Header.module.css";

const Header: FC = () => {
  const season = useSeasonColor();

  return (
    <header className={styles.wrapper}>
      <h1
        className={cn(styles.header, {
          [styles.winter]: season === "winter",
          [styles.spring]: season === "spring",
          [styles.summer]: season === "summer",
          [styles.autumn]: season === "autumn",
        })}
      >
        METAR and Weather
      </h1>
    </header>
  );
};

export default Header;
