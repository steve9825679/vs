import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


import { createApp } from 'vue';

import GameSelector from './components/GameSelector.vue';
 
createApp({})
  .component('game-selector', GameSelector)

  .mount('#app')