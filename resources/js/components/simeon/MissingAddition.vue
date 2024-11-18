<script setup>
import { ref } from 'vue';

const num1 = ref(0);
const num2 = ref(0);
const userResult = ref(null);
const showCorrect = ref(false);
const showIncorrect = ref(false);
const counter = ref(0);
const possibleAnswers = ref([]);

// Utility function: Generate random integer between `min` and `max` inclusive
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Utility function: Shuffle an array
const shuffle = (array) => {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
};

// Function to generate a new calculation
const makeCalculation = () => {
  counter.value++;

  // Randomly set `num1` and `num2` such that their sum is within the range 2–100
  num1.value = randomIntFromInterval(1, 99);
  num2.value = randomIntFromInterval(1, 100 - num1.value);

  const correctAnswer = num1.value + num2.value;
  userResult.value = null;

  // Generate possible answers, ensuring uniqueness
  possibleAnswers.value = [correctAnswer];
  while (possibleAnswers.value.length < 10) {
    const randomAnswer = randomIntFromInterval(correctAnswer - 5, correctAnswer + 5);
    if (!possibleAnswers.value.includes(randomAnswer) && randomAnswer > 0 && randomAnswer <= 100) {
      possibleAnswers.value.push(randomAnswer);
    }
  }

  shuffle(possibleAnswers.value);
};

// Function to check the user's answer
const checkResult = () => {
  const userAnswer = userResult.value;
  const correctAnswer = num1.value + num2.value;

  if (userAnswer === correctAnswer) {
    showCorrect.value = true;
    setTimeout(() => {
      showCorrect.value = false;
      makeCalculation(); // Prepare next question
    }, 2500);
  } else {
    showIncorrect.value = true;
    setTimeout(() => {
      showIncorrect.value = false;
    }, 2500);
  }
};

// Initialize the game
makeCalculation();
</script>


<template>
  <div>
    <div class="flex justify-between">
      <!-- Left Panel: Displaying the Equation -->
      <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-4">
        <div class="grid place-items-center h-full">
          <div v-if="showCorrect || showIncorrect" class="text-2xl">Moooooment...</div>
          <div v-else class="text-7xl text-center whitespace-nowrap overflow-hidden">
            {{ num1 }} + {{ num2 }} = ?
          </div>
        </div>
      </div>

      <!-- Center Panel: Feedback Messages -->
      <div class="h-full grid self-center">
        <div class="text-2xl text-center mb-4">Round {{ counter }}</div>
        <div v-show="showCorrect" class="text-4xl bg-green-700 text-white rounded-md py-3 px-8">
          Suuuuuuuuper 👍
        </div>
        <div v-show="showIncorrect" class="text-4xl bg-slate-700 text-white rounded-md py-3 px-8">
          Oiiiiiiii 😒
        </div>
      </div>

      <!-- Right Panel: Possible Answers -->
      <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-4">
        <div class="grid grid-cols-3 gap-4 place-content-center h-full">
          <div
            v-for="answer in possibleAnswers"
            :key="`answer${answer}`"
            class="flex justify-center items-center"
          >
            <button
              class="w-20 h-20 border-2 border-sky-800 bg-sky-400 text-slate-800 rounded-md font-semibold text-4xl hover:bg-sky-600 transition overflow-hidden"
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
/* Adjusting Flexbox Container */
.flex {
  gap: 1rem; /* Add spacing between sections */
  flex-wrap: nowrap; /* Prevent wrapping */
}

/* Center Panel Styling */
.grid {
  gap: 1.5rem;
}

/* Button Styling */
button {
  width: 4.5rem; /* Wider buttons */
  height: 4.5rem; /* Taller buttons */
  font-size: 1.75rem; /* Adjust text size */
  text-align: center; /* Center text */
  line-height: 1.5rem; /* Prevent text overflow */
}

.text-overflow {
  overflow: hidden; /* Prevent text overflow */
  text-overflow: ellipsis; /* Add ellipsis for large numbers */
}

.overflow-hidden {
  overflow: hidden; /* Ensure no overflow happens */
}

.whitespace-nowrap {
  white-space: nowrap; /* Prevent breaking into multiple lines */
}
</style>
