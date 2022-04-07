import { routes } from "@/router";
import App from "@/App.vue";
import { rest } from "msw";
import vueRouter from "storybook-vue3-router";
import Users from "./Users.vue";

const Template = (args: any) => ({
  components: { Users },
  setup() {
    return { args };
  },
  template: '<Users v-bind="args" />'
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
    initialRoute: '/main/users'
  })
]

export const Default = Template.bind({});

export const NoResults = Template.bind({});
NoResults.parameters = {
  msw: {
    handlers: [
      rest.get(`${import.meta.env.VITE_API_HOST}users`, (req, res, ctx) => {
        return res(ctx.delay(0), ctx.json({ total: 0 }));
      }),
    ],
  },
};

export default {
  title: "Pages/Main/Users",
  component: Users,
  args: {},
};
