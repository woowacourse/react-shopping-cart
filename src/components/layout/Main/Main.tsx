import { bodyLayout } from './Main.style';

export function Main({ children }: { children: React.ReactNode }) {
  return <main css={bodyLayout}>{children}</main>;
}
