import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { Meta, Story } from "@storybook/vue3";
import vueRouter from "storybook-vue3-router";

import App from "@app/App.vue";
import { routes } from "@app/router";
import {
  playUserEvent as userEvent,
  sleep,
} from "@stb/custom/customUserEvent/customUserEvent";

export default {
  title: "User flows/Log in",
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    vueRouter(routes, {
      initialRoute: "",
    }),
  ],
} as Meta;

const Default: Story = () => ({
  template: `<App />`,
  components: { App },
});

export const Start = Default.bind({});

export const Form = Start.bind({});
Form.play = async context => {
  await sleep();
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

export const TestError = Start.bind({});
TestError.play = async context => {
  const testError = within(context.canvasElement).getByTestId('testError');
  await expect(testError).toBeInTheDocument();
};