import styled from "styled-components";

export const PaymentAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  position: ${({ position }) => position || "static"};
  top: 50px;
  width: 400px;
  height: 250px;
  padding: 16px;

  border: 1px solid ${({ theme: { color } }) => color.gray03};

  p {
    padding: 0 0 16px;

    color: ${({ theme: { color } }) => color.gray01};
    font-size: ${({ theme: { fontSize } }) => fontSize.large};
    border-bottom: 1px solid ${({ theme: { color } }) => color.gray03};
  }
`;

export const PaymentAmountPrice = styled.dl`
  display: flex;
  justify-content: space-between;

  color: ${({ theme: { color } }) => color.gray01};
  font-size: ${({ theme: { fontSize } }) => fontSize.medium};

  dt,
  dd {
    font-weight: 700;
    background: linear-gradient(
      to top,
      ${({ theme: { color } }) => color.point} 40%,
      transparent 30%
    );
  }
`;
