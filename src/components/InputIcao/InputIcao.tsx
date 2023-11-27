import cn from "classnames";
import { useEffect, useRef } from "react";
import useApp from "../../hooks/useApp";
import { useSeasonColor } from "../../hooks/useSeasonColor";
import TooltipIcao from "../TooltipIcao/TooltipIcao";
import styles from "./InputIcao.module.css";

const InputIcao = () => {
  const { icao, setIcao, loadMetar } = useApp();
  const season = useSeasonColor();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (icao.length < 4) return;
    // loadMetar();  //load when blur
    inputRef.current?.blur();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIcao(e.target.value.toUpperCase());

  const handleBlur = () => icao.length === 4 && loadMetar();

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
            onBlur={handleBlur}
          />
          <TooltipIcao />
        </div>
      </form>
    </div>
  );
};

export default InputIcao;
