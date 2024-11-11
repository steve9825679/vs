<script setup>
import { ref } from 'vue';

// Default `current_reihe` to 10
const current_reihe = ref(10);
const num1 = ref(0);
const num2 = ref(0);
const user_result = ref(null);
const showOk = ref(false);
const showNok = ref(false);
const counter = ref(0);
const possibleAnswers = ref([]);

// Utility functions
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffle = (array) => {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
};

// Main calculation logic with strict boundary crossing
const make_calculation = () => {
  counter.value++;
  
  // Generate `num1` as a random number below `current_reihe`
  console.log(current_reihe.value);
  do {
    num1.value = randomIntFromInterval(1, current_reihe.value - 1);
  } while (num1.value % 10 === 0);

  // Calculate `num2` so that the sum crosses the boundary `current_reihe`
  const minNum2 = current_reihe.value + 1 - num1.value; // Minimum num2 to cross boundary
  const maxNum2 = Math.min(current_reihe.value + 5 - num1.value, current_reihe.value -1); // Max num2 within next boundary

  // Ensure num2 is within range to make the sum exceed `current_reihe` but less than the next boundary
  num2.value = randomIntFromInterval(minNum2, maxNum2);

  const correctAnswer = num1.value + num2.value;
  user_result.value = null;

  // Generate possible answers including correct and incorrect options
  possibleAnswers.value = [correctAnswer];
  while (possibleAnswers.value.length < 10) {
    const randomAnswer = correctAnswer + randomIntFromInterval(-5, 5);
    if (!possibleAnswers.value.includes(randomAnswer) && randomAnswer >= 0) {
      possibleAnswers.value.push(randomAnswer);
    }
  }

  // Shuffle the possible answers
  shuffle(possibleAnswers.value);
};

// Result checking logic
const check_result = () => {
  const r1 = user_result.value;
  const r2 = num1.value + num2.value;

  if (r1 === r2) {
    num2.value = 0;
    showOk.value = true;
    setTimeout(() => {
      showOk.value = false;
      make_calculation();
    }, 2500);
  } else {
    showNok.value = true;
    setTimeout(() => {
      showNok.value = false;
    }, 2500);
  }
};

// Start with a calculation for the default `current_reihe`
make_calculation();

</script>

<template>
  <div>
    <div class="flex justify-around my-4 py-4 bg-amber-200">
      <div v-for="reihe in [10, 20, 30, 40]" :key="`r${reihe}`">
        <a
          href="#"
          @click.prevent="current_reihe = reihe; make_calculation()"
          :class="{
            'text-amber-800 font-bold border-b-4 border-b-amber-800':
              reihe == current_reihe
          }"
        >
          {{ reihe }}er - Überschreiten
        </a>
      </div>
    </div>

    <div class="flex justify-between">
      <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-2">
        <div class="grid place-items-center h-full">
          <div v-if="num2 === 0" class="text-2xl">Moooooment...</div>
          <div v-else class="text-8xl">{{ num1 }} + {{ num2 }} =</div>
        </div>
      </div>
      <div class="h-full grid self-center">
        <div class="text-2xl text-center">Runde {{ counter }}</div>
        <div
          class="text-4xl bg-green-700 text-white rounded-md py-3 px-8"
          v-show="showOk"
        >
          Suuuuuuuuper 👍
        </div>
        <div
          class="text-4xl bg-slate-700 text-white rounded-md py-3 px-8"
          v-show="showNok"
        >
          Oiiiiiiii 😒
        </div>
      </div>
      <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-2">
        <div class="flex flex-wrap place-content-center h-full">
          <div v-for="answer in possibleAnswers" :key="`answer${answer}`">
            <button
              class="w-16 h-16 border-2 border-sky-800 bg-sky-400 text-slate-800 rounded-md font-semibold text-4xl m-2 p-2 hover:bg-sky-600 transition"
              @click.prevent="user_result = answer; check_result()"
            >
              {{ answer }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
