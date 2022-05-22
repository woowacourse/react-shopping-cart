import { FRUITS } from 'constant';
import styled from 'styled-components';

export default function LoadingSpinner() {
  return (
    <Styled.SpinnerBox>
      {FRUITS.map(fruit => (
        <Styled.Icon key={fruit}>
          <span style={{ fontSize: '50px' }}>{fruit}</span>
        </Styled.Icon>
      ))}
    </Styled.SpinnerBox>
  );
}

const Styled = {
  SpinnerBox: styled.div`
    width: 300px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 50%;
    transform: translateX(-50%);
  `,

  Icon: styled.div`
    animation: loading_spin 2s linear infinite;
    transform-origin: 50% 50%;

    @keyframes loading_spin {
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};
