import Pagination from 'components/@shared/Pagination/Pagination';
import PaginationButton from 'components/@shared/PaginationButton/PaginationButton';

export default {
  title: 'Pagination',
  component: Pagination,
};

export const DefaultPagination = (args) => <Pagination {...args}></Pagination>;

DefaultPagination.args = {
  children: [
    <PaginationButton>1</PaginationButton>,
    <PaginationButton>2</PaginationButton>,
    <PaginationButton>3</PaginationButton>,
    <PaginationButton>4</PaginationButton>,
    <PaginationButton>5</PaginationButton>,
    <PaginationButton>6</PaginationButton>,
  ],
};
