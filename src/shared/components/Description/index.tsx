import * as S from './Description.styled';
import InfoIcon from '@assets/icons/info.svg';

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <S.Container>
      <S.Image src={InfoIcon} alt="설명 아이콘" />
      <S.Text>{description}</S.Text>
    </S.Container>
  );
}
