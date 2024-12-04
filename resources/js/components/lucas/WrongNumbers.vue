<template>
  <div>
    <h2>Finde die falschen Zahlen in der Malreihe {{ currentMultiplier }}</h2>
    <p>Klicke auf die Zahlen, die falsch sind.</p>
    <div class="number-list">
      <div
        v-for="(number, index) in numbers"
        :key="index"
        class="number"
        :class="{ crossed: isCrossed(index) }"
        @click="toggleNumber(index)"
      >
        {{ number }}
      </div>
    </div>
    <button @click="checkAnswers">Überprüfen</button>
    <p v-if="resultMessage">{{ resultMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipliers: [2, 3, 4, 5], // Possible multipliers
      currentMultiplier: null, // Current multiplier
      numbers: [], // Numbers to display
      incorrectNumbers: [], // Incorrect numbers
      crossedOut: [], // Indices of crossed-out numbers
      resultMessage: "", // Feedback message
    };
  },
  methods: {
    generateNumbers() {
      this.resultMessage = "";
      this.crossedOut = [];
      this.currentMultiplier =
        this.multipliers[
          Math.floor(Math.random() * this.multipliers.length)
        ]; // Randomly select a multiplier

      const correctNumbers = Array.from({ length: 10 }, (_, i) =>
        (i + 1) * this.currentMultiplier
      );

      const incorrectCount = Math.floor(Math.random() * 4) + 2; // 2-5 incorrect numbers
      this.incorrectNumbers = [];
      while (this.incorrectNumbers.length < incorrectCount) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        // Ensure the number is not already a correct number or duplicate
        if (!correctNumbers.includes(randomNumber) && !this.incorrectNumbers.includes(randomNumber)) {
          this.incorrectNumbers.push(randomNumber);
        }
      }

      this.numbers = [...correctNumbers, ...this.incorrectNumbers].sort(
        () => Math.random() - 0.5
      ); // Shuffle the numbers
    },
    toggleNumber(index) {
      if (this.crossedOut.includes(index)) {
        this.crossedOut = this.crossedOut.filter((i) => i !== index);
      } else {
        this.crossedOut.push(index);
      }
    },
    isCrossed(index) {
      return this.crossedOut.includes(index);
    },
    checkAnswers() {
      const selectedNumbers = this.crossedOut.map((i) => this.numbers[i]);
      const missedIncorrect = this.incorrectNumbers.filter(
        (num) => !selectedNumbers.includes(num)
      );
      const incorrectSelections = selectedNumbers.filter(
        (num) => !this.incorrectNumbers.includes(num)
      );

      if (missedIncorrect.length === 0 && incorrectSelections.length === 0) {
        this.resultMessage = "Super! Du hast alle falschen Zahlen gefunden!";
        setTimeout(() => {
          this.resetGame;
        },1000)
      } else {
        this.resultMessage = `Du hast ${
          missedIncorrect.length
        } falsche Zahl(en) übersehen und ${
          incorrectSelections.length
        } korrekte Zahl(en) fälschlicherweise markiert.`;
      }
    },
    resetGame() {
      this.generateNumbers();
    },
  },
  mounted() {
    this.generateNumbers(); // Generate numbers when the component is loaded
  },
};
</script>

<style>
.number-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.number {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}
.number.crossed {
  text-decoration: line-through;
  background-color: #f8d7da;
  color: #721c24;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
}
button:hover {
  background-color: #0056b3;
}
</style>
