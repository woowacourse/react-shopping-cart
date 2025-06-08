import * as S from './InfoLabel.style';

interface InfoLabelProps {
  description: string;
}

export default function InfoLabel({ description }: InfoLabelProps) {
  return (
    <S.InfoLabel>
      <S.InfoIcon src="./infoLabelIcon.svg" alt="InfoLabel Icon" />
      {description}
    </S.InfoLabel>
  );
}
