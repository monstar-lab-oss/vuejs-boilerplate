import { createI18n as _createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ja from './locales/ja.json'

export const SUPPORT_LOCALES = ['en', 'ja']

export function createI18n() {
  return _createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'ja',
    fallbackLocale: 'en',
    messages: {
      en,
      ja
    }
  })
}