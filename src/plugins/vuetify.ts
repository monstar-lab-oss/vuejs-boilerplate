import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify, ThemeDefinition } from "vuetify";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#fafafa",
    surface: "#ffffff",
    primary: "#ffff00",
    secondary: "#656a6d",
    error: "#f44336",
    info: "#2196f3",
    success: "#4caf50",
    warning: "#ff9800",
  },
  variables: {}
};

export default createVuetify({
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
  defaults: {
    VSheet: {
      elevation: 4,
    },
  },
});
