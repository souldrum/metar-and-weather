import cn from "classnames";
import { useBackgroundWrapper } from "../../hooks/useBackgroundWrapper";
import styles from "./BackgroundWrapper.module.css";

const BackgroundWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { season, imgIndex } = useBackgroundWrapper();

  return <div className={cn(styles.bg, season[imgIndex])}>{children}</div>;
};

export default BackgroundWrapper;
