import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


import { createApp } from 'vue';
import Calculator from './components/calculator/Caculator.vue';
import DivisionIn from './components/sebf/DivisionIn.vue';
 
createApp({})
  .component('calculator', Calculator)
  .component('division-in', DivisionIn)
  .mount('#app')