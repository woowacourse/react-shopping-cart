import styled from 'styled-components';

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 129px;
`;

export const Text = styled.span`
  font-size: 21px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.7px;
  margin-bottom: 50px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  & > button:not(:last-child) {
    margin-right: 36px;
  }
`;
