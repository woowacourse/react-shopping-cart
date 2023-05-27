import styled from '@emotion/styled';
import { ErrorIcon } from '../../../assets';
import { Text } from '../Text/Text';
import type { ERROR_MESSAGE } from '../../../constant';

type ErrorBoxProps =
  | { errorType: 'emptyList'; errorMessage?: never }
  | { errorType: 'network'; errorMessage: (typeof ERROR_MESSAGE)[keyof typeof ERROR_MESSAGE] };

const ErrorBox = ({ errorType, errorMessage }: ErrorBoxProps) => {
  const errorText = {
    emptyList: '상품 리스트가 없습니다.',
    network: errorMessage,
  };

  return (
    <ErrorWrapper>
      <ErrorIcon width={100} />
      <Text weight="normal" size="large">
        {errorText[errorType]}
      </Text>
    </ErrorWrapper>
  );
};

export default ErrorBox;

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
`;
