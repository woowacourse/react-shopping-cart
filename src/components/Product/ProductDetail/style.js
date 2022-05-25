import styled from 'styled-components';

export const Image = styled.img`
  width: 350px;
  height: 350px;
`;

export const InfoBox = styled.div`
  width: 380px;
  font-family: ${({ theme }) => theme.FONT.SECONDARY};
`;

export const Name = styled.div`
  margin: 10px 0 10px 15px;
  font-size: 18px;
  font-weight: 700;
`;

export const Price = styled.div`
  margin: 0 0 10px 15px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 400;
`;

export const Line = styled.hr`
  margin: 0;
`;
