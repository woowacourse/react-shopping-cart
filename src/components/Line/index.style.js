import styled from 'styled-components';

const Styled = {
  Line: styled.hr`
    width: ${({ width }) => width || '640px'};
    height: ${({ height }) => height || '1px'};
    background-color: ${({ theme, color }) => color || theme.colors.black};
    margin: ${({ margin }) => margin || '0px'};
  `,
};

export default Styled;
