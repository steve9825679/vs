<script setup>
import { ref, onMounted } from 'vue';

let randNumber = ref(0);
let round = ref(1);
const numbers = ref(Array.from({ length: 100 }, (_, i) => i + 1));
let ok = ref(false);
let wrong = ref(false);

const randomNumber = (min, max) => {
  randNumber.value = Math.floor(Math.random() * (max - min + 1) + min);
};

function generateAddNew() {
  randomNumber(1, 100);
}

function checkNumber(number) {
  if (number === randNumber.value) {
    ok.value = true;
    round.value++;
    randomNumber(1, 100);
    setTimeout(() => {
      ok.value = false;
    }, 2000);
  } else {
    wrong.value = true;
    setTimeout(() => {
      wrong.value = false;
    }, 2000);
  }
}

onMounted(() => {
  randomNumber(1, 100);
});
</script>

<template>
  <div id="app">
    <div class="header">
      <h1 class="number">Drücke auf {{ randNumber }};</h1>
      <h1>Runde {{ round }}</h1>
      <div class="message" :class="{'success': ok, 'error': wrong}">
        <span v-if="ok">Suuuuuuper 👍</span>
        <span v-if="wrong">Oiiiiiiii 😒</span>
      </div>
    </div>
    <div class="grid">
      <div
        v-for="number in numbers"
        :key="number"
        @click="checkNumber(number)"
        class="grid-item"
      >
        {{ number }}
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
  max-width: 600px; /* Adjust the overall container width */
  margin: 0 auto; /* Center the container */
}

.header {
  margin-bottom: 20px;
}

.number {
  font-size: 2em;
  margin: 0;
}

.message {
  font-size: 1.2em;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  white-space: nowrap;
}

.success {
  background-color: #38a169;
}

.error {
  background-color: #718096;
}

.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr); /* 10 columns for balance */
  gap: 5px; /* Space between grid items */
  width: 100%; /* Ensure the grid spans the entire width */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margin */
}

.grid-item {
  border: 1px solid #ccc;
  padding: 10px; /* Moderate padding for better fit */
  cursor: pointer;
  text-align: center;
  font-size: 0.9em; /* Adjusted font size */
  font-weight: bold;
  color: #d97706;
  background-color: #fde68a;
  transition: background-color 0.3s;
}

.grid-item:hover {
  background-color: #fcd34d;
}
</style>
