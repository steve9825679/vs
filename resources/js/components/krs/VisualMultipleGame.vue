<template>
    <div class="game-container">
      <!-- Rectangle Display on the Left -->
      <div class="rectangle">
        <div
          v-for="row in length"
          :key="`row-${row}`"
          class="row"
          :style="{ color: getBrightColor(row) }"
        >
          <div
            v-for="col in width"
            :key="`col-${col}`"
            class="symbol"
          >&#9786;</div>
        </div>
      </div>
  
      <!-- Round Number and Feedback in the Middle -->
      <div class="game-info">
        <p>Runde {{ round }}</p>
        <p>{{ feedback }}</p>
      </div>
  
      <!-- 4x4 Grid with Options on the Right -->
      <div class="solution-grid">
        <div
          v-for="(number, index) in solutionGrid"
          :key="index"
          class="grid-item"
          :class="{ 'correct': isCorrect(index), 'wrong': isWrong(index) }"
          @click="handleClick(index)"
        >
          {{ number }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChallengeGame",
    data() {
      return {
        width: 1,
        length: 1,
        round: 1,
        targetSolution: 0,
        feedback: "Wähle die richtige Antwort...",
        solutionGrid: [],
        clickedIndex: null,
        brightColors: ["#8D6E63", "#A1887F", "#D32F2F", "#7B1FA2", "#303F9F", "#1976D2", "#0288D1", "#388E3C", "#FBC02D", "#F57C00"]
      };
    },
    mounted() {
      this.newRound();
    },
    methods: {
      generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      getBrightColor(index) {
        return this.brightColors[index % this.brightColors.length];
      },
      newRound() {
        // Generate random width and length
        this.width = this.generateRandomNumber(1, 10);
        this.length = this.generateRandomNumber(1, 10);
        this.targetSolution = this.width * this.length;
  
        // Generate a 4x4 grid with one correct answer and 15 random numbers
        this.solutionGrid = Array.from({ length: 15 }, () =>
          this.generateRandomNumber(1, 100)
        );
        this.solutionGrid.push(this.targetSolution);
        this.solutionGrid = this.solutionGrid.sort(() => Math.random() - 0.5);
  
        // Reset feedback and clicked state
        this.feedback = "Wähle die richtige Antwort!";
        this.clickedIndex = null;
      },
      handleClick(index) {
        this.clickedIndex = index;
        if (this.solutionGrid[index] === this.targetSolution) {
          this.feedback = "Richtig! Nächste Runde...";
          this.round++;
          setTimeout(this.newRound, 1000);
        } else {
          this.feedback = "Leider nicht richtig. Nochmals!";
        }
      },
      isCorrect(index) {
        return this.clickedIndex === index && this.solutionGrid[index] === this.targetSolution;
      },
      isWrong(index) {
        return this.clickedIndex === index && this.solutionGrid[index] !== this.targetSolution;
      },
    },
  };
  </script>
  
  <style scoped>
  .game-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }
  
  .rectangle {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .row {
    display: flex;
    gap: 6px;
  }
  
  .symbol {
    width: 35px;
    height: 35px;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.25rem;
  }
  
  .game-info {
    text-align: center;
  }
  
  .solution-grid {
    display: grid;
    grid-template-columns: repeat(4, 50px);
    gap: 8px;
  }
  
  .grid-item {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.1em;
  }
  
  .grid-item.correct {
    background-color: #a0d468;
  }
  
  .grid-item.wrong {
    background-color: #ed5565;
  }
  </style>
  