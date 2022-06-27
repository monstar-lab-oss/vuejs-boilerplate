import Header from "./Header.vue";
import { Meta, Story } from "@storybook/vue3";

export default {
  title: "components/Header",
} as Meta;

const Template: Story = (args) => ({
  components: { Header },
  setup() {
    return { args };
  },
  template: '<Header v-bind="args" />',
});

export const Primary = Template.bind({});
