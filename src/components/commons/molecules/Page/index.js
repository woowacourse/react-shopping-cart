import * as Styled from './style.js';

export const Page = (props) => {
  const { children } = props;
  return (
    <>
      <Styled.Page>
        <Styled.Container>{children}</Styled.Container>
      </Styled.Page>
    </>
  );
};
