import { FC, HTMLProps } from "react";

type ATypes = Pick<HTMLProps<HTMLAnchorElement>, "href" | "target">;
type ImgTypes = Pick<HTMLProps<HTMLImageElement>, "alt" | "src">;
type PropTypes = ATypes & ImgTypes & { title: string; className: string };

const FooterItem: FC<PropTypes> = ({ title, href, alt, src, className }) => {
  return (
    <address className={className}>
      {title}
      <a href={href} target="blank">
        <img alt={alt} src={src} width="30px" />
      </a>
    </address>
  );
};

export default FooterItem;
