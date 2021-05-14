import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import LoadingPortal from '../../portals/LoadingPortal';
import { COLOR } from '../../constants/color';

const bounce = keyframes`
  0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }
  35% {
    height: 15px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: -10px;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Text = styled.div`
  color: ${({ color }) => color || COLOR.MINT_500};
  display: inline-block;
  margin-left: 10px;
  font-size: 30px;
  font-weight: 500;
`;

const BounceBall = styled.div`
  position: relative;
  display: inline-block;
  height: 37px;
  width: 15px;
  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${({ backgroundColor }) => backgroundColor || COLOR.MINT_500};
    transform-origin: 50%;
    animation: ${bounce} 500ms alternate infinite ease;
  }
`;

const Loading = ({ color, backgroundColor }) => (
  <LoadingPortal>
    <Container>
      <div>
        <BounceBall backgroundColor={backgroundColor} />
        <Text color={color}>NOW LOADING...</Text>
      </div>
    </Container>
  </LoadingPortal>
);

Loading.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Loading;
