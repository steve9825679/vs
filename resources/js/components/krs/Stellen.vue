<template>
    <div class="game-container">
      <!-- Zufallszahl auf der linken Seite -->
      <div class="random-number">{{ randomNumber }}</div>
  
      <!-- Runde und Feedback -->
      <div class="info">
        <div>Runde: {{ round }}</div>
        <div v-if="feedback" :class="{ correct: isCorrect, incorrect: !isCorrect }">
          {{ feedback }}
        </div>
      </div>
  
      <!-- Zuordnungsfelder auf der rechten Seite -->
      <div class="input-fields">
        <input
          type="number"
          placeholder="Hunderter"
          v-model.number="userInput.hundreds"
          :disabled="disableInputs"
        />
        <input
          type="number"
          placeholder="Zehner"
          v-model.number="userInput.tens"
          :disabled="disableInputs"
        />
        <input
          type="number"
          placeholder="Einer"
          v-model.number="userInput.ones"
          :disabled="disableInputs"
        />
        <button @click="checkAnswer" :disabled="disableInputs">Überprüfen</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        randomNumber: this.generateRandomNumber(),
        userInput: { hundreds: null, tens: null, ones: null },
        round: 1,
        feedback: '',
        isCorrect: false,
        disableInputs: false,
      };
    },
    methods: {
      // Generiert eine zufällige Zahl zwischen 1 und 999
      generateRandomNumber() {
        return Math.floor(Math.random() * 999) + 1;
      },
      // Methode zur Überprüfung der Antwort des Benutzers
      checkAnswer() {
        const hundreds = Math.floor(this.randomNumber / 100);
        const tens = Math.floor((this.randomNumber % 100) / 10);
        const ones = this.randomNumber % 10;
  
        if (
          this.userInput.hundreds === hundreds &&
          this.userInput.tens === tens &&
          this.userInput.ones === ones
        ) {
          this.feedback = 'Richtig! Nächste Runde...';
          this.isCorrect = true;
          this.disableInputs = true;
  
          // Startet die nächste Runde nach einer kurzen Verzögerung
          setTimeout(() => {
            this.nextRound();
          }, 2000);
        } else {
          this.feedback = 'Falsch, versuche es erneut!';
          this.isCorrect = false;
        }
      },
      // Startet die nächste Runde
      nextRound() {
        this.round++;
        this.randomNumber = this.generateRandomNumber();
        this.userInput = { hundreds: null, tens: null, ones: null };
        this.feedback = '';
        this.isCorrect = false;
        this.disableInputs = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .game-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Arial, sans-serif;
  }
  .random-number {
    font-size: 2em;
    font-weight: bold;
  }
  .info {
    text-align: center;
  }
  .info div {
    margin: 5px 0;
  }
  .input-fields {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .input-fields input {
    margin: 5px 0;
    padding: 5px;
    width: 100px;
    text-align: center;
  }
  button {
    padding: 5px 10px;
    margin-top: 10px;
  }
  .correct {
    color: green;
  }
  .incorrect {
    color: red;
  }
  </style>
  