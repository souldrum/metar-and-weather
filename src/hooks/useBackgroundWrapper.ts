import React from "react";
import cl from "../components/BackgroundWrapper/BackgroundWrapper.module.css";

const winter = [cl.winter1, cl.winter2, cl.winter3, cl.winter4];
const spring = [cl.spring1, cl.spring2, cl.spring3, cl.spring4];
const summer = [cl.summer1, cl.summer2, cl.summer3, cl.summer4];
const autumn = [cl.autumn1, cl.autumn2, cl.autumn3, cl.autumn4];

const months = new Date().getMonth();

let season: string[] = [];

switch (months) {
  case 11:
  case 0:
  case 1:
    season = winter;
    break;
  case 2:
  case 3:
  case 4:
    season = spring;
    break;
  case 5:
  case 6:
  case 7:
    season = summer;
    break;
  case 8:
  case 9:
  case 10:
    season = autumn;
    break;
  default:
    break;
}

export const useBackgroundWrapper = () => {
  const [imgIndex, setImgIndex] = React.useState(0);

  React.useEffect(() => {
    setTimeout(
      () =>
        imgIndex === season.length - 1
          ? setImgIndex(0)
          : setImgIndex(imgIndex + 1),
      10000
    );
  }, [imgIndex, setImgIndex]);

  return { season, imgIndex };
};
