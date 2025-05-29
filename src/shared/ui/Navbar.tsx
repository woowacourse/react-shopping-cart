import { useNavigate } from 'react-router';
import styled from '@emotion/styled';

interface NavbarProps {
  title: string;
  url?: string;
}

export default function Navbar({ title, url }: NavbarProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!url) return;
    navigate(url);
  };

  return <NavbarContainer onClick={handleClick}>{title}</NavbarContainer>;
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
