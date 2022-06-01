import * as Styled from './CustomerFormTemplate.style';

function CustomerFormTemplate({ formTitle, onSubmit, children }) {
  return (
    <Styled.Container>
      <Styled.FormTitle>{formTitle}</Styled.FormTitle>
      <Styled.Form onSubmit={onSubmit}>{children}</Styled.Form>
    </Styled.Container>
  );
}

export default CustomerFormTemplate;
