import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes` {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}`;

export const BackDrop = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.35);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 300px;
  height: 200px;
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  animation: ${fadeIn} 1s;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 10px;
`;

export const AlertTitle = styled.p`
  font: ${(props) => props.theme.font.small};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const Button = styled.button`
  width: 100px;
  height: 30px;
  font: ${(props) => props.theme.font.small};
  text-align: center;
  border: 1px solid ${(props) => props.theme.color.gray};
  border-radius: 10px;
`;
