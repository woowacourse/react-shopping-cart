import * as S from './RemoteArea.styled';
import CheckBox from '@/shared/ui/CheckBox';

interface RemoteAreaProps {
  isChecked: boolean;
  onClick: () => void;
}

export default function RemoteArea({ isChecked, onClick }: RemoteAreaProps) {
  return (
    <S.Container>
      <S.Title>배송 정보</S.Title>
      <S.CheckBoxContainer>
        <CheckBox
          isChecked={isChecked}
          onClick={onClick}
          aria-label="제주도 및 도서 산간 지역 선택"
        />
        <S.CheckBoxText>제주도 및 도서 산간 지역</S.CheckBoxText>
      </S.CheckBoxContainer>
    </S.Container>
  );
}
