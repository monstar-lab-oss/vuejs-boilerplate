# Vue install guide
The following guide helps set up a vue 3 project with the most commonly used libraries.
## Contents
***is optional**

- [x] [vsc extensions](#extensions)
- [x] [create vue](#create-vue)
- [x] [prettier](#prettier)
- [x] [.env files](#env-files)
- [x] [typescript](#typescript)
- [x] [plugins](#plugins)
- [x] [webfonts](#webfonts)*
- [x] [sass](#sass)
- [x] [axios](#axios)
- [x] [example files](#example-files)
  - [x] [router](#router)
  - [x] [transitions](#transitions)*
- [x] [vuetify](#vuetify)*
- [x] [ant design](#ant-design)*
- [x] [tailwind css](#tailwind-css)*
- [x] [pinia](#data-store)*
  - [x] [share state across tabs](#share-store-state-across-tabs)*
- [x] [i18n](#i18n)*
- [x] [vue query](#vue-query)*
- [x] [msw](#msw)*
- [x] [graphql](#graphql)*
- [x] [unit tests](#unit-tests)*
  - [x] [with msw](#with-msw)
- [x] [e2e tests](#e2e-tests)*
  - [x] [with msw](#with-msw-1)
- [x] [storybook](#storybook)*
  - [x] [plugins](#plugins-1)
  - [x] [router](#router-1)
  - [x] [pinia](#pinia)
  - [x] [i18n](#i18n-1)
  - [x] [vue query](#vue-query-1)
  - [x] [msw](#msw-1)
  - [x] [graphql](#graphql-1)
  - [x] [tests](#e2e-tests-1)
  - [x] [other addons](#other-addons)
- [x] [authentication](#authentication)
  - [x] [vuetify](#vuetify-1)
  - [x] [msw](#msw-3)
  - [x] [storybook](#storybook-1)
- [x] [other libraries](#other-libraries)
- [x] [unused files](#unused-files-that-can-be-deleted)
- [x] [folder structure](#folder-structure)

## Todos
- [ ] vue query response type and refactor graphql example
- [ ] folder and file naming
- [ ] write better test and align with storybook
- [ ] fix playwright chromium with skysea (remove the `--disable-extensions` switch when launching chromium)
- [ ] fix playwright firefox not using msw
- [ ] test build
- [ ] import .mocks data or hardcode in test
- [ ] prettier differences with autoformat
- [ ] storybook explanations in readme
- [ ] fix tsconfig "class" error when adding .storybook to the includes
- [ ] refactor roles update in storybook
- [ ] error pages
## VSC extensions
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Vue devtools for chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)

## Create Vue
[Create vue cli](https://github.com/vuejs/create-vue)

```sh
npm create vue@3
```

Use the following settings:
- Add TypeScript? **Yes**
- Add JSX Support? **Yes***
- Add Vue Router for Single Page Application development? **Yes**
- Add Pinia for state management? **Yes***
- Add Vitest for Unit Testing? **Yes***
- Add an End-to-End Testing Solution? » - Use arrow-keys. Return to submit. **Playwright***
- Add ESLint for code quality? **Yes**
- Add Prettier for code formatting? **Yes**

```sh
cd project-name
```
```sh
npm install
```
```sh
npm run lint
```
```sh
npm run dev
```

## Prettier
[Prettier](https://prettier.io/)

Update `.prettierrc.json`
```json
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "none",
  "printWidth": 120
}
```

## .env files
Add the following to `.gitignore`
```diff
+ # local env files
+ .env
```
Create `.env`
```
VITE_API_HOST=https://reqres.in/api/
```
Create `.env.example`
```
VITE_API_HOST=api base path
```

## Typescript
[Typescript](https://www.typescriptlang.org/)

Create `src/models/examples.types.ts`
```ts
export type Example = {
  id: number
  name: string
  year: number
  color: string
  pantone_value: string
}

export type ExamplesGetResponse = {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Example[]
}
```

## Plugins
*Create a separate plugins folder similar to vuetify cli*

Create `src/plugins/index.ts`
```ts
// Plugins
import router from '@/router'
import { createPinia } from 'pinia'

// Styles
import '@/assets/main.css'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app.use(router).use(createPinia())
}
```

Update `src/main.ts`
```diff
import { createApp } from 'vue'
- import { createPinia } from 'pinia'

import App from './App.vue'
- import router from './router'
+ import { registerPlugins } from '@/plugins'

- import './assets/main.css'

const app = createApp(App)

- app.use(createPinia())
- app.use(router)
+ registerPlugins(app)

app.mount('#app')
```

## Webfonts
[Webfonts](https://www.npmjs.com/package/webfontloader)

```sh
yarn add webfontloader; yarn add -D @types/webfontloader
```

Create `src/plugins/webfontloader.ts`
```ts
/**
 * plugins/webfontloader.ts
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */ 'webfontloader')

  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap']
    }
  })
}
```

Update `src/plugins/index.ts`
```diff
// Plugins
+ import { loadFonts } from './webfontloader'

export function registerPlugins(app: App) {
+  loadFonts()
```

## Sass
[Sass](https://sass-lang.com/)

```sh
yarn add -D sass sass-loader
```

Create `src/assets/styles/styles.scss`
```scss
  @import 'main.css';
```

Move the following files

`src/assets/base.css` => `src/assets/styles/base.css`

`src/assets/main.css` => `src/assets/styles/main.css`

Update `src/plugins/index.ts`
```diff
- import '@/assets/main.css'
+ import '@/assets/styles/styles.scss'
```

## Axios
[Axios](https://github.com/axios/axios)

```sh
yarn add axios
```

Create `src/services/api.service.ts`
```ts
import axios from 'axios'

// api without authorization header
export const oApi = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: { 'Content-Type': 'application/json' }
})

export default oApi
```

## Example files
Create `src/components/Example/ExampleComponent.vue`
```vue
<template>
  <div>
    <h2>
      {{ example.name }}
    </h2>
    <p>
      <span :style="{ backgroundColor: example.color }" class="color" />{{
        example.pantone_value
      }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Example } from '@/models/examples.types'

defineProps({
  example: {
    type: Object as PropType<Example>,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.color {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
}
</style>
```
Create `src/views/ExampleView/ExampleView.vue`
```vue
<template>
  <div>
    <h1>Example</h1>
    <h2>Pinia</h2>
    <div>count: {{ counter.count }}</div>
    <button @click="counter.increment">Increment</button>
    <h2>Api call</h2>
    <div v-if="query.isLoading">Loading...</div>
    <div v-else-if="query.isError">An error has occurred: {{ query.error }}</div>
    <div v-if="query.data">
      <ExampleComponent v-for="example in query.data" :key="example.id" :example="example" class="examples" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import oApi from '@/services/api.service'
import type { ExamplesGetResponse } from '@/models/examples.types'
import ExampleComponent from '@/components/Example/ExampleComponent.vue'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

const query = ref()

async function getExample() {
  try {
    query.value = { isLoading: true }
    const { data } = await oApi.get<ExamplesGetResponse>(`${import.meta.env.VITE_API_HOST}examples`)
    query.value = data
    return data
  } catch (error) {
    if (oApi.isAxiosError(error)) {
      query.value = { isError: error.message }
      console.log('error message: ', error.message)
      return error.message
    } else {
      query.value = { isError: error }
      console.log('unexpected error: ', error)
      return 'An unexpected error occurred'
    }
  }
}

onBeforeMount(() => {
  getExample()
})
</script>
```

### Router
[Vue router](https://router.vuejs.org/)

Update `src/router/index.ts`
```diff
[
-  {
-   path: '/about',
-   name: 'about',
-   // route level code-splitting
-   // this generates a separate chunk (About.[hash].js) for this route
-   // which is lazy-loaded when the route is visited.
-   component: () => import('../views/AboutView.vue')
-  }
+  {
+   path: '/example',
+   name: 'example',
+   component: () => import('@/views/ExampleView/ExampleView.vue')
+  }
]
```

Update `src/App.vue`
```diff
- <script setup lang="ts">
- import { RouterLink, RouterView } from 'vue-router'
- import HelloWorld from './components/HelloWorld.vue'
- </script>
-
-<template>
- <header>
-   <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
-
-   <div class="wrapper">
-     <HelloWorld msg="You did it!" />
-
-     <nav>
-       <RouterLink to="/">Home</RouterLink>
-       <RouterLink to="/about">About</RouterLink>
-     </nav>
-   </div>
- </header>
-
- <RouterView />
- </template>
+<template>
+ <header>
+   <div class="wrapper">
+     <nav>
+       <router-link to="/">Home</router-link>
+       <router-link to="/example">Example</router-link>
+     </nav>
+   </div>
+ </header>
+ <div class="fade_container">
+   <router-view v-slot="{ Component }">
+     <transition name="fade">
+       <component :is="Component" :key="$route.path" />
+     </transition>
+   </router-view>
+ </div>
+</template>
+
+<script setup lang="ts" />
```

### Transitions
[Router transitions](https://router.vuejs.org/guide/advanced/transitions.html)

Create `src/assets/styles/_transitions.scss`
```scss
.fade_container {
  display: flex;

  > * {
    width: 100%;
    flex-shrink: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-active:not(:first-of-type) {
  margin-left: -100%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```
Update `src/assets/styles/styles.scss`
```diff
+ @import 'transitions';
```
## Vuetify
[Vuetify](https://next.vuetifyjs.com/en/)

```sh
yarn add vuetify@next @mdi/font; yarn add -D vite-plugin-vuetify
```

[Theme](https://next.vuetifyjs.com/en/features/theme/)

Create `src/plugins/vuetify.ts`
```ts
/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6'
        }
      }
    }
  }
})
```

Update `src/plugins/index.ts`
```diff
+ import vuetify from './vuetify'
import router from '@/router'

app
+ .use(vuetify)
```

Replace `src/App.vue`
```ts
<template>
  <v-app>
    <v-toolbar>
      <v-btn :to="{ name: 'home' }" exact>Home</v-btn>
      <v-btn :to="{ name: 'example' }">Example</v-btn>
    </v-toolbar>
    <v-main class="fade_container">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts" />
```

Update `vite.config.ts`
```diff
import vueJsx from '@vitejs/plugin-vue-jsx'
+ import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

plugins: [
- vue(),
+ vue({
+   template: { transformAssetUrls }
+ }),
  vueJsx(),
+ vuetify({
+   autoImport: true
+ })
],
```

Update `src/views/ExampleView/ExampleView.vue`
```diff
- <button @click="counter.increment">Increment</button>
+ <v-btn @click="counter.increment">Increment</v-btn>
```

## Ant design
[Vue Ant design](https://antdv.com/docs/vue/introduce)
```sh
yarn add ant-design-vue; yarn add -D less
```

Update `src/plugins/index.ts`
```diff
+ import 'ant-design-vue/dist/antd.less'
import '@/assets/styles/styles.scss'
```

[Theme](https://2x.antdv.com/docs/vue/customize-theme)

Update `vite.config.ts`
```diff
+ css: {
+  preprocessorOptions: {
+   less: {
+     modifyVars: {
+       'primary-color': '#1DA57A'
+     },
+     javascriptEnabled: true
+   }
+ }
+}
```

### Tailwind css
[Tailwind css](https://v2.tailwindcss.com/docs/guides/vue-3-vite)

```sh
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

```sh
npx tailwindcss init -p
```

Create `src/assets/styles/tailwind.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Update `src/plugins/index.ts`
```diff
+ import '@/assets/styles/tailwind.css'
import '@/assets/styles/styles.scss'
```

Update `postcc.config.js`
```diff
+ /* eslint-env node */
module.exports = {
```

Update `tailwind.config.js`
```diff
+ /* eslint-env node */
/** @type {import('tailwindcss').Config} */

- content: [],
+ content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
```

## Data store
[Pinia](https://pinia.vuejs.org/)
### Share store state across tabs
Add [pinia-shared-state](https://www.npmjs.com/package/pinia-shared-state)
```sh
yarn add pinia-shared-state
```
Create `src/plugins/pinia.ts`
```ts
import { createPinia } from 'pinia'
import { PiniaSharedState } from 'pinia-shared-state'

const pinia = createPinia().use(PiniaSharedState({}))

export default pinia
```
Update `src/plugins/index.ts`
```diff
- import { createPinia } from 'pinia'
+ import pinia from './pinia'

- .use(createPinia())
+ .use(pinia)
```

## i18n
[Vue i18n](https://vue-i18n.intlify.dev/)
```sh
yarn add vue-i18n@9
```

Update `tsconfig.app.json`
```diff
  "include": [
+   "src/**/*.json",
  ],
```
Create `src/locales/en.json`
```json
{
  "header": {
    "home": "Home",
    "example": "Example"
  }
}
```
Create `src/locales/ja.json`
```json
{
  "header": {
    "home": "トップ",
    "example": "例"
  }
}
```
Create `src/plugins/i18n.ts`
```ts
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ja
  }
})

export default i18n
```
Update `src/plugins/index.ts`
```diff
import { createPinia } from 'pinia'
+ import i18n from "./i18n"

    .use(pinia)
+   .use(i18n)
```
Update `src/App.vue`
### Without Vuetify
```diff
+  <v-menu>
+     <template v-slot:activator="{ props }">
+       <v-btn icon="mdi-translate" v-bind="props"></v-btn>
+     </template>
+     <v-list>
+       <v-list-item
+         v-for="(locale, index) in $i18n.availableLocales"
+         :key="index"
+         :value="locale"
+         :variant="$i18n.locale === locale ? 'tonal' : 'plain'"
+         @click="$i18n.locale = locale"
+       >
+         <v-list-item-title>{{ locale }}</v-list-item-title>
+       </v-list-item>
+     </v-list>
+   </v-menu>
+ </v-toolbar>
```
### With Vuetify
```diff
  <v-btn :to="{ name: 'example' }">{{ $t('header.example') }}</v-btn>
+ <v-spacer></v-spacer>
+ <v-select v-model="$i18n.locale" :items="$i18n.availableLocales" label="i18n" density="compact"></v-select>
```
## Vue Query
[Vue query](https://vue-query.vercel.app/)

```sh
yarn add @tanstack/vue-query
```

Create `src/plugins/vuequery.ts`
```ts
import { VueQueryPlugin } from '@tanstack/vue-query'

const vueQuery = (): [any] => {
  return [VueQueryPlugin]
}

export default vueQuery
```

Update `src/plugins/index.ts`
```diff
// Plugins
+ import vueQuery from './vuequery'

    .use(pinia)
+   .use(...vueQuery)
```

Replace `src/views/ExampleView/ExampleView.vue`
```vue
<template>
  <div>
    <h1>Example</h1>
    <h2>Pinia</h2>
    <div>count: {{ counter.count }}</div>
    <button @click="counter.increment">Increment</button>
    <h2>Api call</h2>
    <!-- Loading -->
    <div v-if="query.isLoading">Loading...</div>

    <!-- Error -->
    <div v-else-if="query.isError">An error has occurred: {{ query.error }}</div>
  
    <!-- Result -->
    <div v-else-if="query.data">
      <ExampleComponent v-for="example in query.data.data" :key="example.id" :example="example" class="examples" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import oApi from '@/services/api.service'
import { useQuery } from '@tanstack/vue-query'
import type { QueryObserverResult } from '@tanstack/vue-query'
import type { ExamplesGetResponse } from '@/models/examples.types'
import ExampleComponent from '@/components/Example/ExampleComponent.vue'
import { useCounterStore } from '@/stores/counter'

/*
The `useQuery` type is `UseQueryReturnType` but causes the template to expect
`query.data.value` instead of `query.data.data` as is returned by `useQuery`

import type { UseQueryReturnType } from '@tanstack/vue-query'
const query = ref<UseQueryReturnType<ExamplesGetResponse, Error>>()

onBeforeMount(() => {
  query.value = useQuery<ExamplesGetResponse, Error>({
    queryKey: ['exampleFetch'],
    queryFn: exampleFetch
  })
})
*/

const counter = useCounterStore()

const query = ref<QueryObserverResult<ExamplesGetResponse, Error>>()

const exampleFetch = async (): Promise<ExamplesGetResponse[]> => {
  try {
    const response = await oApi.get(`${import.meta.env.VITE_API_HOST}examples`)
    return response.data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

onBeforeMount(() => {
  query.value = useQuery({
    queryKey: ['exampleFetch'],
    queryFn: exampleFetch
  }) as unknown as QueryObserverResult<ExamplesGetResponse, Error>
})
</script>
```
With Vuetify, update `src/views/ExampleView/ExampleView.vue`
```diff
- <button @click="counter.increment">Increment</button>
+ <v-btn @click="counter.increment">Increment</v-btn>
```

## MSW
[MSW](https://mswjs.io/)

```sh
yarn add -D msw
```

Update `tsconfig.app.json`
```diff
{
  "include": [
+   ".mocks/**/*",
+   ".mocks/**/*.json"
  ]

  "compilerOptions": [
    "paths": [
+     "@mocks/*": [
+       ".mocks/*"
+     ]
    ]
  ],
}
```

Update `vite.config.ts`
```diff
{
  resolve: [
    alias: [
+     '@mocks': fileURLToPath(new URL('./.mocks', import.meta.url))
    ]
  ]
}
```

Create `.mocks/api/examples/examples.json`
```json
{
  "page": 2,
  "per_page": 6,
  "total": 12,
  "total_pages": 2,
  "data": [
    {
      "id": 7,
      "name": "sand dollar",
      "year": 2006,
      "color": "#DECDBE",
      "pantone_value": "13-1106"
    },
    {
      "id": 8,
      "name": "chili pepper",
      "year": 2007,
      "color": "#9B1B30",
      "pantone_value": "19-1557"
    },
    {
      "id": 9,
      "name": "blue iris",
      "year": 2008,
      "color": "#5A5B9F",
      "pantone_value": "18-3943"
    },
    {
      "id": 10,
      "name": "mimosa",
      "year": 2009,
      "color": "#F0C05A",
      "pantone_value": "14-0848"
    },
    {
      "id": 11,
      "name": "turquoise",
      "year": 2010,
      "color": "#45B5AA",
      "pantone_value": "15-5519"
    },
    {
      "id": 12,
      "name": "honeysuckle",
      "year": 2011,
      "color": "#D94F70",
      "pantone_value": "18-2120"
    }
  ]
}
```

Create `.mocks/api/examples/examples.ts`
```ts
import { rest } from 'msw'
import type { PathParams } from 'msw'

import type { ExamplesGetResponse } from '@/models/examples.types'

import examples from './examples.json'

export const examplesGetHandler = rest.get<
  object,
  PathParams,
  ExamplesGetResponse
>(`${import.meta.env.VITE_API_HOST}examples`, (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(500), ctx.json(examples))
)

export default examplesGetHandler
```

Create `.mocks/handlers.ts`
```ts
import { examplesGetHandler } from './api/examples/examples'

// List of api mocks to always load
export const handlers = [examplesGetHandler]

// List of api mocks to only load if the VITE_LOCAL_MOCKS env is true
export const localHandlers = []

export const allHandlers = [...handlers, ...localHandlers]

export default handlers
```

### Start worker pattern 1
*This follows this [vite example](https://chaika.hatenablog.com/entry/2022/05/25/083000). However the delay in starting msw might cause the first api calls to not be intercepted.*

Create `.mocks/browser.ts`
```ts
import { setupWorker } from 'msw'

import { handlers, allHandlers } from '@mocks/handlers'

const workerHandlers = import.meta.env.VITE_LOCAL_MOCKS === 'true' ? allHandlers : handlers
export const worker = setupWorker(...workerHandlers)
```

Update `src/main.ts`

```diff
+ if (process.env.NODE_ENV === 'development') {
+ (async () => {
+   const { worker } = await import('@mocks/browser')
+   worker.start({ onUnhandledRequest: 'bypass' })
+ })()
+ }
```

### Start worker pattern 2
Update `src/main.ts`
```diff
+ import { setupWorker } from 'msw'
+ import { handlers, allHandlers } from '@mocks/handlers'

+ if (process.env.NODE_ENV === 'development') {
+ let workerHandlers = handlers
+ if (import.meta.env.VITE_LOCAL_MOCKS) {
+   workerHandlers = allHandlers
+ }
+ setupWorker(...workerHandlers).start({ onUnhandledRequest: 'bypass' })
+}
```

Update `.env`
```diff
+ VITE_LOCAL_MOCKS=false
```

Create `.env.msw`
```
VITE_API_HOST=https://reqres.in/api/
VITE_LOCAL_MOCKS=true
```
Update `.env.example`
```diff
VITE_API_HOST=api base path
+ VITE_LOCAL_MOCKS=always use mocks when doing api calls
```
Update `.gitignore`
```diff
.env
+ .env.msw
```

```sh
npx msw init public/ --save
```

Update `package.json`
```diff
{
  "scripts": {
+   "msw": "vite --mode msw",
  }
}
```
*Launching with `yarn msw` will always use the mocks for api calls*

## GraphQL
Uses [vue-query](#vue-query) and [graphql-request](https://www.npmjs.com/package/graphql-request)


```sh
yarn add graphql-request
```

Update `.env`
```diff
+ VITE_GRAPHQL_ENDPOINT=https://swapi-graphql.netlify.app/.netlify/functions/index
```

Update `src/models/examples.types.ts`
```diff
+ export type ExampleGraphQL = {
+   title: string
+   releaseDate: string
+ }
+
+ export type ExamplesGraphQLResponse = {
+     allFilms: {
+     films: ExampleGraphQL[]
+   }
+ }
```

Create `src/views/ExampleGraphQLView/ExampleGraphQLView.vue`
```vue
<template>
  <div>
    <h1>GraphQL</h1>
    <!-- Loading -->
    <div v-if="query?.isLoading">Loading...</div>

    <!-- Error -->
    <div v-else-if="query?.isError">An error has occurred: {{ query.isError }}</div>

    <!-- Result -->
    <div v-else-if="query?.data">
      <ul>
        <li v-for="film of query.data.allFilms.films" :key="film.releaseDate">
          {{ film.releaseDate }} {{ film.title }}
        </li>
      </ul>
    </div>

    <!-- No result -->
    <div v-else>No result</div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { QueryObserverResult } from '@tanstack/vue-query'
import { request, gql } from 'graphql-request'
import type { ExamplesGraphQLResponse } from '@/models/examples.types'

/*
The `useQuery` type is `UseQueryReturnType` but causes the template to expect
`query.data.value` instead of `query.data.allFilms` as is returned by `useQuery`

import type { UseQueryReturnType } from '@tanstack/vue-query'
const query = ref<UseQueryReturnType<ExamplesGraphQLResponse, Error>>()

onBeforeMount(() => {
  query.value = useQuery<ExamplesGraphQLResponse, Error>({
    queryKey: ['ExampleFilms'],
    queryFn: async () => request(import.meta.env.VITE_GRAPHQL_ENDPOINT, EXAMPLES_QUERY)
  })
})
*/

const query = ref<QueryObserverResult<ExamplesGraphQLResponse, Error>>()

const EXAMPLES_QUERY = gql`
  query ExampleFilms {
    allFilms {
      films {
        title
        releaseDate
      }
    }
  }
`

onBeforeMount(() => {
  query.value = useQuery<ExamplesGraphQLResponse, Error>({
    queryKey: ['ExampleFilms'],
    queryFn: async () => request(import.meta.env.VITE_GRAPHQL_ENDPOINT, EXAMPLES_QUERY)
  }) as unknown as QueryObserverResult<ExamplesGraphQLResponse, Error>
})
</script>
```

Update `src/router/index.ts`
```diff
+ {
+   path: '/graphql',
+   name: 'graphql',
+     component: () => import('@/views/ExampleGraphQLView/ExampleGraphQLView.vue')
+ }
```

Update `src/App.vue`
### Without vuetify
```diff
+ <router-link to="/graphql">GraphQL</router-link>
```

### With vuetify
```diff
+ <v-btn :to="{ name: 'graphql' }">GraphQL</v-btn>
```

### MSW
Create `.mocks/graphql/exampleFilms/exampleFilms.json`
```json
{
  "allFilms": {
    "films": [
      {
        "title": "A New Hope",
        "releaseDate": "1977-05-25"
      },
      {
        "title": "The Empire Strikes Back",
        "releaseDate": "1980-05-17"
      },
      {
        "title": "Return of the Jedi",
        "releaseDate": "1983-05-25"
      }
    ]
  }
}
```

Create `.mocks/graphql/exampleFilms/exampleFilms.ts`
```ts
import type { ExamplesGraphQLResponse } from '@/models/examples.types'
import { graphql } from 'msw'

import exampleFilms from './exampleFilms.json'

export const exampleFilmsHandler = graphql.query<ExamplesGraphQLResponse>('ExampleFilms', (req, res, ctx) => {
  return res(
    ctx.delay(500),
    ctx.data(exampleFilms)
  )
})

export default exampleFilmsHandler
```

Update `.mocks/handlers.ts`
```diff
+ import { exampleFilmsHandler } from './graphql/exampleFilms/exampleFilms'

export const handlers = [
+ exampleFilmsHandler
]
```

## Unit tests
[Vue test utils](https://v1.test-utils.vuejs.org/)

[Vitest](https://vitest.dev/)

Create `src/components/Example/ExampleComponent.spec.ts`
```ts
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ExampleComponent from './ExampleComponent.vue'

describe('ExampleComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        example: {
          id: 7,
          name: 'sand dollar',
          year: 2006,
          color: '#DECDBE',
          pantone_value: '13-1106'
        }
      }
    })
    expect(wrapper.text()).toContain('sand dollar13-1106')
  })
})
```

### With MSW
Update `src/components/Example/ExampleComponent.spec.ts`
```diff
+ import examples from '@mocks/api/examples/examples.json'

-   example: {
-     id: 1,
-     name: 'cerulean',
-     year: 2000,
-     color: '#98B2D1',
-     pantone_value: '15-4020'
-   }
+   example: examples.data[0]

- expect(wrapper.text()).toContain('sand dollar13-1106')
+ expect(wrapper.text()).toContain(`${examples.data[0].name}${examples.data[0].pantone_value}`)
```

## e2e tests
[Playwright](https://playwright.dev/)

```sh
npx playwright install
```

Update `e2e/tsconfig.json` *.mocks and .storybook includes and paths are optional*
```diff
  "include": [
    "./**/*",
+   "../env.d.ts",
+   "../src/**/*",
+   "../src/**/*.vue",
+   "../src/**/*.json",
+   "../.mocks/**/*",
+   "../.mocks/**/*.json",
+   "../.storybook/**/*"
  ],
+ "compilerOptions": {
+   "rootDir": "../",
+   "composite": true,
+   "baseUrl": "../",
+   "paths": {
+     "@/*": [
+       "./src/*"
+     ],
+     "@mocks/*": [
+       ".mocks/*"
+     ],
+     "@stb/*": [
+       ".storybook/*"
+     ]
+   }
+ }
}
```

Create `e2e/example/ExampleFlow.spec.ts`
```ts
import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/example')
  await expect(page.locator('div.examples h2').first()).toHaveText('sand dollar')
})
```
### With MSW
Update `e2e/example/ExampleFlow.spec.ts`
```diff
+ import examples from '@mocks/api/examples/examples.json'

- await expect(page.locator('div.examples h2').first()).toHaveText('sand dollar')
+ await expect(page.locator('div.examples h2').first()).toHaveText(`${examples.data[0].name}`)
```


## Storybook
[Storybook](https://storybook.js.org/)

[Storybook 7 を Vue 3 + TypeScript ではじめよう！](https://zenn.dev/sa2knight/books/storybook-7-with-vue-3)

storybook 7+ is necessary, if it's not released yet use
```sh
npx sb@next init
```
otherwise use
```sh
npx storybook init
```
- Ok to proceed? (y) **y**
- Do you want to run the 'eslintPlugin' migration on your project? **y**

Update `tsconfig.app.json`
```diff
{
  "include": [
+   ".storybook/**/*",
  ]
  "compilerOptions": [
    "paths": [
+     "@stb/*": [
+       ".storybook/*"
+     ]
    ]
  ],
}
```
*In case "class" in vue templates throws an error, also add the following`*
```diff
{
  "compilerOptions": {
    "types": [
+     "vite/client"
    ]
  }
}
```

Update `vite.config.ts`
```diff
resolve: {
    alias: {
+     '@stb': fileURLToPath(new URL('./.storybook', import.meta.url))
    }
  },
```

Update `.storybook/main.ts`
```diff
- import { StorybookConfig } from '@storybook/vue3-vite'
+ import type { StorybookConfig } from '@storybook/vue3-vite'
```

Create `src/components/Example/ExampleComponent.stories.ts`
```ts
import type { Meta, StoryObj } from '@storybook/vue3'

import ExampleComponent from './ExampleComponent.vue'

const meta: Meta<typeof ExampleComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Examples/Component',
  component: ExampleComponent,
  render: (args: any) => ({
    components: { ExampleComponent },
    setup() {
      return { args }
    },
    template: '<example-component :example="args.example" />'
  }),
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ExampleComponent>

export const Default: Story = {
  args: {
    example: {
      id: 7,
      name: 'sand dollar',
      year: 2006,
      color: '#DECDBE',
      pantone_value: '13-1106'
    }
  }
}
```

### Plugins
Modify `.storybook/preview.ts`
```diff
+ import { setup } from '@storybook/vue3'
+ import { registerPlugins } from '@/plugins'
+ 
+ setup((app: any) => {
+   // Registers your app's plugins into Storybook
+   registerPlugins(app)
+ });

+ export const decorators = [
+ (story: any) => {
+   return { template: '<div id="app"><story /></div>' }
+ }
+]
```
*It is possible that `src/stories/Button.vue` causes an error, in that case the src/stories folder can be deleted*

### Router
Create `src/views/ExampleView/ExampleView.stories.ts`
```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import router from '@/router'

import ExampleView from './ExampleView.vue'
import App from '@/App.vue'

const meta: Meta<typeof ExampleView> = {
  title: 'Examples/View',
  component: ExampleView,
  render: () => ({
    components: { ExampleView },
    template: '<example-view />'
  }),
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ExampleView>

export const Page: Story = {
  render: () => ({
    components: { ExampleView, App },
    setup() {
      router.replace('/example')
    },
    template: '<app><example-view /></app>'
  }),
  parameters: {
    layout: 'fullscreen'
  }
}

export const Default: Story = {}
```
### Pinia
Update `src/views/ExampleView/ExampleView.stories.ts`
```diff
+ import { useCounterStore } from '@/stores/counter'

+ export const WithInitialCountOf10: Story = {
+ render: () => ({
+   components: { ExampleView },
+   setup() {
+     const counter = useCounterStore()
+     counter.count = 10
+     return {}
+   },
+   template: '<example-view />'
+ })
+}
```

### i18n
Update `.storybook/preview.ts`
```diff
+ import type { StoryContext } from '@storybook/vue3'

+ import i18n from '@/plugins/i18n'

+ export const globalTypes = {
+ locale: {
+   name: 'Locale',
+   description: 'Internationalization',
+   defaultValue: 'en',
+   toolbar: {
+     icon: 'globe',
+     items: i18n.global.availableLocales
+   }
+ }
+}

- (story: any) => {
+ (story: any, context: StoryContext) => {
+   i18n.global.locale = context.globals.locale
```

### Vue Query
*This prevents vue query to retry on fail.*

Update `src/plugins/vuequery.ts`
```diff
- const vueQuery = (): [any] => {
-   return [VueQueryPlugin]
+ const vueQuery = (retry: boolean): [any, any] => {
+   return [
+     VueQueryPlugin,
+     {
+       queryClientConfig: {
+         defaultOptions: {
+           queries: {
+             retry
+           }
+         }
+       }
+     }
+   ]
```

Update `src/plugins/index.ts`
```diff
- export function registerPlugins(app: App) {
+ export function registerPlugins(app: App, vueQueryRetry = true) {

-   .use(...vueQuery)
+   .use(...vueQuery(vueQueryRetry))
}
```

Update `.storybook/preview.ts`
```diff
import { registerPlugins } from '../src/plugins'
+ import { QueryClient } from '@tanstack/vue-query'
+
+ const queryClient = new QueryClient()

-   registerPlugins(app)
+   registerPlugins(app, false)
+   // cancel queries when navigating between stories
+   queryClient.cancelQueries()
```

### MSW
[Storybook msw addon](https://storybook.js.org/addons/msw-storybook-addon)

`yarn add -D msw-storybook-addon`

Update `.storybook/preview.ts`
```diff
+ import { initialize, mswDecorator } from 'msw-storybook-addon'
+ import { allHandlers } from '@mocks/handlers'

+ // Initialize MSW
+ initialize({
+   onUnhandledRequest: 'bypass'
+ })
+ 
  export const decorators = [
+   mswDecorator,

export const parameters = {
+ msw: {
+   handlers: allHandlers
+ }
}
```

Update `/src/views/ExampleView/ExampleView.stories.ts`
```diff
import router from '@/router'
+ import { rest } from 'msw'
+ import examples from '@mocks/api/examples/examples.json'

export const Default: Story = {}

+ export const OneResult: Story = {
+  parameters: {
+    msw: {
+      handlers: [
+        rest.get(
+          `${import.meta.env.VITE_API_HOST}examples`,
+          (req, res, ctx) => {
+            return res(
              ctx.status(200),
+              ctx.json({
+                ...examples,
+                total: 1,
+                data: examples.data.slice(0, 1)
+              })
+            )
+          }
+        )
+      ]
+    }
+  }
+ }
+
+ export const Loading: Story = {
+  parameters: {
+    msw: {
+      handlers: [
+        rest.get(
+          `${import.meta.env.VITE_API_HOST}examples`,
+          (req, res, ctx) => {
+            return res(ctx.status(200), ctx.delay(999999), ctx.json({}))
+          }
+        )
+      ]
+    }
+  }
+ }
+
+ export const Error: Story = {
+  parameters: {
+    msw: {
+      handlers: [
+        rest.get(
+          `${import.meta.env.VITE_API_HOST}examples`,
+          (req, res, ctx) => {
+            return res(ctx.status(404))
+          }
+        )
+      ]
+    }
+  }
+ }
```

Update `src/components/Example/ExampleComponent.stories.ts`
```diff
+ import examples from '@mocks/api/examples/examples.json'

-   example: {
-     id: 7,
-     name: 'sand dollar',
-     year: 2006,
-     color: '#DECDBE',
-     pantone_value: '13-1106'
-   }
+   example: examples.data[0]
```

### GraphQL
Create `src/views/ExampleGraphQLView/ExampleGraphQLView.stories.ts`

```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import router from '@/router'
import { graphql } from 'msw'
import exampleFilms from '@mocks/graphql/exampleFilms/exampleFilms.json'

import ExampleGraphQLView from './ExampleGraphQLView.vue'
import App from '@/App.vue'

const meta: Meta<typeof ExampleGraphQLView> = {
  title: 'Examples/GraphQLView',
  component: ExampleGraphQLView,
  render: () => ({
    components: { ExampleGraphQLView },
    template: '<example-graph-q-l-view />'
  }),
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ExampleGraphQLView>

export const Page: Story = {
  render: () => ({
    components: { ExampleGraphQLView, App },
    setup() {
      router.replace('/graphql')
    },
    template: '<app><example-graph-q-l-view /></app>'
  }),
  parameters: {
    layout: 'fullscreen'
  }
}

export const Default: Story = {}

export const OneResult: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('ExampleFilms', (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.data({
              allFilms: {
                films: exampleFilms.allFilms.films.slice(0, 1)
              }
            })
          )
        })
      ]
    }
  }
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('ExampleFilms', (req, res, ctx) => {
          return res(ctx.status(200), ctx.delay(999999), ctx.data({}))
        })
      ]
    }
  }
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('ExampleFilms', (req, res, ctx) => {
          return res(ctx.status(404))
        })
      ]
    }
  }
}
```

### e2e tests
[Storybook interaction testing](https://storybook.js.org/docs/react/writing-tests/interaction-testing)
```sh
yarn add -D @storybook/testing-library @storybook/jest @storybook/test-runner
```

Update `.storybook/main.ts`
```diff
stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
+   '../e2e/**/*.stories.@(js|jsx|ts|tsx)'
  ],
+  features: {
+   interactionsDebugger: true
+ },
```

Create `e2e/example/ExampleFlow.stories.tsx`
```tsx
import type { Meta, StoryObj } from '@storybook/vue3'
import router from '@/router'
import { within, waitFor, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import App from '@/App.vue'

const meta: Meta<typeof App> = {
  title: 'Examples/Flow',
  component: App,
  render: () => ({
    components: { App },
    setup() {
      router.replace('/')
    },
    template: '<app />'
  }),
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof App>

export const Default: Story = {}

/*
 * See https://storybook.js.org/docs/7.0/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Navigate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(async () => {
      await expect(canvas.getByText('Example'))
    })

    const exampleLink = await canvas.getByText('Example')
    await userEvent.click(exampleLink)
  }
}
```

Update `package.json`
```diff
  "scripts": {
+   "test-storybook": "test-storybook"
  },
```
### Other addons
- [Accessibility](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Designs](https://storybook.js.org/addons/storybook-addon-designs)
- [Chromatic](https://storybook.js.org/addons/chromatic)

## Authentication
Authentication boilerplate:
- REST with authorization header
- Token and refresh token
- Route guards
- Multiple user roles
- Implementation in storybook with a role menu in the toolbar

Create `src/constants/auth.constants.ts`
```ts
export enum RolesEnum {
  VISITOR = '',
  USER = 'user',
  ADMIN = 'admin'
}

export enum AccessDeniedPageErrorEnum {
  OK = '',
  NOT_LOGGED_IN = 'notLoggedIn',
  INSUFFICIENT_PERMISSIONS = 'insufficientPermissions'
}
```
Create `src/models/auth.types.ts`
```ts
import { AccessDeniedPageErrorEnum, RolesEnum } from '@/constants/auth.constants'
import type { RouteRecordName } from 'vue-router'

export class LoginRequest {
  email?: string

  password?: string

  constructor() {
    this.email = ''
    this.password = ''
  }
}

export class Tokens {
  token: string

  refreshToken: string

  constructor() {
    this.token = ''
    this.refreshToken = ''
  }
}

export type LoginPostResponse = Tokens

export type RefreshPostResponse = Tokens

export class User {
  email: string

  name: string

  role: RolesEnum

  constructor() {
    this.email = ''
    this.name = ''
    this.role = RolesEnum.VISITOR
  }
}

export type UserGetResponse = User

export class AccessDeniedPage {
  name: RouteRecordName | null | undefined

  error: AccessDeniedPageErrorEnum

  constructor(name: RouteRecordName | null | undefined = null, error = AccessDeniedPageErrorEnum.OK) {
    this.name = name
    this.error = error
  }
}
```
Update `src/models/examples.types.ts`
```diff
+ export type ExampleLoggedInGetResponse = {
+   message: string
+ }
```
Create `src/stores/auth.ts`
```ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AccessDeniedPage, Tokens, User } from '@/models/auth.types'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const isRefreshing = ref(false)
  const isFetchingUserData = ref(false)
  const accessDeniedPage = ref(new AccessDeniedPage())
  const tokens = ref(new Tokens())
  const user = ref<User>()

  function setTokens(tokensValue: Tokens) {
    tokens.value = tokensValue
  }

  function setUser(userValue: User) {
    user.value = userValue
  }

  function setLoggedIn(isLoggedInValue: boolean) {
    isLoggedIn.value = isLoggedInValue
    if (!isLoggedInValue) {
      tokens.value = new Tokens()
      user.value = new User()
    }
  }

  function setRefreshing(isRefreshingValue: boolean) {
    isRefreshing.value = isRefreshingValue
  }

  function setFetchingUserData(isFetchingUserDataValue: boolean) {
    isFetchingUserData.value = isFetchingUserDataValue
  }

  function setAccessDeniedPage(accessDeniedPageValue: AccessDeniedPage) {
    accessDeniedPage.value = accessDeniedPageValue
  }

  return {
    accessDeniedPage,
    isFetchingUserData,
    isLoggedIn,
    isRefreshing,
    tokens,
    user,
    setAccessDeniedPage,
    setFetchingUserData,
    setLoggedIn,
    setRefreshing,
    setTokens,
    setUser
  }
})
```

Replace `src/services/api.service.ts`
```ts
import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { logout, setLocalStorage } from './auth.service'

// api without authorization header
export const oApi = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: { 'Content-Type': 'application/json' }
})

// api with authorization header
const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: { 'Content-Type': 'application/json' }
})

// add authorization header
api.interceptors.request.use(
  (config) => {
    if (config?.headers) {
      const auth = useAuthStore()
      config.headers.Authorization = `Bearer ${auth.tokens.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// intercept response for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    console.error('api error', { error })
    const auth = useAuthStore()
    const originalRequest = error.config
    if (!originalRequest) {
      throw error
    }
    if (error.response?.status === 401) {
      if (!auth.tokens?.refreshToken) {
        logout()
        throw error
      }
      // call token refresh api
      if (!auth.isRefreshing) {
        auth.setRefreshing(true)
        return oApi
          .post(`${import.meta.env.VITE_API_HOST}refresh`, {
            refreshToken: `Basic ${auth.tokens.refreshToken}`
          })
          .then((res: any) => {
            // update tokens and recall original request
            auth.setTokens(res.data)
            setLocalStorage()
            api.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
            return api(originalRequest)
          })
          .catch((error: any) => {
            logout()
            throw error
          })
          .finally(() => {
            auth.setFetchingUserData(false)
          })
      } else {
        // recall original request when token has been refreshed
        return new Promise((resolve, reject) => {
          const unsubscribe = auth.$subscribe(() => {
            if (!auth.isRefreshing) {
              unsubscribe()
              if (auth.isLoggedIn) {
                return api(originalRequest)
              }
              throw error
            }
          })
        })
      }
    }
  }
)
export default api
```

Create `src/services/auth.service.ts`
```ts
import { AccessDeniedPage, type LoginRequest } from '@/models/auth.types'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import api, { oApi } from '@/services/api.service'

export const login = (formData: LoginRequest) => {
  const auth = useAuthStore()
  return oApi
    .post(`${import.meta.env.VITE_API_HOST}login`, formData)
    .then((res: any) => {
      auth.setTokens(res.data)
      return fetchUserData(true)
    })
    .catch((error: any) => {
      throw error
    })
}

export const fetchUserData = (hasForward = false) => {
  const auth = useAuthStore()
  auth.setFetchingUserData(true)
  return api
    .get(`${import.meta.env.VITE_API_HOST}user`)
    .then((res: any) => {
      auth.setUser(res.data)
      auth.setLoggedIn(true)
      if (hasForward) {
        const forwardTo = auth.accessDeniedPage.name || 'main'
        auth.setAccessDeniedPage(new AccessDeniedPage())
        router.push({ name: forwardTo })
      }
      return res
    })
    .catch((error: any) => {
      throw error
    })
    .finally(() => {
      auth.setFetchingUserData(false)
    })
}

export const initAuth = () => {
  const auth = useAuthStore()
  if (!auth.user) {
    getLocalStorage()
    if (localStorage.getItem('isLoggedIn') === 'true') {
      fetchUserData()
    }
  }
}

export const logout = () => {
  const auth = useAuthStore()
  auth.setLoggedIn(false)
  setLocalStorage()
  router.push({ name: 'home' })
}

export const setLocalStorage = () => {
  const auth = useAuthStore()
  localStorage.setItem('isLoggedIn', JSON.stringify(auth.isLoggedIn))
  localStorage.setItem('tokens', JSON.stringify(auth.tokens))
}

export const getLocalStorage = () => {
  const auth = useAuthStore()
  auth.setLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
  auth.setTokens(JSON.parse(localStorage.getItem('tokens') || '{}'))
}
```

Create `src/components/Login/LoginComponent.vue`
```vue
<template>
  <form ref="form" @submit.prevent="submitLogin">
    <div>
      <label for="email">Email</label>
      <input v-model="loginRequest.email" label="email" id="email" name="email" type="email" required />
    </div>
    <div>
      <label for="password">Password</label>
      <input
        v-model="loginRequest.password"
        id="password"
        name="password"
        :type="isPasswordVisible ? 'text' : 'password'"
      />
      <button type="button" @click="isPasswordVisible = !isPasswordVisible">
        {{ isPasswordVisible ? 'hide password' : 'show password' }}
      </button>
    </div>
    <button type="submit" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Login' }}</button>
    <p v-if="auth.accessDeniedPage.error">{{ auth.accessDeniedPage.error }}</p>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { LoginRequest } from '@/models/auth.types'
import { login } from '@/services/auth.service'

const loginRequest = ref(new LoginRequest())
const isLoading = ref(false)
const isPasswordVisible = ref(false)

const submitLogin = () => {
  isLoading.value = true
  login(loginRequest.value).finally(() => {
    isLoading.value = false
  })
}
</script>
```
Create `src/views/LoginView/LoginView.vue`
```vue
<template>
  <div>
    <h1>Login</h1>
    <LoginComponent />
  </div>
</template>

<script lang="ts" setup>
import LoginComponent from '@/components/Login/LoginComponent.vue'
</script>
```
Create `src/views/MainView/MainView.vue`
```vue
<template>
  <div>
    <h1>Main</h1>
    <p>{{ query?.data?.message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { QueryObserverResult } from '@tanstack/vue-query'
import type { ExampleLoggedInGetResponse } from '@/models/examples.types'
import api from '@/services/api.service'

const query = ref<QueryObserverResult<ExampleLoggedInGetResponse, Error>>()

const exampleLoggedInFetch = async (): Promise<ExampleLoggedInGetResponse[]> => {
  try {
    const response = await api.get('exampleLoggedIn')
    console.log('response', response)
    return response.data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

onBeforeMount(() => {
  query.value = useQuery({
    queryKey: ['exampleLoggedInFetch'],
    queryFn: exampleLoggedInFetch
  }) as unknown as QueryObserverResult<ExampleLoggedInGetResponse, Error>
})
</script>
```

Update `src/router/index.ts`
```diff
+ import { AccessDeniedPageErrorEnum, RolesEnum } from '@/constants/auth.constants'
+ import type { RouteRecordName, RouteLocationNormalized } from 'vue-router'
+ import { AccessDeniedPage } from '@/models/auth.types'
+ import LoginView from '@/views/LoginView/LoginView.vue'

const router = createRouter({
+ {
+   path: '/login',
+   name: 'login',
+   component: LoginView
+ },

+ {
+   path: '/main',
+   name: 'main',
+   meta: { roles: [RolesEnum.USER] },
+   component: () => import('@/views/MainView/MainView.vue')
+  }

+ // Returns false if the user cannot access this route
+ export function canAccessRoute(name: RouteRecordName | RouteLocationNormalized) {
+   const auth = useAuthStore()
+   const to = typeof name === 'string' ? router.resolve({ name }) : (name as RouteLocationNormalized)
+   return !to.meta.roles || (auth.user?.role && (to.meta.roles as RolesEnum[])?.includes(auth.user.role))
+ }
+
+ router.beforeEach(async (to, from) => {
+   const auth = useAuthStore()
+   // wait if the user data is being fetched
+   if (to.meta.roles && auth.isFetchingUserData) {
+     await new Promise<void>((resolve, reject) => {
+       const unsubscribe = auth.$subscribe(() => {
+         if (!auth.isFetchingUserData) {
+           unsubscribe()
+           resolve()
+         }
+       })
+     })
+   }
+   if (!canAccessRoute(to)) {
+     const accessDeniedPage = new AccessDeniedPage(
+       to.name,
+       auth.isLoggedIn ? AccessDeniedPageErrorEnum.INSUFFICIENT_PERMISSIONS : AccessDeniedPageErrorEnum.NOT_LOGGED_IN
+     )
+     auth.setAccessDeniedPage(accessDeniedPage)
+     return { name: 'login' }
+   }
+   if (to.name !== 'login' && auth.accessDeniedPage.error) {
+     auth.setAccessDeniedPage(new AccessDeniedPage())
+   }
+ })
```

Update `src/App.vue`
```diff
+ <router-link v-if="canAccessRoute('main')" to="/main">Main</router-link>
+ <router-link v-if="!auth.isLoggedIn" :to="{ name: 'login' }">Login</router-link>
+ <button v-if="auth.isLoggedIn" @click="logout()">Logout</button>

- <script setup lang="ts" />
+ <script setup lang="ts">
+ import { useAuthStore } from '@/stores/auth'
+ import { initAuth, logout } from '@/services/auth.service'
+ import { canAccessRoute } from '@/router'

+ const auth = useAuthStore()
+ initAuth()
+ </script>
```
### Vuetify
Replace template in `src/components/Login/LoginComponent.vue`
```vue
<template>
  <v-form ref="form" @submit.prevent="submitLogin">
    <v-text-field v-model="loginRequest.email" label="email" type="email" required></v-text-field>
    <v-text-field
      v-model="loginRequest.password"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      :type="isPasswordVisible ? 'text' : 'password'"
      name="password"
      label="password"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    ></v-text-field>
    <v-btn type="submit" :loading="isLoading" :disabled="isLoading">Login</v-btn>
    <p v-if="auth.accessDeniedPage.error">{{ auth.accessDeniedPage.error }}</p>
  </v-form>
</template>
```
Update `src/App.vue`
```diff
- <router-link v-if="canAccessRoute('main')" to="/main">Main</router-link>
+ <v-btn v-if="canAccessRoute('main')" :to="{ name: 'main' }">Main</v-btn>
- <router-link v-if="!auth.isLoggedIn" :to="{ name: 'login' }">Login</router-link>
- <button v-if="auth.isLoggedIn" @click="logout()">Logout</button>
+ <v-btn v-if="!auth.isLoggedIn" :to="{ name: 'login' }" icon="mdi-login" title="Login"></v-btn>
+ <v-btn v-if="auth.isLoggedIn" @click="logout()" icon="mdi-logout" title="Logout"></v-btn>
```
### MSW
Create `.mocks/api/exampleLoggedIn/exampleLoggedIn.json`
```json
{
  "message": "Logged in successfully"
}
```
Create `.mocks/api/exampleLoggedIn/exampleLoggedIn.ts`
```ts
import { rest } from 'msw'
import type { PathParams } from 'msw'

import type { ExampleLoggedInGetResponse } from '@/models/examples.types'

import exampleLoggedIn from './exampleLoggedIn.json'

export const exampleLoggedInGetHandler = rest.get<object, PathParams, ExampleLoggedInGetResponse>(
  `${import.meta.env.VITE_API_HOST}exampleLoggedIn`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(exampleLoggedIn))
  }
)

export default exampleLoggedInGetHandler
```
Create `.mocks/api/login/login.json`
```json
{
  "token": "token",
  "refreshToken": "refreshToken"
}
```
Create `.mocks/api/login/login.ts`
```ts
import { rest } from 'msw'
import type { PathParams } from 'msw'

import login from './login.json'
import type { LoginPostResponse } from '@/models/auth.types'

export const loginPostHandler = rest.post<
  object,
  PathParams,
  LoginPostResponse
>(`${import.meta.env.VITE_API_HOST}login`, (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(500), ctx.json(login))
)

export default loginPostHandler
```
Create `.mocks/api/refresh/refresh.json`
```json
{
  "token": "token",
  "refreshToken": "refreshToken"
}
```
Create `.mocks/api/refresh/refresh.ts`
```ts
import { rest } from 'msw'
import type { PathParams } from 'msw'

import refresh from './refresh.json'
import type { RefreshPostResponse } from '@/models/auth.types'

export const refreshPostHandler = rest.post<
  object,
  PathParams,
  RefreshPostResponse
>(`${import.meta.env.VITE_API_HOST}refresh`, (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(500), ctx.json(refresh))
)

export default refreshPostHandler
```
Create `.mocks/api/user/user.json.ts`
```ts
import { RolesEnum } from '@/constants/auth.constants'

export const user = {
  email: 'abc123',
  name: 'User Name',
  role: RolesEnum.USER
}
```
Create `.mocks/api/user/user.ts`
```ts
import { rest } from 'msw'
import type { PathParams } from 'msw'

import type { UserGetResponse } from '@/models/auth.types'

import { user } from './user.json'

export const userGetHandler = rest.get<object, PathParams, UserGetResponse>(
  `${import.meta.env.VITE_API_HOST}user`,
  (req, res, ctx) => res(ctx.status(200), ctx.delay(500), ctx.json(user))
)

export default userGetHandler
```
Update `.mocks/handlers.ts`
```diff
+ import { exampleLoggedInGetHandler } from './api/exampleLoggedIn/exampleLoggedIn'
+ import { loginPostHandler } from './api/login/login'
+ import { refreshPostHandler } from './api/refresh/refresh'
+ import { userGetHandler } from './api/user/user'

export const handlers = [
+ loginPostHandler,
+ refreshPostHandler,
+ userGetHandler,

+ exampleLoggedInGetHandler,
```
### Storybook
```sh
yarn add -D @storybook/client-api@next
```

Update `.storybook/preview.ts`
```diff
+ import { useAuthStore } from '@/stores/auth'
+ import { RolesEnum } from '@/constants/auth.constants'
+ import { FORCE_REMOUNT } from '@storybook/core-events'
+ import { addons } from '@storybook/preview-api'
+ import { useStoryContext } from '@storybook/client-api'

export const globalTypes = {
+ role: {
+   name: 'role',
+   description: 'role',
+   defaultValue: 'visitor',
+   toolbar: {
+     icon: 'user',
+     items: Object.values(RolesEnum).map((item) => (item === '' ? 'visitor' : item))
+ }

+ let role = 'visitor'
export const decorators = [

+   if (role !== context.globals.role) {
+     role = context.globals.role
+     const parameters = useStoryContext()
+     addons.getChannel().emit(FORCE_REMOUNT, { storyId: parameters?.id })
+   }
- return { template: '<div id="app"><story /></div>' }
+ return {
+   setup() {
+     const auth = useAuthStore()
+     auth.setLoggedIn(context.globals.role === 'visitor' ? false : true)
+     auth.setUser({
+       email: 'abc123',
+       name: 'Story Book',
+       role: context.globals.role === 'visitor' ? '' : context.globals.role
+     })
+   },
+   template: `<div id="app"><story /></div>`
+ }
```

Create `src/components/Login/LoginComponent.stories.ts`
```ts
import type { Meta, StoryObj } from '@storybook/vue3'

import LoginComponent from './LoginComponent.vue'

const meta: Meta<typeof LoginComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Login',
  component: LoginComponent,
  render: (args: any) => ({
    components: { LoginComponent },
    setup() {
      return { args }
    },
    template: '<login-component />'
  }),
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof LoginComponent>

export const Default: Story = {}
```
Create `src/views/LoginView/LoginView.stories.ts`
```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import router from '@/router'

import LoginView from './LoginView.vue'
import App from '@/App.vue'

const meta: Meta<typeof LoginView> = {
  title: 'Views/Login',
  component: LoginView,
  render: () => ({
    components: { LoginView },
    template: '<login-view />'
  }),
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof LoginView>

export const Page: Story = {
  render: () => ({
    components: { LoginView, App },
    setup() {
      router.replace('/login')
    },
    template: '<app><login-view /></app>'
  }),
  parameters: {
    layout: 'fullscreen'
  }
}

export const Default: Story = {}
```
Create `src/components/Login/LoginComponent.stories.ts`
```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import router from '@/router'

import MainView from './MainView.vue'
import App from '@/App.vue'

const meta: Meta<typeof MainView> = {
  title: 'Views/Main',
  component: MainView,
  render: () => ({
    components: { MainView },
    template: '<main-view />'
  }),
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof MainView>

export const Page: Story = {
  render: () => ({
    components: { MainView, App },
    setup() {
      router.replace('/main')
    },
    template: '<app><main-view /></app>'
  }),
  parameters: {
    layout: 'fullscreen'
  }
}

export const Default: Story = {}
```

## Other libraries
- [Vueuse](https://vueuse.org/)
- [dayjs](https://day.js.org/)
- [echarts](https://github.com/ecomfe/vue-echarts)

## Unused files that can be deleted
- e2e/vue.spec.ts
- public/favicon.ico (replace with own)
- styles (create [SMACSS](http://smacss.com/) structure if necessary)
  - src/assets/styles/base.css
  - src/assets/styles/main.css
- src/assets/logo.svg
- src/components/\_\_tests\_\_ (tests are in the components/views folders)
- src/components/icons
- src/components/HelloWorld.vue
- Home page components after updating the home page
  - src/components/TheWelcome.vue
  - src/components/WelcomeItem.vue
- src/views/AboutView.vue
- src/stories

## Folder structure
- .mocks*
  - api
  - graphql*
  - handlers.ts
- .storybook*
  - main.ts
  - preview-head.html
  - preview.ts
- e2e*
  - *testName*
    - *testName*.spec.ts
    - *testName*.stories.ts
- public
  - favicon.ico
  - mockServiceWorker.js*
- src
  - assets
    - styles
      - _transitions.scss*
      - styles.scss
      - tailwind.css*
    - images
  - components
    - *ComponentName*
      - *ComponentName*.spec.ts*
      - *ComponentName*.stories.ts*
      - *ComponentName*.vue
  - constants*
    - *constantName*.constants.ts*
  - locales*
    - *language*.json
  - models
    - *type*.types.ts
  - plugins
    - i18n.ts*
    - index.ts
    - pinia.ts*
    - vuequery.ts*
    - vuetify.ts*
    - webfontloader.ts*
  - router
    - index.ts
  - services*
    - *serviceName*.service.ts
  - stores*
    - *storeName*.ts
  - views
    - *ViewName*View
      - *ViewName*View.stories.ts*
      - *ViewName*View.vue
  - App.vue
  - main.ts
- .env
- .env.example
- .env.msw*
- .eslintrc.cjs
- .gitattributes
- .gitignore
- .prettierrc.json
- env.d.ts
- index.html
- package-lock.json
- playwright.config.ts*
- README.md
- tsconfig.app.json
- tsconfig.config.json
- tsconfig.json
- tsconfig.vitest.json*
- vite.config.ts
- yarn.lock