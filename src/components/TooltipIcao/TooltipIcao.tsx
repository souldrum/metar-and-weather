import React from "react";
import styles from "./TooltipIcao.module.css";

const TooltipIcao = React.memo(() => {
  return (
    <div className={styles.tooltip}>
      <i className="bi bi-database-exclamation">
        <span className={styles.tooltipText}>
          {"icao code you can find"}
          <a href="https://airportsbase.org/ICAO.php" target="blank">
            {" here"}
          </a>
        </span>
      </i>
    </div>
  );
});

export default TooltipIcao;
