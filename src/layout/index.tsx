import styled from 'styled-components';
import { Header } from './header/Header';

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <Style.Container>
      <Header />
      {children}
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 140px;
    padding-bottom: 60px;
  `,
};
