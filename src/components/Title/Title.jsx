import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = ({ children }) => {
  return (
    <Styled.Wrapper>
      <Styled.TitleText>{children}</Styled.TitleText>
      <Styled.Line />
    </Styled.Wrapper>
  );
};

Title.propTypes = {
  children: PropTypes.string,
};

const Styled = {
  Wrapper: styled.div`
    width: 750px;
    height: 100px;
    text-align: center;
    ${({ theme }) => `
      color: ${theme.textColor}
    `}
  `,

  TitleText: styled.div`
    margin: 10px 0 10px 15px;
    font-size: 22px;
    font-weight: 700;
  `,

  Line: styled.hr`
    margin: 0;
    border: none;
    height: 4px;
    ${({ theme }) => `
      background-color: ${theme.textColor};
    `}
  `,
};

export default Title;
