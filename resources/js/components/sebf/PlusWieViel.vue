<template>
  <div>
    <!-- Zahlenraumauswahl -->
    <div class="flex justify-around my-4 py-4 bg-amber-200">
      <div v-for="range in ranges" :key="`r${range}`">
        <a 
          href="#" 
          @click.prevent="choose_range(range)"
          :class="{'text-amber-800 font-bold border-b-4 border-b-amber-800': range === current_range}"
        >
          Zahlenraum {{ range }}
        </a>
      </div>
    </div>

    <!-- Hauptbereich -->
    <div class="flex justify-between">
      <!-- Linke Seite: Rechnung -->
      <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-2">
        <div class="grid place-items-center h-full">
          <div class="text-8xl">
            {{ m1 }} + ? = {{ m2 }}
          </div>
        </div>
      </div>

      <!-- Mittlere Seite: Feedback -->
      <div class="h-full grid self-center">
        <div class="text-2xl text-center">
          Runde {{ counter }}
        </div>
        <div class="text-4xl bg-green-700 text-white rounded-md py-3 px-8" v-show="ok">
          Richtig! 👍
        </div>
        <div class="text-4xl bg-red-700 text-white rounded-md py-3 px-8" v-show="nok">
          Falsch! 😒
        </div>
      </div>

      <!-- Rechte Seite: Antwortauswahl -->
      <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-2">
        <div class="flex flex-wrap place-content-center h-full">
          <button 
            v-for="result in results" 
            :key="`result${result}`" 
            class="w-20 h-20 border-2 border-sky-800 bg-sky-400 text-slate-800 rounded-md font-semibold text-4xl m-2 p-2 hover:bg-sky-600 transition"
            @click.prevent="check_result(result)"
          >
            {{ result }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let current_range = ref(10); // Start-Zahlenraum
const ranges = [10, 20, 50, 100]; // Auswahlmöglichkeiten

const choose_range = (range) => {
  current_range.value = range;
  make_calculation();
};

let ok = ref(false);
let nok = ref(false);
let m1 = ref(0);
let m2 = ref(0);
let solution = ref(null);
let results = ref([]);
let counter = ref(0);

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
  counter.value++;
  m1.value = randomIntFromInterval(1, current_range.value - 1); // Zufällige Zahl für m1
  solution.value = randomIntFromInterval(1, current_range.value - m1.value); // Lösung berechnen
  m2.value = m1.value + solution.value; // m2 basierend auf m1 und Lösung berechnen

  // Lösche alte Antwortmöglichkeiten
  results.value = [];

  // Generiere zehn unterschiedliche Antwortmöglichkeiten, inklusive der richtigen
  const uniqueResults = new Set();
  uniqueResults.add(solution.value); // Füge die richtige Antwort hinzu

  while (uniqueResults.size < 10) {
    const randomAnswer = randomIntFromInterval(1, current_range.value);
    uniqueResults.add(randomAnswer); // Füge eine zufällige Antwort hinzu, wenn sie noch nicht existiert
  }

  results.value = Array.from(uniqueResults); // Konvertiere das Set in ein Array
  shuffle(results.value); // Mische die Ergebnisse
};

const check_result = (chosen_result) => {
  if (chosen_result === solution.value) {
    ok.value = true;
    setTimeout(() => {
      ok.value = false;
      make_calculation();
    }, 2000);
  } else {
    nok.value = true;
    setTimeout(() => {
      nok.value = false;
    }, 2000);
  }
};

make_calculation();
</script>
<style scoped>

/* Zahlenraumauswahl */
.flex {
  display: flex;
}

.justify-around {
  justify-content: space-around;
}

.justify-between {
  justify-content: space-between;
}

.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.bg-amber-200 {
  background-color: #fde68a;
}

.text-amber-800 {
  color: #92400e;
}

.font-bold {
  font-weight: bold;
}

.border-b-4 {
  border-bottom-width: 4px;
}

.border-b-amber-800 {
  border-bottom-color: #92400e;
}

/* Rechnung, Feedback und Antwortauswahl */
.h-96 {
  height: 24rem;
}

.w-96 {
  width: 24rem;
}

.border-amber-300 {
  border-color: #fcd34d;
}

.border-4 {
  border-width: 4px;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.p-2 {
  padding: 0.5rem;
}

.grid {
  display: grid;
}

.place-items-center {
  place-items: center;
}

.text-8xl {
  font-size: 4rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.bg-green-700 {
  background-color: #047857;
}

.bg-red-700 {
  background-color: #b91c1c;
}

.text-white {
  color: #fff;
}

.rounded-md {
  border-radius: 0.375rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

/* Antwortauswahl */
.border-sky-800 {
  border-color: #075985;
}

.bg-sky-400 {
  background-color: #38bdf8;
}

.text-slate-800 {
  color: #1e293b;
}

.hover\:bg-sky-600:hover {
  background-color: #0284c7;
}

.transition {
  transition: all 0.3s ease-in-out;
}

.w-20 {
  width: 5rem;
}

.h-20 {
  height: 5rem;
}

.m-2 {
  margin: 0.5rem;
}

.font-semibold {
  font-weight: 600;
}
</style>
