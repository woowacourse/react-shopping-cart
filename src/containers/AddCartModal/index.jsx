import React from 'react';
import { Link } from 'react-router-dom';

import Modal from 'components/Modal';
import Button from 'components/Button';
import Text from 'components/Text';
import FlexWrapper from 'components/FlexWrapper';

import MoveCartPageButton from 'containers/MoveCartPageButton';
import MarginWrapper from 'components/MarginWrapper';

function AddCartModal() {
  const handleAddCartModalClose = () => {};

  return (
    <Modal>
      <FlexWrapper
        flexFlow="column wrap"
        justifyContent="space-between"
        alignItems="center"
        alignContent="space-around"
      >
        <MarginWrapper marginLeft="240px">
          <Button onClick={handleAddCartModalClose} fontSize="30px" fontWeight="100" border="none">
            X
          </Button>
        </MarginWrapper>
        <MarginWrapper marginBottom="14px">
          <Text fontSize="20px" fontWeight="100">
            장바구니에 상품이 담겼습니다.
          </Text>
        </MarginWrapper>
        <Link to="/cart">
          <MoveCartPageButton />
        </Link>
      </FlexWrapper>
    </Modal>
  );
}

export default AddCartModal;
