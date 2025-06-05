import { footerLayout } from "./Footer.style";

export function Footer({ children }: { children: React.ReactNode }) {
  return <footer css={footerLayout}>{children}</footer>;
}
