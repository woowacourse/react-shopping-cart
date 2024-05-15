import React from 'react';
import { Link } from 'react-router-dom';
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

interface FooterProps {
  url: string;
}

function Footer({ url }: FooterProps) {
  return (
    <Link to={url}>
      <FooterContainer>주문 확인</FooterContainer>
    </Link>
  );
}

export default Footer;
