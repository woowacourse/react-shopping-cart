import * as Styled from './Loading.styles';
import loadingSVG from '../../../assets/svgs/loading.svg';

const Loading = () => {
  return (
    <Styled.Loading>
      <img src={loadingSVG} alt="로딩 중" />
    </Styled.Loading>
  );
};

export default Loading;
