import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Modal from 'components/Modal';
import Button from 'components/Button';
import Text from 'components/Text';
import FlexWrapper from 'components/FlexWrapper';
import MarginWrapper from 'components/MarginWrapper';

import MoveCartPageButton from 'containers/MoveCartPageButton';

import { closeModal } from 'modules/modal';
import ModalPortal from 'Portal';

function AddCartModal() {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <ModalPortal>
      <Modal onClick={handleCloseModal}>
        <FlexWrapper
          flexFlow="column wrap"
          justifyContent="space-between"
          alignItems="center"
          alignContent="space-around"
        >
          <MarginWrapper marginLeft="240px">
            <Button onClick={handleCloseModal} fontSize="30px" fontWeight="100" border="none">
              X
            </Button>
          </MarginWrapper>
          <MarginWrapper marginTop="10px">
            <Text fontSize="20px" fontWeight="100">
              장바구니에 상품이 담겼습니다.
            </Text>
          </MarginWrapper>
          <MarginWrapper marginTop="24px">
            <Link to="/cart">
              <MoveCartPageButton />
            </Link>
          </MarginWrapper>
        </FlexWrapper>
      </Modal>
    </ModalPortal>
  );
}

export default AddCartModal;
