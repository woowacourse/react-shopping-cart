import styled, { css } from 'styled-components';

const Flex = styled.div`
  ${({
    direction = 'row',
    wrap = 'nowrap',
    align = 'normal',
    justify = 'normal',
    gap = '0',
  }) => css`
    display: flex;
    flex-direction: ${direction};
    flex-wrap: ${wrap};
    align-items: ${align};
    justify-content: ${justify};
    gap: ${gap};
  `}
`;

export default Flex;
