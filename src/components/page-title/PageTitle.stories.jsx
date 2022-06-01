import PageTitle from "./PageTitle";

export default {
  title: "PageTitle/PageTitle",
  component: PageTitle,
  argTypes: {
    children: {
      name: "title",
      type: {
        name: "string",
        required: true,
      },
      defaultValue: "Page Title",
    },
  },
};

function Template({ children, ...rest }) {
  console.log("rest : ", rest);
  console.log("title : ", children);
  return <PageTitle {...rest}>{children}</PageTitle>;
}

export const Primary = Template.bind({});

Primary.args = {
  title: "",
};
