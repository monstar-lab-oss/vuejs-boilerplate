import Footer from "./Footer.vue";

export default {
  title: "components/Footer",
  component: Footer,
};

const Template = (args: any) => ({
  components: { Footer },
  setup() {
    return { args };
  },
  template: '<Footer v-bind="args" />',
});

export const Primary = Template.bind({});
