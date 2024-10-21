import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


import { createApp } from 'vue';
import Calculator from './components/calculator/Caculator.vue';
import Board100 from './components/lucas/Board100.vue';
 
createApp({})
  .component('calculator', Calculator)
  .component('board-100', Board100)
  .mount('#app')