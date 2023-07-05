import { routes } from "@/router";
import { Meta, Story } from "@storybook/vue3";
import App from "@/App.vue";
import vueRouter from "storybook-vue3-router";
import Home from "./Home.vue";

export default {
  title: "Pages/Main/Home",
} as Meta;

const Template: Story = (args) => ({
  components: { Home },
  setup() {
    return { args };
  },
  template: '<Home v-bind="args" />',
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
    initialRoute: '/main/'
  })
]

export const Default = Template.bind({});
