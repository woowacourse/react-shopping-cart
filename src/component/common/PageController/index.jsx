import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function PageController({ pageLength, currentPage, onPageChange }) {
  const onButtonClick = event => {
    const order = event.target.name;
    onPageChange(order);
  };

  return (
    <Styled.ControlButtonBox>
      {Array.from({ length: pageLength }).map((_, index) => (
        <Styled.ControlButton
          key={Math.random()}
          name={index + 1}
          clicked={index + 1 === currentPage}
          onClick={onButtonClick}
        >
          {index + 1}
        </Styled.ControlButton>
      ))}
    </Styled.ControlButtonBox>
  );
}

PageController.defaultProps = {
  pageLength: 1,
  currentPage: 1,
};

PageController.propTypes = {
  pageLength: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

const Styled = {
  ControlButtonBox: styled.div`
    display: flex;
    gap: 10px;
  `,

  ControlButton: styled.button`
    width: 50px;
    height: 50px;
    font-size: 30px;
    border: none;
    border-radius: 50%;
    background-color: ${props => (props.clicked ? 'skyblue' : 'transparent')};
    color: ${props => (props.clicked ? 'white' : 'black')};
    cursor: pointer;
  `,
};
