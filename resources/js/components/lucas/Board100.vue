<script setup>
import { ref, onMounted } from 'vue';
import JSConfetti from 'js-confetti';
const jsConfetti = new JSConfetti();

let randNumber = ref(0);
let round = ref(1);
const numbers = ref(Array.from({ length: 100 }, (_, i) => i + 1));
let feedbackMessage = ref("Finde die versteckte Nummer!");
let feedbackColor = ref('');
const selectedNumbers = ref(new Set());

const randomNumber = (min, max) => {
  randNumber.value = Math.floor(Math.random() * (max - min + 1) + min);
};

function generateAddNew() {
  randomNumber(1, 100);
}

function checkNumber(number) {
  if (selectedNumbers.value.has(number)) return;
  selectedNumbers.value.add(number);

  if (number === randNumber.value) {
    feedbackMessage.value = "Suuuuuuper 👍 gefunden!";
    feedbackColor.value = 'bg-green-500';
    round.value++;
    selectedNumbers.value.clear();
    jsConfetti.addConfetti({
            confettiColors: [
                '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
            ],
          });
    randomNumber(1, 100);
    setTimeout(() => {
      feedbackMessage.value = '';
      feedbackColor.value = '';
    }, 2000);
  } else {
    feedbackMessage.value = number < randNumber.value 
    ? "Zu niedrig! Versuch's höher 🔼" 
    : "Zu hoch! Versuch's niedriger 🔽";
    feedbackColor.value = 'bg-slate-500';
    setTimeout(() => {
      feedbackMessage.value = '';
      feedbackColor.value = '';
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
      <h1 :class="feedbackColor">{{ feedbackMessage || `Runde ${round}` }}</h1>
      <h1 class="number">{{randNumber}}</h1>
    </div>

    <div class="grid">
      <div
        v-for="number in numbers"
        :key="number"
        @click="checkNumber(number)"
        class="grid-item"
        :class="{ revealed: selectedNumbers.has(number) }"
      >
        {{ selectedNumbers.has(number) ? number : "?" }}
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.header {
  margin-bottom: 20px;
}

.number {
  font-size: 2em;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 5px;
  width: 100%;
  padding: 0;
  margin: 0;
}

.grid-item {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  font-size: 0.9em;
  font-weight: bold;
  color: #d97706;
  background-color: #fde68a;
  transition: background-color 0.3s;
}

.grid-item.revealed {
  background-color: #fcd34d;
}

.grid-item:hover {
  background-color: #fcd34d;
}
</style>
