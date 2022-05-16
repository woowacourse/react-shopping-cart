import styled, { css } from 'styled-components';

const Flex = styled.div`
  ${({
    direction = 'row',
    wrap = 'nowrap',
    justify = 'normal',
    align = 'normal',
    gap = '0',
  }) => css`
    display: flex;
    flex-direction: ${direction};
    flex-wrap: ${wrap};
    justify-content: ${justify};
    align-items: ${align};
    gap: ${gap};
  `}
`;

export default Flex;
