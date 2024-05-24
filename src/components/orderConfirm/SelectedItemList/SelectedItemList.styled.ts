import styled from 'styled-components';

export const LabelText = styled.span<{ $isDisabled?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: ${({ $isDisabled }) => ($isDisabled ? 'lightgray' : 'rgba(10, 13, 19, 1)')};
`;
