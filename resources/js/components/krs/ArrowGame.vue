<template>
    <div class="game-container">
      <h3>Start Number: {{ startNumber }}</h3>
      
      <div class="arrows">
        <span v-for="(arrow, index) in arrows" :key="index" class="arrow">
          {{ arrow }}
        </span>
      </div>
      
      <div class="selection-grid">
        <h4>Select the correct result:</h4>
        <div class="grid">
          <div
            v-for="option in options"
            :key="option"
            class="grid-item"
            @click="handleSelection(option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
  
      <p v-if="feedback" class="feedback">{{ feedback }}</p>
  
      <div class="info">
        <p>Rounds played: {{ roundsPlayed }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const grid = Array.from({ length: 100 }, (_, i) => i + 1); // 10x10 grid
      const startNumber = ref(generateRandomNumber());
      const arrows = ref(generateArrows(startNumber.value));
      const correctResult = ref(calculateResult(startNumber.value, arrows.value));
      const options = ref(generateOptions(correctResult.value));
      const feedback = ref('');
      const roundsPlayed = ref(0); // Tracks the rounds played
  
      // Handle user selection
      const handleSelection = (option) => {
        if (option === correctResult.value) {
          feedback.value = "Correct!";
          roundsPlayed.value++;
          setTimeout(nextRound, 1000); // Start the next round after 1 second
        } else {
          feedback.value = "Try again!";
        }
      };
  
      // Start the next round with new values
      const nextRound = () => {
        startNumber.value = generateRandomNumber();
        arrows.value = generateArrows(startNumber.value);
        correctResult.value = calculateResult(startNumber.value, arrows.value);
        options.value = generateOptions(correctResult.value);
        feedback.value = '';
      };
  
      return {
        startNumber,
        arrows,
        options,
        feedback,
        roundsPlayed,
        handleSelection,
      };
    },
  };
  
  // Helper to generate a random number between 1 and 100
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  // Helper to generate 3 to 5 random arrows
  function generateArrows(start) {
    const directions = ['↑', '↓', '←', '→']; // Up, Down, Left, Right
    const arrows = [];
    let currentPosition = start;
  
    const randomArrowCount = Math.floor(Math.random() * 3) + 3; // Between 3 and 5 arrows
  
    for (let i = 0; i < randomArrowCount; i++) {
      let validArrow;
      let newPosition;
  
      do {
        validArrow = directions[Math.floor(Math.random() * directions.length)];
        newPosition = calculateNewPosition(currentPosition, validArrow);
      } while (newPosition < 1 || newPosition > 100);
  
      arrows.push(validArrow);
      currentPosition = newPosition;
    }
  
    return arrows;
  }
  
  // Helper to calculate the new position based on the current position and direction
  function calculateNewPosition(currentPosition, direction) {
    const rowSize = 10;
  
    switch (direction) {
      case '↑': // Up
        return currentPosition - rowSize;
      case '↓': // Down
        return currentPosition + rowSize;
      case '←': // Left
        return currentPosition % rowSize === 1 ? currentPosition : currentPosition - 1;
      case '→': // Right
        return currentPosition % rowSize === 0 ? currentPosition : currentPosition + 1;
      default:
        return currentPosition;
    }
  }
  
  // Helper to follow the arrows and find the final result
  function calculateResult(startNumber, arrows) {
    let currentPosition = startNumber;
  
    arrows.forEach((arrow) => {
      currentPosition = calculateNewPosition(currentPosition, arrow);
    });
  
    return currentPosition;
  }
  
  // Helper to generate the 4x4 grid of random options (including the correct result)
  function generateOptions(correctResult) {
    const options = new Set();
    options.add(correctResult);
  
    while (options.size < 4) {
      const randomOption = Math.floor(Math.random() * 100) + 1;
      options.add(randomOption);
    }
  
    return Array.from(options).sort(() => Math.random() - 0.5); // Shuffle the options
  }
  </script>
  
  <style scoped>
  .game-container {
    text-align: center;
  }
  
  .arrows {
    margin: 10px 0;
  }
  
  .arrow {
    font-size: 24px;
    margin: 0 5px;
  }
  
  .selection-grid {
    margin: 20px 0;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 50px);
    grid-gap: 10px;
    justify-content: center;
  }
  
  .grid-item {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
  }
  
  .feedback {
    margin-top: 10px;
    font-size: 18px;
    color: #d32f2f; /* Red for incorrect feedback */
  }
  
  .info {
    margin-top: 10px;
  }
  </style>
  