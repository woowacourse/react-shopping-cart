import PropTypes from 'prop-types';
import React from 'react';
import PALETTE from '../../../constants/palette';
import Button from '../../common/Button';
import FlexContainer from '../../common/FlexContainer';
import HighlightText from '../../common/HighlightText';
import { UNIT } from '../../../constants/appInfo';
import * as Styled from './style';
import { ERROR_MESSAGE } from '../../../constants/message';

const PriceInfoBox = ({ width, margin, title, priceInfo, submitInfo, onOrder }) => {
  const onClick = () => {
    if (priceInfo.price <= 0) {
      alert(ERROR_MESSAGE.NO_PRODUCTS_TO_ORDER);
      return;
    }

    onOrder();
    locatePage(submitInfo.address);
  };

  return (
    <FlexContainer width={width} margin={margin} direction="column" border={`1px solid ${PALETTE.GRAY_004}`}>
      <Styled.PriceInfoTitle>{title}</Styled.PriceInfoTitle>
      <FlexContainer direction="column" padding="1.8rem 1.4rem">
        <FlexContainer justifyContent="space-between" margin={submitInfo && '0 0 3rem'}>
          <HighlightText highlightColor={PALETTE.BAEMINT_TRANSPARENT_001}>{priceInfo.name}</HighlightText>
          <HighlightText highlightColor={PALETTE.BAEMINT_TRANSPARENT_001}>{`${priceInfo.price.toLocaleString()} ${
            UNIT.MONEY
          }`}</HighlightText>
        </FlexContainer>
        {submitInfo && (
          <Button
            type="button"
            width="100%"
            height="4.5rem"
            backgroundColor={PALETTE.BAEMINT}
            color={PALETTE.WHITE}
            fontSize="1.3rem"
            disabled={!(priceInfo.price && priceInfo.price > 0)}
            onClick={onClick}
          >
            {submitInfo.text}
          </Button>
        )}
      </FlexContainer>
    </FlexContainer>
  );
};

PriceInfoBox.propTypes = {
  width: PropTypes.string,
  margin: PropTypes.string,
  title: PropTypes.string,
  priceInfo: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  }),
  submitInfo: PropTypes.shape({
    text: PropTypes.string,
    address: PropTypes.string,
  }),
  onOrder: PropTypes.func,
};

export default PriceInfoBox;
