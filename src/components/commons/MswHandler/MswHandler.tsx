import { useEffect, useId, useState } from 'react';
import { worker } from '../../../mocks/browser';
import Routes from '../../../constants/Routes';
import makeHandlers from '../../../mocks/handlers';
import * as Styled from './MswHandler.styled';

interface MswHandlerProps {
  open: boolean;
}

const MswHandler = ({ open }: MswHandlerProps) => {
  const [isMswOn, setIsMswOn] = useState(true);
  const [failProbability, setFailProbability] = useState(0);
  const rangeId = useId();

  useEffect(() => {
    if (isMswOn) {
      worker.start({
        serviceWorker: {
          url: `${Routes.BASENAME}/mockServiceWorker.js`,
        },
      });

      return () => worker.stop();
    }

    return () => {};
  }, [isMswOn]);

  useEffect(() => {
    worker.use(...makeHandlers(failProbability / 100));
  }, [failProbability]);

  return (
    <Styled.ContainerDiv open={open}>
      <Styled.RangeLabel htmlFor={rangeId} visible={isMswOn}>
        <p>MSW 요청 실패 확률 설정 (현재: {failProbability}%)</p>
        <input
          type="range"
          id={rangeId}
          min="0"
          max="100"
          step="10"
          value={failProbability}
          onChange={({ target: { value } }) => setFailProbability(Number(value))}
        />
      </Styled.RangeLabel>
      <Styled.ToggleButton
        type="button"
        onClick={() => {
          setIsMswOn((prev) => !prev);
        }}
      >
        MSW 토글 (현재: {isMswOn ? '켜짐' : '꺼짐'})
      </Styled.ToggleButton>
    </Styled.ContainerDiv>
  );
};

export default MswHandler;
