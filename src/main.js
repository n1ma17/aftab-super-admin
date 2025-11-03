import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import ThemifyIcon from './components/icons/ThemifyIcon.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)

// ثبت کامپوننت آیکن به صورت global
app.component('ThemifyIcon', ThemifyIcon)

app.mount('#app')

