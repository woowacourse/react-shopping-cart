import { ContainerLayoutStyle } from './ContainerLayout.styles';

interface ContainerLayoutProps {
  children: React.ReactNode;
}

function ContainerLayout({ children }: ContainerLayoutProps) {
  return <div css={ContainerLayoutStyle}>{children}</div>;
}

export default ContainerLayout;
