import { styled } from 'styled-components';
import { FlexWrapper } from '../../pages/Cart/Cart.style';

export const StyleCartItemWrapper = styled(FlexWrapper)`
  column-gap: 1rem;
  width: 100%;
  margin: 1rem;
  border: ${({ theme }) => theme.secondaryColor} 1px solid;
  padding: 1rem;
  border-radius: 8px;
`;

export const StyleImageBox = styled.div`
  width: 144px;
  height: 144px;
`;

export const StyleImage = styled.img`
  width: 90%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadows.large};

  object-fit: cover;
`;

export const StyleNameText = styled.p`
  size: 2rem;
`;

export const StyleProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

export const StyleDeleteBox = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 50%;
`;

export const StyleDeleteIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const StylePriceText = styled.p`
  size: 1.6rem;
`;
