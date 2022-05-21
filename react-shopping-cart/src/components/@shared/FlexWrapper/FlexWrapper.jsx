import styled from 'styled-components';

//THINK: 이렇게 일일이 내려주는 게 맞나? (직관적으로?)
function FlexWrapper({
  flexDirection = 'row',
  width,
  height,
  gap,
  mt,
  mb,
  ml,
  mr,
  padding,
  border,
  bt,
  bColor,
  children,
  ...props
}) {
  return (
    <Styled.Root
      width={width}
      flexDirection={flexDirection}
      height={height}
      gap={gap}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      padding={padding}
      border={border}
      bt={bt}
      bColor={bColor}
      {...props}
    >
      {children}
    </Styled.Root>
  );
}

export default FlexWrapper;

const Styled = {
  Root: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${({ flexDirection }) => flexDirection};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    gap: ${({ gap }) => gap};
    margin-top: ${({ mt }) => mt};
    margin-bottom: ${({ mb }) => mb};
    margin-left: ${({ ml }) => ml};
    margin-right: ${({ mr }) => mr};
    padding: ${({ padding }) => padding};
    border: ${({ border }) => border};
    border-top: ${({ bt }) => bt};
    border-color: ${({ bColor, theme }) => bColor && theme.colors[bColor]};
  `,
};
