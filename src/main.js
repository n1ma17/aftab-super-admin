import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import ThemifyIcon from './components/icons/ThemifyIcon.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { en } from 'vuetify/locale'
import '@mdi/font/css/materialdesignicons.css'
import theme from './config/theme.js'

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  locale: {
    locale: 'en',
    messages: { en },
    rtl: { en: true },
  },
  theme: {
    defaultTheme: 'customLight',
    themes: {
      customLight: {
        dark: false,
        colors: {
          primary: theme.colors.primary.DEFAULT,
          secondary: theme.colors.secondary.DEFAULT,
          error: theme.colors.error.DEFAULT,
          info: theme.colors.info.DEFAULT,
          success: theme.colors.success.DEFAULT,
          warning: theme.colors.warning.DEFAULT,
        },
      },
    },
  },
})

app.use(pinia)
app.use(router)
app.use(vuetify)

// ثبت کامپوننت آیکن به صورت global
app.component('ThemifyIcon', ThemifyIcon)

app.mount('#app')
