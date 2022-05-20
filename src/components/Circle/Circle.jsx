import styled from 'styled-components';
import PropTypes from 'prop-types';

Circle.propTypes = {
  children: PropTypes.number,
};

export default function Circle({ children }) {
  return <Styled.Circle>{children}</Styled.Circle>;
}

const Styled = {
  Circle: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    background-color: #0a80ff;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
    margin: 0 10px 0 5px;
  `,
};
