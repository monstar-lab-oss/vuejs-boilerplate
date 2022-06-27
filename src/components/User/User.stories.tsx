import User from "./User.vue";
import { Meta, Story } from "@storybook/vue3";

export default {
  title: "Components/User",
  argTypes: {
    backgroundColor: { control: "color" },
    size: {
      options: ["small", "medium", "large"],
      control: "select",
    },
  },
} as Meta;

const Template: Story = (args) => ({
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
