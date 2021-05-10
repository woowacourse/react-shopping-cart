import styled from 'styled-components';

export const NotFound = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateY(-50%);
`;

export const Image = styled.img`
  width: 300px;
  margin-bottom: 20px;
`;

export const Message = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.TEXT_COLOR};
`;
