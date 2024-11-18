<script setup>
import { ref } from 'vue';

const num1 = ref(0);
const num2 = ref(0);
const userResult = ref(null);
const showCorrect = ref(false);
const showIncorrect = ref(false);
const counter = ref(0);
const possibleAnswers = ref([]);

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

const makeCalculation = () => {
  counter.value++;

  // Generate `num1` as a random number within the current range
  do {
    num1.value = randomIntFromInterval(1, 100);
  } while (num1.value % 10 === 0);

  // Calculate `num2` so that the sum is 22
  num2.value = 100 - num1.value;

  const correctAnswer = num1.value + num2.value;
  userResult.value = null;

  // Generate possible answers including correct and incorrect options
  possibleAnswers.value = [correctAnswer];
  while (possibleAnswers.value.length < 10) {
    const randomAnswer = correctAnswer + randomIntFromInterval(-5, 5);
    if (!possibleAnswers.value.includes(randomAnswer) && randomAnswer >= 2 && randomAnswer <= 100) {
      possibleAnswers.value.push(randomAnswer);
    }
  }

  shuffle(possibleAnswers.value);
};

const checkResult = () => {
  const userAnswer = userResult.value;
  const correctAnswer = 22 - num1.value;

  if (userAnswer === correctAnswer) {
    num2.value = 0;
    showCorrect.value = true;
    setTimeout(() => {
      showCorrect.value = false;
      makeCalculation();
    }, 2500);
  } else {
    showIncorrect.value = true;
    setTimeout(() => {
      showIncorrect.value = false;
    }, 2500);
  }
};

makeCalculation();
</script>

<template>
  <div>
    <div class="flex justify-between">
      <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-2">
        <div class="grid place-items-center h-full">
          <div v-if="num2 === 0" class="text-2xl">Moooooment...</div>
          <div v-else class="text-8xl">{{ num1 }} + _ = {{ num2 }}</div>  
        </div>
      </div>
      <div class="h-full grid self-center">
        <div class="text-2xl text-center">Round {{ counter }}</div>
        <div v-show="showCorrect" class="text-4xl bg-green-700 text-white rounded-md py-3 px-8">
          Suuuuuuuuper 👍
        </div>
        <div v-show="showIncorrect" class="text-4xl bg-slate-700 text-white rounded-md py-3 px-8">
          Oiiiiiiii 😒
        </div>
      </div>
      <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-2">
        <div class="flex flex-wrap place-content-center h-full">
          <div v-for="answer in possibleAnswers" :key="`answer${answer}`">
            <button
              class="w-16 h-16 border-2 border-sky-800 bg-sky-400 text-slate-800 rounded-md font-semibold text-4xl m-2 p-2 hover:bg-sky-600 transition"
              @click.prevent="userResult = answer; checkResult()"
            >
              {{ answer }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>   

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
