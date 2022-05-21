import styled from 'styled-components';

import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';

function ErrorPage() {
  return (
    <FlexWrapper>
      <Styled.ErrorMessage>
        현재 사이트를 이용할 수 없습니다. 관리자에게 문의부탁드립니다😥😥
      </Styled.ErrorMessage>
    </FlexWrapper>
  );
}

const Styled = {
  ErrorMessage: styled.div`
    position: absolute;
    top: 50%;
  `,
};

export default ErrorPage;
