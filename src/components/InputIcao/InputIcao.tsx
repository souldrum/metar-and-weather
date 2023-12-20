import cn from "classnames";
import React from "react";
import useApp from "../../hooks/useApp";
import { useSeasonColor } from "../../hooks/useSeasonColor";
import TooltipIcao from "../TooltipIcao/TooltipIcao";
import styles from "./InputIcao.module.css";

const InputIcao: React.FC = () => {
  const { icao, setIcao, loadMetar } = useApp();
  const season = useSeasonColor();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (icao.length === 4) {
      loadMetar();
      inputRef.current && inputRef.current.blur();
    }
  }, [icao.length, loadMetar]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (icao.length < 4) return;
    loadMetar();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIcao(e.target.value.toUpperCase());

  return (
    <div className={styles.metarFormContainer}>
      <form
        className={cn(styles.form, {
          [styles.winter]: season === "winter",
          [styles.spring]: season === "spring",
          [styles.summer]: season === "summer",
          [styles.autumn]: season === "autumn",
        })}
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="icao">Enter ICAO airport code:</label>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            id="icao"
            type="text"
            maxLength={4}
            value={icao}
            onChange={handleChange}
            placeholder="LFPG"
          />
          <TooltipIcao />
        </div>
      </form>
    </div>
  );
};

export default InputIcao;
