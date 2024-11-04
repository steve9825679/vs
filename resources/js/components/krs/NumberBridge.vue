<template>
    <div class="container">
      <div class="space-selection">
        <button @click="setNumberSpace(20)">20er Zahlenraum</button>
        <button @click="setNumberSpace(50)">50er Zahlenraum</button>
        <button @click="setNumberSpace(100)">100er Zahlenraum</button>
      </div>
      
      <div v-if="numberSpace > 0" class="game-area">
        <h1>
            Zahl: {{ randomNumber }}
            <span v-if="feedback" class="feedback">
                {{ feedback }}
            </span>
        </h1>
  
        <div class="grids">
          <!-- Lower Number Grid -->
          <div class="grid2">
            <h2>Vorzehner:</h2>
            <div class="grid-container2">
              <button
                v-for="(num, index) in lowerOptions"
                :key="index"
                :class="['grid-item', getClass(num, 'lower')]"
                @click="checkLower(num)"
              >
                {{ num }}
              </button>
            </div>
          </div>
  
          <!-- Upper Number Grid -->
          <div class="grid">
            <h2>Nachzehner:</h2>
            <div class="grid-container2">
              <button
                v-for="(num, index) in upperOptions"
                :key="index"
                :class="['grid-item', getClass(num, 'upper')]"
                @click="checkUpper(num)"
              >
                {{ num }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        numberSpace: 0,    // Chosen number space
        randomNumber: null, // Random number within the chosen space
        lowerOption: null,  // Correct lower multiple of 10
        upperOption: null,  // Correct upper multiple of 10
        lowerOptions: [],   // Array for lower grid options
        upperOptions: [],   // Array for upper grid options
        lowerCorrect: false, // Track if the correct lower number was selected
        upperCorrect: false, // Track if the correct upper number was selected
        selectedLower: null, // Store the selected lower number for visual feedback
        selectedUpper: null, // Store the selected upper number for visual feedback
        isLowerCorrect: null, // Track if lower answer was correct or wrong
        isUpperCorrect: null, // Track if upper answer was correct or wrong
        feedback: '', // Feedback for the user
      };
    },
    methods: {
      // Set the number space and generate a random number
      setNumberSpace(space) {
        this.numberSpace = space;
        this.generateRandomNumber();
      },
  
      // Generate a random number within the chosen space (between 1 and space-1)
      generateRandomNumber() {
        do {
          this.randomNumber = Math.floor(Math.random() * (this.numberSpace - 1)) + 1;
        } while (this.randomNumber % 10 === 0); // Repeat if the number is a multiple of 10
  
        this.setOptions();
        this.feedback = '';  // Clear feedback for the new round
        this.lowerCorrect = false; // Reset correctness for the new round
        this.upperCorrect = false; // Reset correctness for the new round
        this.selectedLower = null; // Reset selected lower number
        this.selectedUpper = null; // Reset selected upper number
        this.isLowerCorrect = null; // Reset visual feedback state
        this.isUpperCorrect = null; // Reset visual feedback state
      },
  
      // Generate random distractor options and set correct answer in the grid
      generateDistractors(correctValue, limit) {
        const options = new Set();
        options.add(correctValue);
  
        while (options.size < 16) {
          const randomOption = Math.floor(Math.random() * limit);
          options.add(randomOption);
        }
  
        return Array.from(options);
      },
  
      // Calculate the lower and upper multiples of 10 and populate grid options
      setOptions() {
        const lower = Math.floor(this.randomNumber / 10) * 10;
        this.lowerOption = lower;
        this.upperOption = lower + 10;
  
        // Generate distractor options for both grids (4x4 grids)
        this.lowerOptions = this.shuffleArray(this.generateDistractors(this.lowerOption, this.numberSpace));
        this.upperOptions = this.shuffleArray(this.generateDistractors(this.upperOption, this.numberSpace + 10));
      },
  
      // Shuffle array (Fisher-Yates shuffle algorithm)
      shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },
  
      // Check if the user selected the correct lower multiple of 10
      checkLower(selected) {
        this.selectedLower = selected; // Store selected lower number for feedback
        this.isLowerCorrect = selected === this.lowerOption; // Track correctness state
  
        if (this.isLowerCorrect) {
          this.feedback = 'Richtig!';
          this.lowerCorrect = true;
        } else {
          this.feedback = 'Leider nein!';
        }
  
        this.checkWinCondition();
      },
  
      // Check if the user selected the correct upper multiple of 10
      checkUpper(selected) {
        this.selectedUpper = selected; // Store selected upper number for feedback
        this.isUpperCorrect = selected === this.upperOption; // Track correctness state
  
        if (this.isUpperCorrect) {
          this.feedback = 'Richtig!';
          this.upperCorrect = true;
        } else {
          this.feedback = 'Leider nein!';
        }
  
        this.checkWinCondition();
      },
  
      // Check if both lower and upper numbers are correct, then generate a new number
      checkWinCondition() {
        if (this.lowerCorrect && this.upperCorrect) {
          this.feedback = 'Bingooo! Nächste Runde...';
          setTimeout(() => {
            this.generateRandomNumber(); // Start next round
          }, 1000); // Delay for 1 second before generating a new random number
        }
      },
  
      // Get the class based on correctness for visual feedback
      getClass(num, type) {
        if (type === 'lower') {
          if (this.selectedLower === num) {
            return this.isLowerCorrect ? 'correct' : 'wrong';
          }
        }
        if (type === 'upper') {
          if (this.selectedUpper === num) {
            return this.isUpperCorrect ? 'correct' : 'wrong';
          }
        }
        return '';
      }
    }
  };
  </script>
  
  <style>
  .container {
    text-align: center;
    padding: 20px;
  }
  
  .space-selection button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .game-area {
    margin-top: 20px;
  }
  
  h1 {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  .grids {
    display: flex;
    justify-content: space-around;
  }
  
  .grid2 {
    margin: 20px;
  }
  
  .grid-container2 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin-top: 10px;
  }
  
  .grid-item {
    padding: 20px;
    font-size: 24px;
    cursor: pointer;
    border: 2px solid black;
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }
  
  .grid-item:hover {
    background-color: #f0f0f0;
  }
  
  /* Highlight the selected correct or wrong number */
  .correct {
    background-color: #28a745; /* Green background for correct */
    border: 2px solid #218838; /* Darker green border */
    color: white;
  }
  
  .wrong {
    background-color: #dc3545; /* Red background for wrong */
    border: 2px solid #c82333; /* Darker red border */
    color: white;
  }
  
  .feedback {
    font-size: 18px;
    color: red;
    margin-top: 20px;
  }
  </style>
  