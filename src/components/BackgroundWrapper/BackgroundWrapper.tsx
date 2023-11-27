import cn from "classnames";
import { FC, PropsWithChildren } from "react";
import { useBackgroundWrapper } from "../../hooks/useBackgroundWrapper";
import styles from "./BackgroundWrapper.module.css";

const BackgroundWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { season, imgIndex } = useBackgroundWrapper();

  return <div className={cn(styles.bg, season[imgIndex])}>{children}</div>;
};

export default BackgroundWrapper;
