import { Link } from 'react-router-dom';

import {
  StyledBackdrop,
  StyledContentSection,
  StyledErrorModal,
} from './ErrorModal.styled';
import Modal from '@components/commons/Modal/Modal';
import Button from '@components/commons/Button/Button';
import * as Text from '@components/commons/Text/Text';

const ErrorModal = (props: { isError: boolean }) => {
  const { isError } = props;

  return (
    <Modal initIsOpenModal={isError}>
      {handleModalClose => (
        <StyledErrorModal>
          <StyledBackdrop onClick={() => handleModalClose()} />
          <StyledContentSection>
            <Text.Title>데이터를 불러오는 데에 실패했습니다 😢</Text.Title>
            <Link to="/">
              <Button
                padding="20px"
                borderRadius="8px"
                backgroundColor="#04c09e"
                type="button"
              >
                <Text.Paragraph color="white">다시 불러오기</Text.Paragraph>
              </Button>
            </Link>
          </StyledContentSection>
        </StyledErrorModal>
      )}
    </Modal>
  );
};

export default ErrorModal;
