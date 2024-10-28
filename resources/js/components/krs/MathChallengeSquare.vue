<template>
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6">
      <!-- Left Column: Calculation Question -->
      <div class="w-full md:w-1/3 text-center md:text-left">
        <p class="text-4xl mt-2">{{ a }} {{ operation }} b = {{ c }}</p>
      </div>
  
      <!-- Middle Column: Round Counter and Feedback -->
      <div class="w-full md:w-1/3 text-center">
        <h2 class="text-xl font-semibold">Runde {{ roundCounter }}</h2>
        <p v-if="feedbackMessage" class="text-lg mt-2 font-medium text-gray-700">{{ feedbackMessage }}</p>
      </div>
  
      <!-- Right Column: Solution Grid -->
      <div class="w-full md:w-1/3 flex justify-center">
        <div class="grid grid-cols-4 gap-3">
          <button
            v-for="(option, index) in options"
            :key="index"
            @click="checkAnswer(option)"
            :class="{
              'bg-green-500 text-white': option === correctAnswer && isCorrect,
              'bg-red-500 text-white': option === selectedAnswer && !isCorrect,
              'bg-white text-gray-800': option !== selectedAnswer && option !== correctAnswer,
            }"
            class="w-16 h-16 flex items-center justify-center text-xl font-semibold border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
<script>
export default {
  name: "MathChallengeSquare",
  data() {
    return {
      a: 0,
      c: 0,
      b: 0,
      operation: "",
      options: [],
      roundCounter: 1,
      feedbackMessage: "",
      selectedAnswer: null,
      correctAnswer: null,
      isCorrect: false,
    };
  },
  methods: {
    generateCalculation() {
    // Generate a random number for 'a' between 11 and 95
    this.a = Math.floor(Math.random() * 85) + 11;

    // Randomly choose an operation (either '+' or '-')
    this.operation = Math.random() > 0.5 ? "+" : "-";

    // Calculate 'c' as a multiple of 10 and ensure 'b' is positive
    if (this.operation === "+") {
      // For addition, set 'c' as the next multiple of 10 greater than 'a'
      this.c = Math.ceil(this.a / 10) * 10;
    } else {
      // For subtraction, set 'c' as the previous multiple of 10 less than 'a'
      this.c = Math.floor(this.a / 10) * 10;
    }

    // Determine the correct answer 'b' based on the operation
    this.correctAnswer = this.operation === "+" ? this.c - this.a : this.a - this.c;

    // Generate 16 random options including the correct answer
    this.options = this.generateOptions(this.correctAnswer);
  },
  generateOptions(correctAnswer) {
    const options = new Set();
    // Add the correct answer
    options.add(correctAnswer);

    // Generate 15 random positive values close to the correct answer
    while (options.size < 9) {
      let randomOption = correctAnswer + Math.floor(Math.random() * 21 - 10);

      // Ensure the generated option is positive
      if (randomOption > 0) {
        options.add(randomOption);
      }
    }
    // Shuffle options and return as an array
    return Array.from(options).sort(() => Math.random() - 0.5);
  },
    checkAnswer(option) {
      this.selectedAnswer = option;
      if (option === this.correctAnswer) {
        this.isCorrect = true;
        this.feedbackMessage = "Richtig! Gut gemacht!";
        setTimeout(() => {
          this.nextRound();
        }, 1000);
      } else {
        this.isCorrect = false;
        this.feedbackMessage = "Leider nein, probier's nochmal!";
      }
    },
    nextRound() {
      this.roundCounter++;
      this.feedbackMessage = "";
      this.selectedAnswer = null;
      this.isCorrect = false;
      this.generateCalculation();
    },
  },
  mounted() {
    this.generateCalculation();
  },
};
</script>

<style scoped>
.math-challenge-square {
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 80px); /* Set fixed width for each column to keep a square shape */
  gap: 10px;
  justify-content: center; /* Center the grid */
  margin-top: 20px;
}

button {
  width: 80px;
  height: 80px; /* Make buttons square */
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid #000;
  border-radius: 8px; /* Rounded corners */
  background-color: #fff;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f0f0f0; /* Light hover effect */
}

.correct {
  background-color: #4caf50; /* Green for correct answers */
  color: #fff;
}

.incorrect {
  background-color: #f44336; /* Red for incorrect answers */
  color: #fff;
}

.feedback {
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
}
</style>
