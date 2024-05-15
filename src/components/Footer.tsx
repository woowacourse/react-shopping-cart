import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: #000000;
  width: 100%;
  height: 6.4rem;

  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.6rem;
  text-align: center;

  justify-content: center;
  align-items: center;
`;

function Footer() {
  return <FooterContainer>주문 확인</FooterContainer>;
}

export default Footer;
