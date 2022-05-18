import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleHeader = ({ children }) => {
  return (
    <Styled.Header>
      <Styled.TitleText>{children}</Styled.TitleText>
      <Styled.DivideLine />
    </Styled.Header>
  );
};

TitleHeader.propTypes = {
  children: PropTypes.string,
};

const Styled = {
  Header: styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  `,

  TitleText: styled.h2`
    font-weight: 600;
    font-size: 24px;
  `,

  DivideLine: styled.hr`
    width: 100%;
    border: 2px solid #000;
    margin-top: 20px;
    background-color: #000;
  `,
};

export default TitleHeader;
