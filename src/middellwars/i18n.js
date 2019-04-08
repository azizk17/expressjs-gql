/**
 *
 *  i18n middleware
 *
 */

import i18next from 'i18next'
import i18nextMiddleware from 'i18next-express-middleware'
import Backend from 'i18next-node-fs-backend'
import path from 'path'
const options = {
  // order and from where user language should be detected
  /* 'path', 'session', 'querystring', 'cookie', 'header' */
  order: ['header'],
  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupSession: 'lng',
  lookupPath: 'lng',
  lookupFromPathIndex: 0,
  // cache user language
  caches: false, // ['cookie']

  // optional expire and domain for set cookie
  cookieExpirationDate: new Date(),
  cookieDomain: 'myDomain'
}

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.missing.json')
    },
    fallbackLng: 'en-US',
    preload: ['en-US', 'ar-SA'],
    ns: ['message', 'validation', 'models', 'error'],
    detection: options,
    saveMissing: true,
    debug: false
  })
export default i18nextMiddleware.handle(i18next)
