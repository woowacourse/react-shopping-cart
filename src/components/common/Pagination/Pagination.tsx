import Button from '@/components/common/Button/Button';
import theme from '@/styles/Theme';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import * as Styled from './Pagination.style';

function Pagination() {
  const pageCount = useSelector(({ product }) => product.pageCount);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? 1;
  return (
    <Styled.Container>
      <Styled.Inner>
        {Array.from({ length: pageCount }).map((_, index) => {
          const page = index + 1;
          const isCurrent = page === Number(currentPage);

          return (
            <Link key={index} to={`./?page=${page}`}>
              <Button
                backgroundColor={isCurrent ? theme.brandColor_1 : 'transparent'}
                fontColor={isCurrent ? theme.whiteColor_1 : theme.brandColor_1}
                padding="20px"
              >
                {page}
              </Button>
            </Link>
          );
        })}
      </Styled.Inner>
    </Styled.Container>
  );
}

export default Pagination;
