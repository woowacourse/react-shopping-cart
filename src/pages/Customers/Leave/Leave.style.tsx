import styled from 'styled-components';

export const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  resize: none;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.greyColor_1};
  border-radius: 4px;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.brandColor_1};
  }
`;

export const AgreeCheckBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  gap: 20px;

  & > span > span {
    color: ${({ theme }) => theme.redColor_1};
    font-weight: bold;
    margin-left: 5px;
  }
`;
