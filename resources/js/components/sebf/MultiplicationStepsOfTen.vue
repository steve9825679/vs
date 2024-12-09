<template>
    <div class="math-game">
      <!-- Zahlenraumauswahl -->
      <div class="range-selector">
        <div
          v-for="range in ranges"
          :key="range"
          @click="choose_reihe(range)"
          :class="['range-option', { active: range === current_reihe }]"
        >
          {{ range }}
        </div>
      </div>
  
      <!-- Hauptbereich mit Rechnung und Antwortenauswahl -->
      <div class="main-content">
        <!-- Linke Seite: Rechnung -->
        <div class="problem-display">
          <div v-if="m2 === 0" class="loading-text">Moooooment...</div>
          <div v-else class="problem-text">{{ m1 }} &centerdot; {{ m2 }} = </div>
        </div>
  
        <!-- Rechte Seite: Antwortauswahl -->
        <div class="options-container">
          <button
            v-for="result in results"
            :key="result"
            @click="check_result(result)"
            class="option-button"
          >
            {{ result }}
          </button>
        </div>
      </div>
  
      <!-- Feedback -->
      <div class="feedback" v-if="ok">Richtig! 👍</div>
      <div class="feedback" v-if="nok">Leider falsch 😒</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  let current_reihe = ref(10); // Start-Zahlenraum
  const ranges = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Auswahlmöglichkeiten
  
  const choose_reihe = (reihe) => {
      current_reihe.value = reihe;
      make_calculation();
  };
  
  let ok = ref(false);
  let nok = ref(false);
  let counter = ref(0);
  let m1 = ref(0);
  let m2 = ref(0);
  let results = ref([]);
  
  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  
  const shuffle = (array) => {
      let currentIndex = array.length;
      while (currentIndex != 0) {
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
  };
  
  const make_calculation = () => {
      m1.value = 0;
      m2.value = 0;
  
      setTimeout(() => {
          counter.value++;
          m1.value = randomIntFromInterval(1, 10);
          m2.value = current_reihe.value;
  
          results.value = [];
          for (let i = 0; i <= 10; i++) {
              results.value.push(i * current_reihe.value);
          }
          shuffle(results.value);
      }, 150);
  };
  
  const check_result = (chosen_result) => {
      const r1 = parseInt(chosen_result);
      const r2 = parseInt(m1.value * m2.value);
  
      if (r1 === r2) {
          m2.value = 0;
          ok.value = true;
          setTimeout(() => {
              ok.value = false;
              make_calculation();
          }, 2500);
      } else {
          nok.value = true;
          setTimeout(() => {
              nok.value = false;
          }, 2500);
      }
  };
  
  make_calculation();
  </script>
  
  <style scoped>
  /* Hauptcontainer */
  .math-game {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: auto;
    padding: 1rem;
  }
  
  /* Zahlenraumauswahl */
  .range-selector {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  
  .range-option {
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    transition: border-color 0.3s, color 0.3s;
  }
  
  .range-option.active {
    color: #f59e0b; /* Amber-500 */
    border-color: #f59e0b;
  }
  
  .range-option:hover {
    color: #d97706; /* Amber-700 */
  }
  
  /* Hauptinhalt */
  .main-content {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  
  /* Linke Seite: Problem-Anzeige */
  .problem-display {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 250px;
    border: 3px solid #fbbf24; /* Amber-300 */
    border-radius: 8px;
    background-color: #fef3c7; /* Amber-100 */
  }
  
  .loading-text {
    font-size: 1.5rem;
    color: #374151; /* Slate-700 */
  }
  
  .problem-text {
    font-size: 3rem;
    color: #374151; /* Slate-700 */
    font-weight: bold;
  }
  
  /* Rechte Seite: Antwortauswahl */
  .options-container {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-content: center;
    height: 250px;
    border: 3px solid #fbbf24; /* Amber-300 */
    border-radius: 8px;
    background-color: #f0fdfa; /* Cyan-50 */
    padding: 1rem;
  }
  
  .option-button {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    color: #1e293b; /* Slate-800 */
    background-color: #38bdf8; /* Sky-400 */
    border: 2px solid #075985; /* Sky-800 */
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .option-button:hover {
    background-color: #0284c7; /* Sky-600 */
    transform: scale(1.1);
  }
  
  /* Feedback */
  .feedback {
    margin-top: 1rem;
    font-size: 1.5rem;
    text-align: center;
  }
  
  .feedback.correct {
    color: #15803d; /* Green-700 */
  }
  
  .feedback.incorrect {
    color: #ef4444; /* Red-500 */
  }
  </style>
  