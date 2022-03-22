import Header from "./Header.vue";

export default {
  title: "components/Header",
  component: Header,
};

const Template = (args: any) => ({
  components: { Header },
  setup() {
    return { args };
  },
  template: '<Header v-bind="args" />',
});

export const Primary = Template.bind({});
