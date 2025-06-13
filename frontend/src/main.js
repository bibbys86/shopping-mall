import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

// Axios 기본 설정
axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8080'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app') 