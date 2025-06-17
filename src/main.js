import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { createI18n } from 'vue-i18n';
import en from './i18n/en.json';
import de from './i18n/de.json';
import fr from './i18n/fr.json';
import fi from './i18n/fi.json';
import es from './i18n/es.json';
import el from './i18n/el.json';

const i18n = createI18n({
  locale: 'en', // default
  fallbackLocale: 'en',
  messages: {
    en, de, fr, fi, es, el
  }
});

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
