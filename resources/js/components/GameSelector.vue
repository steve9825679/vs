<template>
  <div class="game-selector-container">
    <!-- Top Section with "X" and Select Menu -->
    <div class="top-section">
      <div class="close-button">
        <a href="/">&#10005;</a>
      </div>
      <select v-model="selectedGame" @change="loadGame" class="selectbox">
        <option v-for="game in games" :key="game.name" :value="game.name">
          {{ game.label }}
        </option>
      </select>
    </div>

    <!-- Bottom Section with Heading and Game Container -->
    <div class="bottom-section">
      <div class="heading">
        VS Ohlsdorf App
      </div>
      <div class="game-component">
        <component :is="currentGameComponent" v-if="currentGameComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, shallowRef, onMounted, nextTick } from 'vue';
import NumberGame from './krs/NumberGame.vue';
import Calculator from './calculator/Caculator.vue';
import ArrowGame from './krs/ArrowGame.vue';
import NumberBridge from './krs/NumberBridge.vue';
import NumberOrder from './krs/NumberOrder.vue';
import MathChallengeSquare from './krs/MathChallengeSquare.vue';
import MultipleGame from './krs/MultipleGame.vue';
import VisualMultipleGame from './krs/VisualMultipleGame.vue';
import MultiplierSameGame from './krs/MultiplierSameGame.vue';
import DivisionIn from './sebf/DivisionIn.vue';
import DivisionInWithSpare from './sebf/DivisionInWithSpare.vue';
import PlusWieViel from './sebf/PlusWieViel.vue';
import MultiplicationStepsOfTen from './sebf/MultiplicationStepsOfTen.vue';
import Zahlenpyramide from './sebf/Zahlenpyramide.vue';
import AdvancedZahlenpyramide from './sebf/AdvancedZahlenpyramide.vue';
import RandomNumber from './ella/RandomNumber.vue';
import DiceRoller from './ella/DiceRoller.vue';
import Division from './sebk/Division.vue';
import SpeedRechnen from './sebk/Speed-Rechnen.vue';
import CarryOverTen from './simeon/CarryOverTen.vue';
import Board100 from './lucas/Board100.vue';
import Numberline from './krs/Numberline.vue';
import MissingAddition from './simeon/MissingAddition.vue';
import KlaPuStri from './krs/KlaPuStri.vue';
import AdditionGrid from './simeon/AdditionGrid.vue';
import FalscheZahlen from './lucas/FalscheZahlen.vue';
import Figures from './krs/Figuren.vue';

import TextBeispiel from './enio/TextBeispiel.vue';

export default {
  setup() {
    const games = [
      { name: 'NumberGame', label: 'Zahlen im 100er Feld', component: NumberGame },
      { name: 'ArrowGame', label: 'Pfade im 100er Feld', component: ArrowGame },
      { name: 'Calculator', label: 'Kleines 1x1', component: Calculator },
      { name: 'NumberBridge', label: 'Vorzehner - Nachzehner', component: NumberBridge },
      { name: 'NumberOrder', label: 'Größer / Kleiner Zeichen', component: NumberOrder },
      { name: 'MathChallengeSquare', label: 'Rechnung zu nächsten Zehner', component: MathChallengeSquare },
      { name: 'MultipleGame', label: 'Reihen mit Fehler', component: MultipleGame },
      { name: 'VisualMultipleGame', label: 'Visuelles Multiplizieren', component: VisualMultipleGame },
      { name: 'MultiplierSameGame', label: 'Gleiche Multiplikationen finden', component: MultiplierSameGame },
      { name: 'DivisionIn', label: 'Wie oft geht in', component: DivisionIn },
      { name: 'DivisionInWithSpare', label: 'Wie oft mit Rest', component: DivisionInWithSpare },
      { name: 'PlusWieViel', label: 'Plus wie viel', component: PlusWieViel },
      { name: 'MultiplicationStepsOfTen', label: 'Multiplikation in 10er Schritten', component: MultiplicationStepsOfTen },
      { name: 'Zahlenpyramide', label: 'Zahlenpyramide (Max, Jonas, Jonas, Bogie)', component: Zahlenpyramide },
      { name: 'AdvancedZahlenpyramide', label: 'Schwerere Zahlenpyramide', component: AdvancedZahlenpyramide },
      { name: 'RandomNumber', label: 'Vorgänger und Nachgänger wählen', component: RandomNumber },
      { name: 'DiceRoller', label: 'Wähle die passende Summe der Augenzahlen!', component: DiceRoller },
      { name: 'Division', label: 'Division', component: Division},
      { name: 'Speed-Rechnen', label: 'Speed-Rechen', component: SpeedRechnen},
      { name: '100er Feld', label: 'Finde Zahlen im 100er Feld', component: Board100},
      { name: 'CarryOverTen', label: '10er Überschreiten', component: CarryOverTen },
      { name: 'NumberlineGame', label: 'Raten auf dem Zahlenstrahl', component: Numberline },
      { name: 'MissingAdditon', label: 'Fehlende Addition', component: MissingAddition },
      { name: 'KlaPuStri', label: 'KlaPuStri', component: KlaPuStri },
      { name: 'AdditionGrid', label: 'Additions Raster', component: AdditionGrid },
      { name: 'FalscheZahlen', label: 'Falsche Zahlen', component: FalscheZahlen},
      { name: 'Figures', label: 'Figuren (Leo, Raphael, Ariane)', component: Figures },
      { name: 'Textbeispiele', label: 'Textbeispiele', component: TextBeispiel },
    ];

    const selectedGame = ref(games[0].name);
    const currentGameComponent = shallowRef(games[0].component);

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
/* Full-height flexbox container */
.game-selector-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  font-family: sans-serif;
  background-color: #f3f4f6; /* Equivalent to bg-gray-100 */
}

/* Top Section: Close button and dropdown */
.top-section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
}

.close-button {
  font-size: 1.5rem;
  cursor: pointer;
}

/* Dropdown styling */
.selectbox {
  padding: 5px;
  font-size: 16px;
  width: 18rem;
}

/* Bottom Section: Heading and Game Component */
.bottom-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  width: 100%;
}

/* Heading styling */
.heading {
  font-size: 2.5rem;
  color: #9c27b0; /* pink-800 color */
  background-color: #ffca28; /* amber-400 color */
  text-align: center;
  padding: 20px;
  margin-bottom: 10px;
  width: 100%;
}

/* Game Component styling */
.game-component {
  width: 100%;
  background-color: #ffffff; /* Equivalent to bg-white */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Shadow effect */
  border-radius: 8px;
  padding: 20px;
  flex-grow: 1;
}
</style>