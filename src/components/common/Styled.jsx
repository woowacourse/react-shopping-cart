import styled from 'styled-components';
import { COLORS } from '../../styles/theme';

const SIZE_MAP = {
  large: 430,
  middle: 250,
  small: 100,
};

const StyledImageBox = styled.div`
  width: ${(props) => `${SIZE_MAP[props.width]}`}px;
  height: ${(props) => `${SIZE_MAP[props.height]}`}px;
`;

const StyledImg = styled.img`
  width: ${(props) => `${SIZE_MAP[props.width]}`}px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const StyledCheckbox = styled.input`
  appearance: none;
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: 2px;
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:checked {
    background-color: ${COLORS.PRIMARY};
  }
  &::after {
    content: '✔';
    width: 100%;
    height: 100%;
    font-size: 0.75rem;
    color: ${COLORS.WHITE};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export { StyledImageBox, StyledImg, StyledCheckbox };
