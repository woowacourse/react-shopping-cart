import { useAppSelector } from 'hooks/useAppSelector';
import Portal from './Portal';
import styled, { keyframes } from 'styled-components';
import { flexCenter } from 'styles/mixin';

export const Contents = {
  cart: '장바구니에 담았습니다.',
};

const Snackbar = () => {
  const { contentsType } = useAppSelector(state => state.snackbarReducer);

  return (
    <Portal>
      <StyledSnackbarContents>{Contents[contentsType]}</StyledSnackbarContents>
    </Portal>
  );
};

export default Snackbar;

const snackbarShow = keyframes`
  0% { bottom:-7rem; opacity:0 }
  40%{ bottom:3rem; opacity:0 }
  65% { bottom:5rem; }
  80% { bottom:3rem; opacity:1 }
  100% { bottom:5rem; }
`;

const StyledSnackbarContents = styled.div`
  ${flexCenter};
  position: fixed;
  width: 50rem;
  height: 7rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  left: 50%;
  bottom: -7rem;
  transform: translateX(-50%);
  font-size: 2.5rem;

  animation-name: ${snackbarShow};
  animation-duration: 0.5s;
  animation-direction: forwards;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;
