import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {FlexColumn, FlexRow} from 'style/common';

const ItemLayout = styled(FlexColumn)`
  width: 282px;
  gap: 18px;
  box-shadow: ${({theme}) => `6px 6px ${theme.GRAY_300}`};
  overflow: hidden;

  img {
    height: 282px;
    cursor: pointer;
  }

  img:hover {
    transform: scale(1.1);
    transition-duration: 0.2s;
  }
`;

const NamePriceBox = styled(FlexColumn)`
  gap: 10px;
`;

const ItemNameLink = styled(Link)`
  display: inline-block;
  width: 210px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;

  font-size: 16px;
`;

const ItemPriceSpan = styled.span`
  margin: 5px 0 10px;
  font-size: 20px;
`;

const InfoBox = styled(FlexRow)`
  color: ${({theme}) => theme.BLACK};
  justify-content: space-between;
  margin: 0 15px;
`;

export {ItemLayout, NamePriceBox, ItemNameLink, ItemPriceSpan, InfoBox};
