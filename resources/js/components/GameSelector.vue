<template>
    <div class="game-selector-container">
      <!-- Dropdown to select a game -->
      <select v-model="selectedGame" @change="loadGame" class="selectbox">
        <option v-for="game in games" :key="game.name" :value="game.name">
          {{ game.label }}
        </option>
      </select>

      <div class="text-center text-6xl py-4 text-pink-800 bg-amber-400">
          VS Ohlsdorf App
      </div>

      <!-- Display the selected game dynamically -->
      <component :is="currentGameComponent" v-if="currentGameComponent"></component>
    </div>
</template>
  
<script>
  import { ref, shallowRef } from 'vue';
  import NumberGame from './krs/NumberGame.vue';
  import Calculator from './calculator/Caculator.vue';
  import ArrowGame from './krs/ArrowGame.vue';
  import NumberBridge from './krs/NumberBridge.vue';
  
  export default {
    setup() {
      // List of available games
      const games = [
        { name: 'NumberGame', label: 'Zahlen im 100er Feld', component: NumberGame },
        { name: 'ArrowGame', label: 'Pfade im 100er Feld', component: ArrowGame },
        { name: 'Calculator', label: 'Kleines 1x1', component: Calculator },
        { name: 'NumberBridge', label: 'Vorzehner - Nachzehner', component: NumberBridge },
      ];
  
      // Reactive reference for selected game
      const selectedGame = ref(games[0].name);
      const currentGameComponent = shallowRef(games[0].component);
  
      // Load the selected game component
      const loadGame = () => {
        const game = games.find((g) => g.name === selectedGame.value);
        currentGameComponent.value = game.component;
      };
  
      return {
        games,
        selectedGame,
        currentGameComponent,
        loadGame,
      };
    },
  };
</script>
  
<style scoped>
  .game-selector-container {
    text-align: center;
    margin-top: 20px;
  }
  
  select {
    margin: 10px 0;
    padding: 5px;
    font-size: 16px;
    width:18rem;
  }
</style>
  