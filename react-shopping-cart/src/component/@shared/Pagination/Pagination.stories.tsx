import PaginationButton from "component/@shared/PaginationButton/PaginationButton";
import Pagination from "component/@shared/Pagination/Pagination";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Pagination",
  component: Pagination,
} as Meta;

export const DefaultPagination: Story = () => <Pagination></Pagination>;

DefaultPagination.args = {
  children: [
    <PaginationButton to="/1">1</PaginationButton>,
    <PaginationButton to="/2">2</PaginationButton>,
    <PaginationButton to="/3">3</PaginationButton>,
    <PaginationButton to="/4">4</PaginationButton>,
    <PaginationButton to="/5">5</PaginationButton>,
  ],
};
