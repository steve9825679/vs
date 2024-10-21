import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


import { createApp } from 'vue';
import Calculator from './components/calculator/Caculator.vue';
import Division from './components/sebk/Division.vue';
 
createApp({})
  .component('calculator', Calculator)
  .component('Division',Division)
  .mount('#app')