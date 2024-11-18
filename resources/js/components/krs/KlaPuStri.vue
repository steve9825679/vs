<template>
    <div class="game-container">
      <!-- First row: Selectable Reihen options -->
      <div class="reihe-selection">
        <label v-for="number in reiheOptions" :key="number" class="reihe-option">
          <input
            type="checkbox"
            :value="number"
            v-model="selectedReihen"
          />
          {{ number }}er-Reihe
        </label>
      </div>
  
      <!-- Second row: Calculation, Feedback/Round, and Answer Grid -->
      <div class="game-content">
        <!-- Left side: Calculation -->
        <div class="calculation">
          <p>Berechne: {{ a }} * {{ b }} + {{ c }} = ___</p>
        </div>
  
        <!-- Middle section: Feedback and round counter -->
        <div class="middle">
          <p>Runde: {{ round }}</p>
          <p class="feedback">{{ feedback }}</p>
        </div>
  
        <!-- Right side: 3x3 grid of answer options -->
        <div class="answer-grid">
          <div
            v-for="(option, index) in answerOptions"
            :key="index"
            class="answer-option"
            @click="checkAnswer(option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reiheOptions: [2, 3, 4, 5, 6, 7, 8, 9, 10], // Options for the Reihe selection
        selectedReihen: [2], // "2er Reihe" is selected by default
        a: 1, // Random number for a (1 to 10)
        b: 2, // "Reihe" based number for b
        c: 2, // Random number for c based on selected Reihe
        answerOptions: [], // Array to hold answer options for the 3x3 grid
        feedback: "", // Feedback message
        round: 1, // Count of rounds
      };
    },
    methods: {
      generateProblem() {
        this.a = Math.floor(Math.random() * 10) + 1; // Random a from 1 to 10
        
        if (this.selectedReihen.length > 0) {
          // Choose a random Reihe from the selected options for b
          this.b = this.selectedReihen[Math.floor(Math.random() * this.selectedReihen.length)];
          
          // Choose a random Reihe from the selected options for c as well
          const randomReihe = this.selectedReihen[Math.floor(Math.random() * this.selectedReihen.length)];
          this.c = randomReihe * (Math.floor(Math.random() * 9) + 1); // Random multiple from 2 to 10
        } else {
          this.b = 2; // Default b to 2 if no Reihe is selected
          this.c = 2; // Default c to 2 if no Reihe is selected
        }
        
        const correctAnswer = this.a * this.b + this.c;
        this.answerOptions = this.generateAnswerOptions(correctAnswer);
        this.feedback = ""; // Clear feedback
      },
      generateAnswerOptions(correctAnswer) {
        const options = new Set([correctAnswer]);
        // Generate 8 additional random answers that are close to the correct answer
        while (options.size < 9) {
          const randomOption = correctAnswer + (Math.floor(Math.random() * 20) - 10); // Range around correct answer
          if (randomOption > 0) options.add(randomOption); // Only positive answers
        }
        return [...options].sort(() => Math.random() - 0.5); // Randomize the order
      },
      checkAnswer(option) {
        const correctAnswer = this.a * this.b + this.c;
        if (option === correctAnswer) {
          this.feedback = "Richtig!";
          setTimeout(() => {
            this.round++; // Increase round
            this.generateProblem(); // Generate a new problem
          }, 1000); // Wait 1 second for feedback before moving to the next round
        } else {
          this.feedback = `Leider nein, probier's nochmal!`;
        }
      }
    },
    watch: {
      selectedReihen() {
        this.generateProblem(); // Generate a new problem when selections change
      }
    },
    mounted() {
      this.generateProblem(); // Generate initial problem on mount
    }
  };
  </script>
  
  <style scoped>
  /* Container for the whole game */
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  /* First row: Reihen selection with spacing between options */
  .reihe-selection {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  /* Second row: Layout in three columns for Calculation, Feedback, and Answer Grid */
  .game-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  
  /* Left side: Calculation */
  .calculation {
    font-size: 24px;
    width: 20%;
    text-align: left;
  }
  
  /* Middle section: Feedback and round counter */
  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
  }
  
  .middle .feedback {
    font-size: 20px;
    color: #333;
    margin-top: 10px;
  }
  
  /* Right side: 3x3 grid of answer options */
  .answer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 20%;
    text-align: right;
  }
  
  /* Styling for each answer option */
  .answer-option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .answer-option:hover {
    background-color: #d0d0d0;
  }
  </style>
  