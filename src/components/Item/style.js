import styled from 'styled-components';
import {Link} from 'react-router-dom';

const ItemWrapper = styled.div`
  width: 282px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow: hidden;
`;

const ItemImageContainer = styled.div`
  width: 282px;
  height: 282px;
  overflow: hidden;
  & img {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    object-fit: cover;
  }

  & img:hover {
    transform: scale(1.05);
  }
`;

const NamePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemNameBox = styled(Link)`
  font-size: ${({theme}) => theme.FONT_SIZE.XS};
  &:hover {
    text-decoration: underline;
  }
`;

const ItemPriceBox = styled.span`
  margin-top: 5px;
  font-size: ${({theme}) => theme.FONT_SIZE.S};
`;

const InfoWrapper = styled.div`
  color: ${({theme}) => theme.COLOR.BLACK};
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
`;

export {
  ItemWrapper,
  ItemImageContainer,
  NamePriceContainer,
  InfoWrapper,
  ItemNameBox,
  ItemPriceBox,
};
