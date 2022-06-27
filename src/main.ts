import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setupWorker } from "msw";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import ImageLoader from "@/components/ImageLoader/ImageLoader.vue";
import User from "@/components/User/User.vue";

import "./assets/styles/styles.scss";
import { createI18n } from "./i18n";

loadFonts();

const i18n = createI18n()

createApp(App)
  .use(vuetify)
  .use(store)
  .use(router)
  .use(i18n)
  .component("app-image-loader", ImageLoader)
  .component("app-user", User)
  .mount("#app");

if (import.meta.env.DEV) {
  const handlers = await import("@mocks/handlers");
  let workerHandlers = handlers.handlers;
  if (import.meta.env.VITE_LOCAL_MOCKS) {
    workerHandlers = handlers.allHandlers;
  }
  setupWorker(...workerHandlers).start({ onUnhandledRequest: "bypass" });
}
