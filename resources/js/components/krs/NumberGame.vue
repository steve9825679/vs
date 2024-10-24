<template>
    <div class="game-container">
      <h3>Wo versteckt sich die Zahl <strong>{{ targetNumber }}</strong> im 100er Feld?</h3>
      <div class="info">
        <span>Gespielte Runden: {{ roundsPlayed }}</span> <span v-if="feedback" class="feedback">{{ feedback }}</span>
      </div>
  
      <div class="grid">
        <div
          v-for="number in grid"
          :key="number"
          class="grid-item"
          :class="{ correct: isCorrect(number) }"
          @click="handleClick(number)"
        >
          <!-- The number is hidden, only displayed when clicked correctly -->
          <span v-if="correctNumber === number">{{ number }}</span>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const grid = Array.from({ length: 100 }, (_, i) => i + 1); // Array of numbers 1 to 100
      const targetNumber = ref(Math.floor(Math.random() * 100) + 1); // Random number to find
      const correctNumber = ref(null); // The number the user clicked correctly
      const feedback = ref(''); // Feedback for the user
      const roundsPlayed = ref(0); // Counter for rounds played
  
      // Handle when a user clicks on a number
      const handleClick = (number) => {
        if (number === targetNumber.value) {
          feedback.value = "Richtig!";
          correctNumber.value = number;
          roundsPlayed.value++;
          setTimeout(nextRound, 1500); // Start the next round after 1 second
        } else {
          feedback.value = "Leider nein, versuchs nochmal!";
        }
      };
  
      // Start the next round by generating a new random number
      const nextRound = () => {
        targetNumber.value = Math.floor(Math.random() * 100) + 1;
        correctNumber.value = null;
        feedback.value = "";
      };
  
      // Check if the number clicked is correct
      const isCorrect = (number) => {
        return correctNumber.value === number;
      };
  
      return {
        grid,
        targetNumber,
        correctNumber,
        feedback,
        roundsPlayed,
        handleClick,
        isCorrect,
        nextRound,
      };
    },
  };
  </script>
  
  <style scoped>
  .game-container {
    text-align: center;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(10, 50px);
    grid-gap: 5px;
    justify-content: center;
    margin: 20px auto;
  }
  
  .grid-item {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .grid-item.correct {
    background-color: #c8e6c9; /* Light green */
  }
  
  .feedback {
    margin-top: 10px;
    font-size: 18px;
    color: #d32f2f; /* Red for incorrect feedback */
  }
  
  .info {
    margin-top: 15px;
  }
  </style>
  