import { VFC } from 'react';
import { AnimationContainer, LoadingContainer, LoadingText } from './styles';

const Loading: VFC = () => (
  <LoadingContainer>
    <AnimationContainer>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </AnimationContainer>
    <LoadingText>불러오는 중입니다...</LoadingText>
  </LoadingContainer>
);

export default Loading;
