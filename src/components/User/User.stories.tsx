import User from "./User.vue";

const Template = (args: any) => ({
  components: { User },
  setup() {
    return { args };
  },
  template: '<User v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  avatar: "assets/images/7-image.jpg",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com",
};

export const NoAvatar = Template.bind({});
NoAvatar.args = {
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export default {
  title: "Components/User",
  component: User,
  args: {},
  argTypes: {
    backgroundColor: { control: "color" },
    size: {
      options: ["small", "medium", "large"],
      control: "select",
    },
  },
};
