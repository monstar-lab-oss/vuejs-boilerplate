import Login from "./Login.vue";

import App from "@/App.vue";
import vueRouter from "storybook-vue3-router";
import { routes } from "@/router";

const Template = (args: any) => ({
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

export default {
  title: "Pages/Login",
  component: Login,
  args: {},
};