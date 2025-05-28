import { useNavigate } from 'react-router';
import { backArrow } from '../../assets';
import { BackArrow, Button, Container, Title } from './Header.styles';

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
