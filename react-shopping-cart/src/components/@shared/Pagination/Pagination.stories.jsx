import Pagination from 'components/@shared/Pagination/Pagination';
import PaginationButton from 'components/@shared/PaginationButton/PaginationButton';

export default {
  title: 'Pagination',
  component: Pagination,
};

export const DefaultPagination = (args) => <Pagination {...args}></Pagination>;

const paginationList = Array.from({ length: 5 }).map((_, index) => (
  <PaginationButton key={index + 1}>{index + 1}</PaginationButton>
));

DefaultPagination.args = {
  children: paginationList,
};
