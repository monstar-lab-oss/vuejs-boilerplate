# vue3

Boilerplate with
- Vue 3
- Vite
- Vuetify
- MSW
- Storybook

## Project setup

Created with node version 16.8.1
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and hot-reloads for development using msw for all api calls
```
yarn msw
```

### Compiles and minifies for production
```
yarn build
```

### Compiles and minifies for development
```
yarn build:development
```

### Lints and fixes files
```
yarn lint
```

### Storybook compile and hot-reload for development
```
yarn storybook
```

### Storybook build
```
yarn build-storybook
```

### Storybook test
```
yarn storybook
yarn test-storybook
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Checklist

- [x] vue 3 (composition api)
- [x] typescript
- [x] vite
- [x] vue router
- [ ] vuetify (beta)
  - [x] base
  - [ ] scss variables
  - [ ] theming
- [x] validation
- [ ] vuex
- [ ] api
- [x] msw
- [x] i18n
- [x] env
- [ ] modals
- [x] build
- [ ] storybook
  - [x] vite
  - [x] mdx (class or className?)
  - [ ] story style
  - [ ] story structure
  - [x] styling
  - [x] vuetify
  - [x] msw
  - [x] router
  - [ ] i18n
  - [ ] vuex
  - [ ] authentication
  - [x] play
  - [x] testing
  - [ ] build
  - [ ] chromatic
- [ ] linter
  - [ ] vue
  - [ ] stories
  - [ ] ts/tsx
  - [ ] msw
  - [ ] mdx
- [ ] authentication
  - [ ] intercept calls
  - [ ] refresh token
  - [ ] route guard / forward
- [ ] basic structure
  - [ ] assets
    - [ ] styling
      - [x] sass structure
      - [x] priority
      - [x] route transitions
      - [ ] skeleton loaders (not present in vuetify beta)
  - [x] components
    - [x] Header
    - [x] Footer
    - [x] Image loader
    - [x] User (example component)
  - [ ] models
  - [ ] router
    - [x] base
    - [ ] guard
    - [ ] lazy load
  - [ ] store
  - [x] views
    - [x] app
    - [x] login page
    - [x] home page
    - [x] 404 page
- [ ] SEO

### Structure
- App
  - Login (Calls api with msw and forwards to home)
  - Main
    - Home
    - Users (Calls api with msw and loads a user list)
- Storybook
  - Style guide
  - Components
  - Pages
  - Flows (Uses play for e2e tests)
### Issues
- Set up tsconfig and eslint so it works with vue, storybook and msw
- Vuetify is still in beta so the configuration isn't complete yet
- Vuetify components have to be imported in _storybook/preview.tsx