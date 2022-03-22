import { routes } from "@/router";
import App from "@/App.vue";
import vueRouter from "storybook-vue3-router";
import NotFound from "./NotFound.vue";

const Template = (args: any) => ({
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

export default {
  title: "Pages/404",
  component: NotFound,
  args: {},
};
