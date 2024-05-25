import styled from 'styled-components';
import Text from '../common/Text/Text';
import Button from '../common/Button/Button';

const ErrorComponentContainer = styled.div`
  height: 100%;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  row-gap: 14px;
`;

type ErrorComponentProps = {
  error: Error;
  onReset?: () => void;
};

const ErrorComponent = ({ error, onReset }: ErrorComponentProps) => {
  return (
    <ErrorComponentContainer>
      <Text size="l" weight="l">
        요청사항을 처리하는데 실패했습니다.
      </Text>
      <Text size="s" weight="s">
        {error.message}
      </Text>
      <Button onClick={onReset} color="primary">
        다시 시도
      </Button>
    </ErrorComponentContainer>
  );
};

export default ErrorComponent;
