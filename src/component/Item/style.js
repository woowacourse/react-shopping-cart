import styled from 'styled-components';
import {Link} from 'react-router-dom';

const ItemWrapper = styled.div`
  width: 282px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  & img {
    cursor: pointer;
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
  color: ${({theme}) => theme.BLACK};
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
`;

export {ItemWrapper, NamePriceWrapper, InfoWrapper, ItemNameWrapper, ItemPriceWrapper};
