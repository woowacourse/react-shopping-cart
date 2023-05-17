import { useLocation } from 'react-router-dom';
import { PAGE_TITLE } from '../../../constants/routes';
import * as S from './PageTitle.styles';

const PageTitle = () => {
  const { pathname } = useLocation();

  const title = PAGE_TITLE[pathname as keyof typeof PAGE_TITLE];

  return (
    <S.Root>
      <S.Name>{title}</S.Name>
    </S.Root>
  );
};

export default PageTitle;
