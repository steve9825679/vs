<template>
  <div class="game-container">
    <div class="game-area">
      <!-- 10x10 Empty Grid for orientation -->
      <div class="grid-container">
        <h4>100er Feld</h4>
        <div class="grid">
          <div
            v-for="n in 100"
            :key="n"
            class="grid-item empty"
          ></div>
        </div>
      </div>

      <!-- Exercise: Starting Number, Arrows and Result Selection Grid-->
      <div class="exercise">
        <div>
          <strong class="mr-4">{{ startNumber }}</strong>
          <span class="arrows">
            <span v-for="(arrow, index) in arrows" :key="index" class="arrow">
              {{ arrow }}
            </span>
          </span>
        </div>

        <!-- Selection Grid for the Correct Result directly underneath arrows -->
        <div class="selection-grid">
          <div class="grid grid-4x4">
            <div
              v-for="option in options"
              :key="option"
              class="grid-item-solution"
              @click="handleSelection(option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info">
      <span>Rounds played: {{ roundsPlayed }}</span>     <span v-if="feedback" class="feedback">{{ feedback }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
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

  const randomArrowCount = Math.floor(Math.random() * (5 - 3) + 3); // Between 3 and 5 arrows

  for (let i = 0; i < randomArrowCount; i++) {
    let validArrow;
    let newPosition;

    do {
      validArrow = directions[Math.floor(Math.random() * directions.length)];
      newPosition = calculateNewPosition(currentPosition, validArrow);
    } while (newPosition < 1 || newPosition > 100 || !isMoveValid(currentPosition, validArrow)); // Ensure valid position and move

    arrows.push(validArrow);
    currentPosition = newPosition;
  }

  return arrows;
}

// Helper to check if a move is valid (doesn't go off the grid)
function isMoveValid(currentPosition, direction) {
  const rowSize = 10;

  if (direction === '←' && currentPosition % rowSize === 1) {
    return false; // Can't move left if on the leftmost column
  }

  if (direction === '→' && currentPosition % rowSize === 0) {
    return false; // Can't move right if on the rightmost column
  }

  return true; // All other moves are valid
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

  while (options.size < 16) { // Adjusted for 16 values (4x4 grid)
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

.game-area {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.grid-container {
  margin: 10px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-gap: 5px;
}

.grid-item {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-item-solution {
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-item.empty {
  background-color: #f0f0f0; /* Empty grid squares */
}

.grid-4x4 {
  grid-template-columns: repeat(4, 50px);
  grid-gap: 10px;
  margin-top: 10px; /* Add margin to push the grid below the arrows */
}

.arrow {

  font-size: 24px;
  margin: 0 5px;
}

.selection-grid {
  margin-top: 10px;
}

.feedback {
  margin-top: 10px;
  font-size: 18px;
  color: #d32f2f; /* Red for incorrect feedback */
}

.info {
  margin-top: 10px;
}

.exercise {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the arrows and grid below */
}
</style>
