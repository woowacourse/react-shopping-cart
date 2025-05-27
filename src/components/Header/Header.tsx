import { backArrow } from '../../assets';
import { BackArrow, Button, Container, Title } from './Header.styles';

interface HeaderProps {
  title?: string;
  variant?: 'default' | 'back';
}

function Header({ title, variant = 'default' }: HeaderProps) {
  const isDefault = variant === 'default';

  return (
    <Container>
      {isDefault ? (
        <Title>{title}</Title>
      ) : (
        <Button>
          <BackArrow src={backArrow} alt="뒤로 가기" />
        </Button>
      )}
    </Container>
  );
}

export default Header;
