import styled, { keyframes } from 'styled-components';
import { BAEMIN_CYAN } from '../../../constants';

const fade = keyframes`
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Container = styled.div`
  visibility: ${(props) => (props.isOpened ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: opacity 0.25s ease;
  z-index: 20;
`;

export const Inner = styled.div`
  position: fixed;
  width: 400px;
  left: calc(50% - 220px);
  bottom: 50%;
  background-color: #fff;
  border-radius: 10px;
  border: 3px solid #ccc;
  animation: ${fade} 0.6s ease 1 forwards;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

export const Message = styled.h3`
  color: #444;
  text-align: center;
  font-size: 1.2rem;
  margin: 1.5rem 2rem 5rem;
`;

export const Button = styled.button`
  background: transparent;
  color: #333;
  height: 3rem;
  font-size: 1rem;
  width: 50%;
  position: absolute;
  bottom: 0;
  cursor: pointer;

  border-style: solid;
  border-color: #eee;

  &:focus,
  &:hover {
    font-weight: bold;
    background-color: ${BAEMIN_CYAN};
    color: #fff;
    outline: none;
  }

  &:active {
    background-color: #ddd;
    outline-color: transparent;
  }
`;

export const CancelButton = styled(Button)`
  border-width: 2px 1px 0 0;
  border-radius: 0 0 0 7px;
  left: 0;
`;

export const ApproveButton = styled(Button).attrs({ autoFocus: true })`
  border-width: 2px 0 0 1px;
  border-radius: 0 0 7px 0;
  right: 0;
`;
