import { routes } from "@/router";
import { Meta, Story } from "@storybook/vue3";
import App from "@/App.vue";
import vueRouter from "storybook-vue3-router";
import NotFound from "./NotFound.vue";

export default {
  title: "Pages/404",
} as Meta;

const Template: Story = (args) => ({
  components: { NotFound },
  setup() {
    return { args };
  },
  template: '<NotFound v-bind="args" />',
});

export const Page = () => ({
  template: `<App />`,
  components: { App }
})
Page.parameters = {
  layout: "fullscreen",
};
Page.decorators = [
  vueRouter(routes, {
    initialRoute: '/404'
  })
]

export const Default = Template.bind({});