import { MainStyle } from "./Main.style";
import { PropsWithChildren } from "react";

const Main = ({ children }: PropsWithChildren) => {
  return <main css={MainStyle}>{children}</main>;
};

export default Main;
