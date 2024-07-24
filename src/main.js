import './assets/styles/main.css' 

import { createApp } from 'vue'
import App from './App.vue'
import directives from '@/directives/index.js' 
import UIcomponents from '@/components/UI/componentsLib.js' 

const app = createApp(App)

directives.forEach(directive => { 
  app.directive(directive.name, directive)
})


UIcomponents.forEach(compoment => {
  app.component(compoment.name, compoment) 
})

app.mount('#app')

