import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'virtual:windi.css'
import './index.css'
import { VueDapp } from 'vue-dapp'

const app = createApp(App)

app.use(router)
app.use(VueDapp)

app.mount('#app')
