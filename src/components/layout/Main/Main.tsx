import { bodyLayout } from "./Main.style";

export default function Main({ children }: { children: React.ReactNode }) {
  return <main css={bodyLayout}>{children}</main>;
}
