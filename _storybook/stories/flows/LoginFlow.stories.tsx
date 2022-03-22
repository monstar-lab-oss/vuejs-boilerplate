import { expect } from "@storybook/jest";
import { within, waitFor } from "@storybook/testing-library";
import vueRouter from "storybook-vue3-router";

import App from "@app/App.vue";
import { routes } from "@app/router";
import {
  playUserEvent as userEvent,
  sleep,
} from "@stb/custom/customUserEvent/customUserEvent";

export const Start = () => ({
  template: `<App />`,
  components: { App }
})
Start.parameters = {
  layout: "fullscreen",
};
Start.decorators = [
  vueRouter(routes, {
    initialRoute: ''
  })
]

export const Form = Start.bind({});
Form.play = async context => {
  const canvas = within(context.canvasElement);

  const emailField = await canvas.getByLabelText('メール');
  await userEvent.type(emailField, "address@email.com", { delay: 50 });

  const passwordField = canvas.getByLabelText('パスワード');
  await userEvent.type(passwordField, "~password", { delay: 50 });
};

export const Submit = Start.bind({});
Submit.play = async context => {
  // eslint-disable-next-line storybook/await-interactions
  await Form?.play?.(context);

  const canvas = within(context.canvasElement);
  const verifyBtn = await canvas.findByTestId("loginBtn");
  await userEvent.click(verifyBtn);
};

export default {
  title: "User flows/Log in",
  component: App,
  parameters: {
    layout: "fullscreen",
  }
};