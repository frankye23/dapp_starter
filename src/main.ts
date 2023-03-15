import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import "tailwindcss/tailwind.css"
import 'virtual:svg-icons-register'
import './index.css'
import { VueDapp } from 'vue-dapp'
import SvgIcon from "@/components/SvgIcon.vue";
import message from './components/message/index'

const app = createApp(App)

app.component("svg-icon", SvgIcon)

app.use(router)
app.use(VueDapp)

app.mount('#app')

// global component
app.config.globalProperties.$message = message
