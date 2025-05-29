import BackButton from '@/shared/components/BackButton/BackButton';
import * as S from './OrderSuccessPage.styled';
import Header from '@/shared/components/Header/Header';

export default function OrderSuccessPage() {
  return (
    <>
      <Header>
        <BackButton />
      </Header>
      <S.Container>
        <S.PayConfirmButton disabled={true} type="button">
          결제하기
        </S.PayConfirmButton>
      </S.Container>
    </>
  );
}
