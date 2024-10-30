<template>
  <div class="game-container">
    <!-- Menu to select multiple rows -->
    <div class="menu">
      Mögliche Reihen:
      <label v-for="option in multipleOptions" :key="option">
        <input 
          type="checkbox" 
          :value="option" 
          v-model="selectedMultiples"
        />
        {{ option }}
      </label>
    </div>

    <!-- Game Area -->
    <h1 class="starting-number">Welche Zahlen passen nicht in die <strong>{{ startingNumber }}er</strong> Reihe?</h1>
    <div class="buttons">
      <button
        v-for="(number, index) in allNumbers"
        :key="index"
        :class="{
          'multiple-button': number % startingNumber === 0,
          'non-multiple-button': number % startingNumber !== 0,
          selected: selectedNumbers.includes(number),
        }"
        @click="handleNumberClick(number)"
      >
        {{ number }}
      </button>
    </div>
    <p v-if="roundComplete" class="message">Perfekt, alle Fehler gefunden! Nächste Runde...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleOptions: [2, 3, 4, 5, 6, 7, 8, 9, 10], // Options for multiple rows
      selectedMultiples: [2], // Default selected multiples
      startingNumber: null,
      allNumbers: [],
      selectedNumbers: [],
      roundComplete: false,
    };
  },
  mounted() {
    this.startNewRound();
  },
  methods: {
    getRandomNumber() {
      const index = Math.floor(Math.random() * this.selectedMultiples.length);
      return this.selectedMultiples[index]; // Select random multiple from chosen options
    },
    generateNumbers() {
      this.startingNumber = this.getRandomNumber(); // Set starting number from selected multiples
      const multiples = Array.from({ length: 11 }, (_, i) => i * this.startingNumber); // Multiples from 0 to 10
      const extraNumbers = [];

      // Add 2-4 non-multiples of the starting number
      while (extraNumbers.length < 3) {
        const num = Math.floor(Math.random() * (this.startingNumber * 10));
        if (!multiples.includes(num) && !extraNumbers.includes(num)) {
          extraNumbers.push(num);
        }
      }

      this.allNumbers = [...multiples, ...extraNumbers].sort((a, b) => a - b); // Combine and sort all numbers
    },
    handleNumberClick(number) {
      if (this.selectedNumbers.includes(number)) return;

      this.selectedNumbers.push(number);

      if (number % this.startingNumber !== 0) {
        const nonMultiples = this.allNumbers.filter((num) => num % this.startingNumber !== 0);
        const selectedNonMultiples = this.selectedNumbers.filter((num) => num % this.startingNumber !== 0);

        if (selectedNonMultiples.length === nonMultiples.length) {
          this.roundComplete = true;
          setTimeout(this.startNewRound, 1000); // Start new round after a brief delay
        }
      }
    },
    startNewRound() {
      if (this.selectedMultiples.length === 0) {
        alert("Please select at least one multiple option.");
        return;
      }

      this.selectedNumbers = [];
      this.roundComplete = false;
      this.generateNumbers();
    },
  },
  watch: {
    selectedMultiples() {
      this.startNewRound(); // Start a new round whenever the selected multiples change
    },
  },
};
</script>

<style scoped>
.game-container {
  text-align: center;
  padding: 20px;
}

.menu {
  margin-bottom: 20px;
}

.menu label {
  margin-right: 10px;
  font-size: 1em;
}

.starting-number {
  font-size: 3em;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

button {
  font-size: 1.5em;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.multiple-button {
  background-color: #e0e0e0;
}

.non-multiple-button {
  background-color: #e0e0e0/*f5f5f5*/;
}

button.selected {
  background-color: #ff7f7f;
}

.message {
  font-size: 1.2em;
  color: green;
  margin-top: 20px;
}
</style>
