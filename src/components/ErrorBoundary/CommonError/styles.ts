import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Container from '../../shared/Container';
import Text from '../../shared/Text';
import Button from '../../shared/Button';

export const CommonErrorContainer = styled(Container)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled(Text)`
  font-weight: 700;
  font-size: 1.75rem;
  color: ${PALETTE.BAE_MINT[500]};
  margin-bottom: 0.75rem;
`;

export const HomeButton = styled(Button)`
  background-color: ${PALETTE.BAE_MINT[500]};
  color: white;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  font-size: 1.125rem;
  font-weight: 500;
  margin-top: 3.5rem;
`;

HomeButton.defaultProps = {
  size: 'small',
};

export const BaeDaleeImage = styled.img`
  position: fixed;
  bottom: 0;
  left: 80%;
  animation: pop-out 1s;

  @keyframes pop-out {
    0% {
      transform: translateY(100%);
    }
    60% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

BaeDaleeImage.defaultProps = {
  src: `${process.env.PUBLICUrl}/images/crying-baedalee.png`,
};
