import PaginationButton from 'components/@shared/PaginationButton/PaginationButton';

export default {
  title: 'PaginationButton',
  component: PaginationButton,
};

export const DefaultPaginationButton = (args) => (
  <PaginationButton {...args}>1</PaginationButton>
);
DefaultPaginationButton.args = {};
