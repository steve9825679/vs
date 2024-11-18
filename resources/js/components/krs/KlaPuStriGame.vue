<template>
    <div>
      <!-- Selection for multipliers (2er-Reihe, 3er-Reihe, etc.) -->
      <div>
        <label v-for="number in reiheOptions" :key="number" style="margin-right: 10px;">
          <input
            type="checkbox"
            :value="number"
            v-model="selectedReihen"
          />
          {{ number }}er-Reihe
        </label>
      </div>
  
      <!-- Display the math problem and input for answer -->
      <div v-if="selectedReihen.length > 0">
        <p>Solve: {{ a }} * {{ b }} + {{ c }}</p>
        <input type="number" v-model.number="userAnswer" placeholder="Your answer" />
  
        <button @click="checkAnswer">Check Answer</button>
      </div>
      
      <!-- Display feedback -->
      <p v-if="feedback">{{ feedback }}</p>
      
      <button @click="generateProblem">New Problem</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reiheOptions: [2, 3, 4, 5, 6, 7, 8, 9, 10], // Options for the Reihe selection
        selectedReihen: [], // Holds selected Reihe options
        a: 1, // Random number for a (1 to 10)
        b: 1, // Random number for b (1 to 10)
        c: 2, // Random number for c based on selected Reihe
        userAnswer: null, // User input for the answer
        feedback: "" // Feedback message
      };
    },
    methods: {
      generateProblem() {
        this.a = Math.floor(Math.random() * 10) + 1; // Random a from 1 to 10
        this.b = Math.floor(Math.random() * 10) + 1; // Random b from 1 to 10
        
        if (this.selectedReihen.length > 0) {
          // Choose a random Reihe from the selected options
          const randomReihe = this.selectedReihen[Math.floor(Math.random() * this.selectedReihen.length)];
          // Select a random multiple of the selected Reihe
          this.c = randomReihe * (Math.floor(Math.random() * 9) + 1); // Random multiple from 2 to 10
        } else {
          this.c = 2; // Default to 2 if no Reihe is selected (shouldn't happen due to v-if in template)
        }
        
        this.userAnswer = null; // Reset answer
        this.feedback = ""; // Clear feedback
      },
      checkAnswer() {
        const correctAnswer = this.a * this.b + this.c;
        if (this.userAnswer === correctAnswer) {
          this.feedback = "Correct!";
        } else {
          this.feedback = `Incorrect. The correct answer was ${correctAnswer}.`;
        }
      }
    },
    watch: {
      selectedReihen() {
        // When selectedReihen changes, generate a new problem
        this.generateProblem();
      }
    },
    mounted() {
      this.generateProblem(); // Generate initial problem on mount
    }
  };
  </script>
  
  <style scoped>
  /* Add your styling here */
  </style>
  