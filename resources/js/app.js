import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


import { createApp } from 'vue';
import Calculator from './components/calculator/Caculator.vue';
 
createApp({})
  .component('calculator', Calculator)
  .mount('#app')