/** @jsxImportSource @emotion/react */

import { useNavigate } from 'react-router';
import styled from '@emotion/styled';
import Button from './Button';
import { css } from '@emotion/react';

interface NavbarProps {
  title: string;
  url?: string;
}

const ButtonCSS = css`
  background-color: #000;
  border-radius: 8px;
  padding: 8px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  transition: scale 0.2s ease, background-color 0.2s ease;
  &:hover {
    scale: 1.1;
  }

  &:disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`;

export default function Navbar({ title, url }: NavbarProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!url) return;
    navigate(url);
  };

  return (
    <NavbarContainer onClick={handleClick}>
      <Button css={ButtonCSS} title={title} onClick={handleClick} />
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  width: 100%;
  height: 64px;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-size: 20px;
  font-weight: 800;
`;
