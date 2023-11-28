import styles from "./Footer.module.css";

type FooterItemDataType = {
  className: string;
  title: string;
  href: string;
  alt: string;
  src: string;
};

export const footerData: FooterItemDataType[] = [
  {
    className: "",
    title: "Author's page:",
    href: "https://vk.com/souldrum",
    alt: "vk",
    src: "https://img.icons8.com/3d-fluency/100/000000/vk-circled.png",
  },
  {
    className: styles.end,
    title: "© Alexandr Dushenko (souldrum):",
    href: "https://github.com/souldrum",
    alt: "github",
    src: "https://img.icons8.com/color/48/000000/github--v1.png",
  },
  {
    className: "",
    title: "Manual on github:",
    href: "https://github.com/souldrum/metar-and-weather#metar-and-weather",
    alt: "github",
    src: "https://img.icons8.com/color/48/000000/github--v1.png",
  },
];
