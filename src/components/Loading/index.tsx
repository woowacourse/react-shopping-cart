import { AnimationContainer, LoadingContainer, LoadingText } from './styles';

const Loading = () => {
  return (
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
};

export default Loading;
