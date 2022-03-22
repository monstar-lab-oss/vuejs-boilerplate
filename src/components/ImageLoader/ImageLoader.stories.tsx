import { rest } from "msw";
import ImageLoader from "./ImageLoader.vue";

const Template = (args: any) => ({
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

export default {
  title: "Components/ImageLoader",
  component: ImageLoader,
  args: {},
};
