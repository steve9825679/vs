import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


import { createApp } from 'vue';
import Calculator from './components/calculator/Caculator.vue';
import PredecessorSucessor from './components/ella/PredecessorSuccessor.vue';
 
createApp({})
  .component('predecessor-successor', PredecessorSucessor)
  .mount('#app')