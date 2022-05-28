import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const SkeletonProductItem = () => (
  <Styled.Container>
    <Styled.ImageWrapper />
    <Styled.Description>
      <Styled.Info>
        <Styled.SingleLineText />

        <CommonStyled.HR />
        <Styled.SingleLineText />
        <Styled.Button />
      </Styled.Info>
    </Styled.Description>
  </Styled.Container>
);

export default SkeletonProductItem;
