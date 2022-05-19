import Footer from "./Footer.vue";
import { Meta, Story } from "@storybook/vue3";

export default {
  title: "components/Footer",
} as Meta;

const Template: Story = (args) => ({
  components: { Footer },
  setup() {
    return { args };
  },
  template: '<Footer v-bind="args" />',
});

export const Primary = Template.bind({});
