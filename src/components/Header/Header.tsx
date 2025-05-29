import { useNavigate } from 'react-router';
import { backArrow } from '../../assets';
import styled from '@emotion/styled';

interface HeaderProps {
  title?: string;
  variant?: 'default' | 'back';
}

function Header({ title, variant = 'default' }: HeaderProps) {
  const navigate = useNavigate();
  const isDefault = variant === 'default';

  const handlePageBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      {isDefault ? (
        <Title>{title}</Title>
      ) : (
        <Button>
          <BackArrow src={backArrow} alt="뒤로 가기" onClick={handlePageBack} />
        </Button>
      )}
    </Container>
  );
}

export default Header;

export const Container = styled.header`
  width: 100%;
  height: 64px;
  background-color: #000000;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
`;

export const Button = styled.button`
  border: none;
  width: 32px;
  height: 32px;
  background-color: transparent;
  cursor: pointer;
`;

export const BackArrow = styled.img`
  width: 24px;
  height: 24px;
`;
