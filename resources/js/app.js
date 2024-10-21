import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


import { createApp } from 'vue';
import Calculator from './components/calculator/Caculator.vue';
import FindingHundrets from './components/krs/FindingHundrets.vue';
 
createApp({})
  .component('calculator', Calculator)
  .component('finding-hundrets', FindingHundrets)
  .mount('#app')