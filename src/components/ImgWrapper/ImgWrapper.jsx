import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImgWrapper = ({ src }) => {
  return (
    <Styled.Wrapper>
      <Styled.Img src={src} alt="에러이미지" />
    </Styled.Wrapper>
  );
};

ImgWrapper.propTypes = {
  src: PropTypes.string,
};

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Img: styled.img`
    width: 60%;
  `,
};

export default ImgWrapper;
