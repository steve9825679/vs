import './bootstrap';

import Alpine from 'alpinejs';

import { createApp } from 'vue';
import GameSelector from './components/GameSelector.vue';

window.Alpine = Alpine;

Alpine.start();

createApp({})
  .component('game-selector', GameSelector)
  .mount('#app');
