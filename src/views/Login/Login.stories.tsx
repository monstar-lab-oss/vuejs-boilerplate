import Login from "./Login.vue";
import { Meta, Story } from "@storybook/vue3";

import App from "@/App.vue";
import vueRouter from "storybook-vue3-router";
import { routes } from "@/router";

export default {
  title: "Pages/Login",
} as Meta;

const Template: Story = (args) => ({
  components: { Login },
  setup() {
    return { args };
  },
  template: '<Login v-bind="args" />',
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
    initialRoute: ''
  })
]

export const Default = Template.bind({});