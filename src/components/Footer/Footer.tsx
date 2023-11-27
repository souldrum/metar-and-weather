import styles from "./Footer.module.css";
import FooterItem from "./FooterItem";
import { footerData } from "./footerData";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {footerData.map((data, i) => (
        <FooterItem key={i} {...data} />
      ))}
    </footer>
  );
};

//https://icons8.com/icon/1G2vmDZQoCiR/calculator

//https://souldrum.github.io/QnhToQfe_React/

export default Footer;
