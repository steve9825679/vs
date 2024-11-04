import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


import { createApp } from 'vue';
import Calculator from './components/calculator/Caculator.vue';
import CarryOverTen from './components/calculator/simeon/CarryOverTen.vue';
 
createApp({})
  .component('calculator', Calculator)
  .component('carry-over-ten', CarryOverTen)  
  .mount('#app')
  