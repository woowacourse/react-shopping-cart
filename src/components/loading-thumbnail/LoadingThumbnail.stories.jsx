import LoadingThumbnail from "./LoadingThumbnail";

export default {
  title: "Thumbnail/loading-thumbnail",
  component: LoadingThumbnail,
  argTypes: {
    src: {
      control: { type: 'string' },
    },
  },
};

const Template = (args) => {
  return (
    <div style={{width: '300px'}}>
      <LoadingThumbnail {...args} />
    </div>
  )
};

export const Primary = Template.bind({});

Primary.args = {
  src: "https://place-hold.it/300x300",
};
