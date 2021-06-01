import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import SnackbarContext from '../../context/SnackbarContext';
import { COLOR } from '../../constants/color';
import { ReactComponent as SnackbarErrorIcon } from '../../assets/snackbar-error.svg';
import { ReactComponent as SnackbarSuccessIcon } from '../../assets/snackbar-success.svg';

export const SNACKBAR_TYPE = Object.freeze({
  IDLE: 'IDLE',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
});

const snackbarStyle = {
  [SNACKBAR_TYPE.IDLE]: {
    backgroundColor: COLOR.BLACK_OPACITY_70,
  },
  [SNACKBAR_TYPE.SUCCESS]: {
    backgroundColor: COLOR.GREEN_OPACITY_80,
  },
  [SNACKBAR_TYPE.FAILURE]: {
    backgroundColor: COLOR.RED_OPACITY_80,
  },
};

const snackbarAnimation = keyframes`
  \ 0% {
    transform: translateY(0);
  }
  \ 10% {
    transform: translateY(-70px);
  }
  \ 90% {
    transform: translateY(-70px);
  }
  \ 100% {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  position: fixed;
  left: 1rem;
  bottom: -60px;
  width: 100%;
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  min-width: fit-content;
  height: 60px;
  padding-left: 1rem;
  padding-right: 8rem;
  border-radius: 5px;
  color: white;

  animation: 3s ease-in-out ${snackbarAnimation};

  transition: bottom 0.3s;

  ${({ type }) => snackbarStyle[type]}
  ${({ quantity }) => {
    return [...Array(quantity)].map((_, i) => `&:nth-child(${i + 1}) { bottom: ${(quantity - i - 1) * 70}px }`);
  }}
`;

const snackbarIcon = {
  [SNACKBAR_TYPE.IDLE]: null,
  [SNACKBAR_TYPE.SUCCESS]: <SnackbarSuccessIcon />,
  [SNACKBAR_TYPE.FAILURE]: <SnackbarErrorIcon />,
};

const snackbarSetting = { message: null, isShowing: false, type: SNACKBAR_TYPE.IDLE };

const SnackbarProvider = ({ children }) => {
  const [snackbars, setSnackbars] = useState([...Array(3)].map(() => snackbarSetting));

  const showSnackbar = ({ message, type = SNACKBAR_TYPE.IDLE }) => {
    if (snackbars.filter((snackbar) => snackbar.isShowing).length >= 3) return;

    setSnackbars((prevSnackbar) => {
      const copiedSnackbar = [...prevSnackbar];
      const hiddenSnackbarIndex = copiedSnackbar.findIndex((snackbar) => !snackbar.isShowing);
      copiedSnackbar[hiddenSnackbarIndex] = { message, isShowing: true, type };

      return copiedSnackbar;
    });
  };

  const handleHideSnackbar = (index) => {
    setSnackbars((prevSnackbar) => {
      const copiedSnackbar = [...prevSnackbar];
      copiedSnackbar[index] = snackbarSetting;

      return copiedSnackbar;
    });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Container>
        {snackbars.map(
          ({ isShowing, message, type }, index) =>
            isShowing && (
              <Content
                type={type}
                onAnimationEnd={() => handleHideSnackbar(index)}
                key={message + index}
                quantity={snackbars.filter((v) => v.isShowing).length}
              >
                {snackbarIcon[type]}
                <div>{message}</div>
              </Content>
            )
        )}
      </Container>
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SnackbarProvider;
