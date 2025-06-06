import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  /* height: inherit; */
`;

export const FallbackImage = styled.img`
  width: 250px;
  height: 250px;
`;

export const Message = styled.p`
  font-size: 20px;
  font-weight: 600;
`;
