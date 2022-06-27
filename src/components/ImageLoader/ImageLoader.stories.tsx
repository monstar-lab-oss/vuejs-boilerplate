import { Meta, Story } from "@storybook/vue3";
import ImageLoader from "./ImageLoader.vue";

export default {
  title: "Components/ImageLoader",
} as Meta;

const Template: Story = (args) => ({
  components: { ImageLoader },
  setup() {
    return { args };
  },
  template: '<ImageLoader v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  src: "assets/images/7-image.jpg",
};
