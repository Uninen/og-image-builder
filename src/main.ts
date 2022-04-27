import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'
import './assets/main.postcss'

const head = createHead()
const app = createApp(App)

app.use(router)
app.use(head)

app.mount('#app')
