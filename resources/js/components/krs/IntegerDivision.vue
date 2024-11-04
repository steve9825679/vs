<template>
    <div class="division-game">
      <!-- Checkbox list for possible divisors -->
      <div class="divisor-selection">
        <label v-for="num in possibleDivisors" :key="num">
          <input type="checkbox" :value="num" v-model="selectedDivisors" />
          {{ num }}
        </label>
      </div>
  
      <div class="division-game-content">
        <!-- Division problem on the left -->
        <div class="problem">
          <h3>{{ dividend }} ÷ {{ divisor }} = ?</h3>
        </div>
  
        <!-- Center counter and feedback -->
        <div class="feedback">
          <p>Attempt {{ attempts }}</p>
          <p>{{ feedbackMessage }}</p>
        </div>
  
        <!-- Right side for possible solutions in 3x3 grid -->
        <div class="solutions-grid">
          <button
            v-for="solution in solutions"
            :key="solution"
            @click="checkSolution(solution)"
            class="solution-btn"
          >
            {{ solution }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dividend: 0,
        divisor: null,
        selectedDivisors: [2], // Default select divisor 2
        possibleDivisors: [2, 3, 4, 5, 6, 7, 8, 9],
        correctAnswer: null,
        solutions: [],
        attempts: 0,
        feedbackMessage: "",
      };
    },
    watch: {
      selectedDivisors() {
        this.startNewProblem();
      },
    },
    methods: {
      // Generate a new problem with an integer result
      startNewProblem() {
        if (this.selectedDivisors.length === 0) return;
  
        // Randomly choose a divisor from the selected list
        this.divisor = this.selectedDivisors[
          Math.floor(Math.random() * this.selectedDivisors.length)
        ];
  
        // Ensure that the dividend results in an integer when divided by the divisor
        this.dividend = this.generateValidDividend(this.divisor);
        this.correctAnswer = this.dividend / this.divisor;
  
        // Generate solution options, including the correct answer
        this.solutions = this.generateSolutions();
        this.attempts = 0;
        this.feedbackMessage = "";
      },
      // Generate a valid dividend for integer division
      generateValidDividend(divisor) {
        // Choose a random integer multiplier between 1 and 10
        const multiplier = Math.floor(Math.random() * 10) + 1;
        // Calculate the dividend as an exact multiple of the divisor
        return divisor * multiplier;
        },
      // Generate an array of solutions with one correct answer
      generateSolutions() {
        const answers = new Set();
        answers.add(this.correctAnswer); // Add correct answer first
  
        // Generate other random answers
        while (answers.size < 9) { // Fill 9 spots for a 3x3 grid
          const wrongAnswer = this.correctAnswer + Math.floor(Math.random() * 6) - 3;
          if (wrongAnswer !== this.correctAnswer && wrongAnswer > 0) {
            answers.add(wrongAnswer);
          }
        }
  
        return Array.from(answers).sort(() => Math.random() - 0.5); // Shuffle answers
      },
      // Check if the user's choice is correct
      checkSolution(selectedSolution) {
        this.attempts++;
        if (selectedSolution === this.correctAnswer) {
          this.feedbackMessage = "Correct! Well done.";
          setTimeout(() => this.startNewProblem(), 1500); // Start new problem after a short delay
        } else {
          this.feedbackMessage = "Incorrect, try again.";
        }
      },
    },
    mounted() {
      this.startNewProblem();
    },
  };
  </script>
  
  <style scoped>
  .division-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .divisor-selection {
    margin-bottom: 20px;
  }
  
  .division-game-content {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 800px;
  }
  
  .problem {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .feedback {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .solutions-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3x3 grid */
    gap: 10px; /* Spacing between buttons */
  }
  
  .solution-btn {
    padding: 15px;
    font-size: 16px;
    text-align: center;
  }
  </style>
  