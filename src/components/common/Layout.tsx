import { PropsWithChildren } from 'react';

import { styled } from 'styled-components';

import { Header } from '../Header';

export const Layout = ({ children }: PropsWithChildren) => (
  <Style.Layout>
    <Header />
    <Style.Container>{children}</Style.Container>
  </Style.Layout>
);

const Style = {
  Layout: styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
  `,

  Container: styled.div`
    @media screen and (min-width: 501px) {
      width: 1320px;
    }

    width: 100%;

    margin-top: 80px;

    padding: 0px 16px;
  `,
};
