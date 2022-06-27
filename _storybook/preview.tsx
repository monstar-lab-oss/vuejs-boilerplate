import { app } from "@storybook/vue3";
import { initialize, mswDecorator } from "msw-storybook-addon";
import vueRouter from 'storybook-vue3-router'
import { allHandlers } from "@mocks/handlers";
import { createI18n } from "@app/i18n";
import ImageLoader from "@app/components/ImageLoader/ImageLoader.vue";
import User from "@app/components/User/User.vue";
import { VApp, VAppBar, VAvatar, VBtn, VCard, VCardActions, VCardSubtitle, VCardText, VCardTitle, VCol, VContainer, VFooter, VForm, VImg, VListItem, VListItemAvatar, VListItemHeader, VListItemSubtitle, VListItemTitle, VMain, VRow, VSheet, VSpacer, VTextField } from "vuetify/components";
import vuetify from "@app/plugins/vuetify";
import { loadFonts } from "@app/plugins/webfontloader";
import { routes } from "@app/router/index";
import * as jest from "jest-mock";
import 'vuetify/dist/vuetify.min.css'
import "@app/assets/styles/styles.scss";
import "./assets/styles/storybook.scss";

window.jest = jest;

initialize({
  onUnhandledRequest: "bypass",
});

loadFonts();

const i18n = createI18n()

app.use(vuetify).use(i18n);

app.component("app-image-loader", ImageLoader);
app.component("app-user", User);
app.component("v-app", VApp);
app.component("v-app-bar", VAppBar);
app.component("v-avatar", VAvatar);
app.component("v-btn", VBtn);
app.component("v-card", VCard);
app.component("v-card-actions", VCardActions);
app.component("v-card-text", VCardText);
app.component("v-card-title", VCardTitle);
app.component("v-card-subtitle", VCardSubtitle);
app.component("v-col", VCol);
app.component("v-container", VContainer);
app.component("v-footer", VFooter);
app.component("v-form", VForm);
app.component("v-list-item", VListItem);
app.component("v-list-item-avatar", VListItemAvatar);
app.component("v-list-item-header", VListItemHeader);
app.component("v-list-item-subtitle", VListItemSubtitle);
app.component("v-list-item-title", VListItemTitle);
app.component("v-main", VMain);
app.component("v-img", VImg);
app.component("v-row", VRow);
app.component("v-sheet", VSheet);
app.component("v-spacer", VSpacer);
app.component("v-text-field", VTextField);

export const decorators = [
  mswDecorator,
  () => ({
    template: "<v-app><story /></v-app>",
  }),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: {
    handlers: allHandlers,
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "StyleGuide",
        ["Typography", "Button"],
        "Components",
        "Pages",
        "User flows",
      ],
    },
  },
};
