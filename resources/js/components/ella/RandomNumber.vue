<template>
  <div class="container">
    <div class="number-display">{{ randomNumber }}</div>
    <div class="choices">
      <div class="choice left-choice">
        <h3>Vorgänger</h3>
        <div class="choice-grid">
          <div
            class="choice-box"
            v-for="(num, index) in leftChoice"
            :key="index"
            :class="{ selected: selectedLeft === num }"
            @click="selectLeft(num)"
          >
            {{ num }}
          </div>
        </div>
      </div>
      <div class="choice right-choice">
        <h3>Nachfolger</h3>
        <div class="choice-grid">
          <div
            class="choice-box"
            v-for="(num, index) in rightChoice"
            :key="index"
            :class="{ selected: selectedRight === num }"
            @click="selectRight(num)"
          >
            {{ num }}
          </div>
        </div>
      </div>
    </div>
    <div class="feedback">{{ feedback }}</div>
    <button v-if="bothSelected" @click="resetGame">Nächste Aufgabe</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      randomNumber: this.getRandomNumber(),
      leftChoice: [],
      rightChoice: [],
      feedback: '',
      selectedLeft: null,
      selectedRight: null,
      bothSelected: false,
    };
  },
  created() {
    this.generateChoices();
  },
  methods: {
    getRandomNumber() {
      return Math.floor(Math.random() * 101);
    },
    generateChoices() {
      const predecessor = this.randomNumber - 1;
      const successor = this.randomNumber + 1;

      this.leftChoice = this.generateChoiceArray(predecessor);
      this.rightChoice = this.generateChoiceArray(successor);
    },
    generateChoiceArray(correctNumber) {
      const choices = new Set();

      choices.add(correctNumber);

      while (choices.size < 6) {
        const randomNum = Math.floor(Math.random() * 101);
        choices.add(randomNum);
      }

      return Array.from(choices).sort(() => Math.random() - 0.5);
    },
    selectLeft(choice) {
      this.selectedLeft = choice;
      this.checkBothSelected();
    },
    selectRight(choice) {
      this.selectedRight = choice;
      this.checkBothSelected();
    },
    checkBothSelected() {
      if (this.selectedLeft !== null && this.selectedRight !== null) {
        this.bothSelected = true;
        this.checkAnswers();
      }
    },
    checkAnswers() {
      if (this.selectedLeft === this.randomNumber - 1) {
        this.feedback = 'Richtig! Gut gemacht!';
      } else {
        this.feedback = 'Das war nicht ganz richtig. Versuch es noch einmal!';
      }
      // Reset selections for the next question
      this.selectedLeft = null;
      this.selectedRight = null;
    },
    resetGame() {
      this.bothSelected = false;
      this.feedback = '';
      this.randomNumber = this.getRandomNumber();
      this.generateChoices();
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  height: 100vh;
  justify-content: flex-end; /* An den unteren Bildschirmrand verschieben */
}

.number-display {
  font-size: 48px;
  margin-bottom: 20px;
}

.choices {
  display: flex;
  justify-content: space-between;
  width: 90%; /* Breite für Wahlfelder */
  margin-bottom: 20px; /* Abstand nach unten */
}

.choice {
  width: 45%; /* Breite für die Wahlfelder */
  border: 3px solid #000000;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.choice-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 Spalten */
  gap: 10px; /* Abstand zwischen den Kästen */
}

.choice-box {
  height: 80px; /* Höhe der Boxen */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #000000;
  border-radius: 8px;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.choice-box:hover {
  background-color: #d970a6;
}

.selected {
  background-color: #d970a6; /* Hintergrundfarbe für die gewählte Zahl */
}

.feedback {
  margin-top: 20px;
  font-size: 20px;
  color: #333;
}
</style>

