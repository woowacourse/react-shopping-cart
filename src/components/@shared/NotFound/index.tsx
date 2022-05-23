import * as S from "./styles";

import emptyPage from "assets/emptyPage.jpeg";

function NotFound() {
  return (
    <S.Content>
      <S.EmptyPageImage alt="emptyPage" src={emptyPage} />
    </S.Content>
  );
}

export default NotFound;
