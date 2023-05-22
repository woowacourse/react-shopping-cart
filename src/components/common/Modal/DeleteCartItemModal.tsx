import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { useModal } from '../../../hooks/useModal';

const DeleteCartItemModal = () => {
  const { modalDataState, closeModal } = useModal();

  const onSubmit = () => {
    modalDataState.callBack && modalDataState.callBack();
    closeModal();
  };

  return (
    <ModalWrapper>
      <TextWrapper>
        <Text size="smallest" weight="light">
          해당 상품을 삭제하시겠습니까?
        </Text>
      </TextWrapper>
      <ButtonWrapper>
        <CancelButton onClick={closeModal}>
          <Text size="smallest" weight="light">
            취소
          </Text>
        </CancelButton>
        <SubmitButton onClick={onSubmit}>
          <Text size="smallest" weight="normal">
            확인
          </Text>
        </SubmitButton>
      </ButtonWrapper>
    </ModalWrapper>
  );
};

export default DeleteCartItemModal;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 304px;
  max-width: 304px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 104px;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 56px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: row;
`;

const ButtonStyle = styled.button`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    filter: brightness(0.94);
  }
`;

const CancelButton = styled(ButtonStyle)`
  border-radius: 0 0 0 8px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled(ButtonStyle)`
  border-radius: 0 0 8px 0;
`;
