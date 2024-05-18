import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/BackIcon.png';
import {
  StyledHeaderButtonContainer,
  StyledHeaderButtonContent,
  StyledHeaderButtonImg,
} from './HeaderButton.styled';

export interface HeaderButtonProps {
  type: 'shop' | 'back';
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ type }) => {
  const navigate = useNavigate();

  const navigateToCartPage = () => {
    navigate('/');
  };

  return (
    <StyledHeaderButtonContainer>
      {type === 'shop' ? (
        <StyledHeaderButtonContent onClick={navigateToCartPage}>
          SHOP
        </StyledHeaderButtonContent>
      ) : (
        <StyledHeaderButtonImg src={BackIcon} onClick={navigateToCartPage} />
      )}
    </StyledHeaderButtonContainer>
  );
};
