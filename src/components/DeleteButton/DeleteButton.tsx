import * as S from './styled';

const DeleteButton = (props: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>) => {
  return (
    <S.Button type="button" {...props}>
      삭제
    </S.Button>
  );
};

export default DeleteButton;
