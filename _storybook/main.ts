const path = require("path");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "./stories/**/*.stories.mdx",
    "./stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
    "@storybook/addon-controls",
  ],
  features: {
    interactionsDebugger: true,
  },
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-vite",
  },

  async viteFinal(config) {
    return {
      ...config,
      plugins: [...config.plugins, require("@vitejs/plugin-vue")],
      resolve: {
        alias: {
          vue: "vue/dist/vue.esm-bundler.js",
          "@": path.resolve(__dirname, "../src"),
          "@app": path.resolve(__dirname, "../src"),
          "@stb": path.resolve(__dirname, "../_storybook"),
          "@mocks": path.resolve(__dirname, "../_mocks"),
        },
      },
    };
  },
};
