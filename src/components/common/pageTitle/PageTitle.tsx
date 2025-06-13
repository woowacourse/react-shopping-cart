import * as S from './PageTitle.styles';

interface PageTitleProps {
  title: string;
  description?: string | null;
}

function PageTitle({ title, description }: PageTitleProps) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {description && (
        <S.Description>
          {description.split('\\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </S.Description>
      )}
    </S.Container>
  );
}

export default PageTitle;
