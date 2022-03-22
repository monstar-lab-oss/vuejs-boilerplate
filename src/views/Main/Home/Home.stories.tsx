import { routes } from "@/router";
import App from "@/App.vue";
import vueRouter from "storybook-vue3-router";
import Home from "./Home.vue";

const Template = (args: any) => ({
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

export default {
  title: "Pages/Main/Home",
  component: Home,
  args: {},
};
