import styled from 'styled-components';
import {Link} from 'react-router-dom';

const ItemWrapper = styled.div`
  width: 282px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow: hidden;
`;

const ItemImageWrapper = styled.div`
  width: 282px;
  height: 282px;
  overflow: hidden;
  & img {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  & img:hover {
    transform: scale(1.05);
  }
`;

const NamePriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemNameWrapper = styled(Link)`
  font-size: 16px;
`;

const ItemPriceWrapper = styled.span`
  margin-top: 5px;
  font-size: 20px;
`;

const InfoWrapper = styled.div`
  color: ${({theme}) => theme.COLOR.BLACK};
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
`;

export {
  ItemWrapper,
  ItemImageWrapper,
  NamePriceWrapper,
  InfoWrapper,
  ItemNameWrapper,
  ItemPriceWrapper,
};
