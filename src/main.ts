import { createApp } from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3' 
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
    .use(store)
    .use(router)
    .use(VueReCaptcha, {
        siteKey: '6LdNQhwpAAAAAI9JgdhW5H9or5hyIoxbBoCEioCO',
        loaderOptions: {
            useRecaptchaNet: true
        }
    })
    .mount('#app')
