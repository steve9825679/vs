<template>
    <div class="game-container">
      <h2>Setze das Größer bzw. Kleiner Zeichen richtig ein!!</h2>
      <div class="d-flex">
        <div>
            Runde: {{ round }}
        </div>
        <div v-if="feedback" class="feedback" :class="{ correct: isCorrect, incorrect: !isCorrect }">
            {{ feedback }}
        </div>
      </div>
      
      <div class="numbers">
        <span>{{ num1 }}</span>
        <span class="sign">{{ selectedSign || '?' }}</span>
        <span>{{ num2 }}</span>
      </div>
  
      
  
      <div v-if="!selectedSign" class="buttons">
        <button class="sign-button" @click="checkSign('>')"> > </button>
        <button class="sign-button" @click="checkSign('<')"> < </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        num1: 0,
        num2: 0,
        selectedSign: null,
        feedback: "",
        isCorrect: false,
        round: 1,
      };
    },
    methods: {
      generateNumbers() {
        this.num1 = Math.floor(Math.random() * 101);
        this.num2 = Math.floor(Math.random() * 101);
        this.selectedSign = null;
        this.feedback = "";
        this.isCorrect = false;
      },
      checkSign(sign) {
        this.selectedSign = sign;
        this.isCorrect = (sign === ">" && this.num1 > this.num2) || (sign === "<" && this.num1 < this.num2);
        
        // Provide feedback based on correctness
        this.feedback = this.isCorrect ? "Richtig!" : "Leider nein...";
  
        // Start the next round after 2 seconds
        setTimeout(() => {
          if (this.isCorrect) this.round++;
          this.generateNumbers();
        }, 2000);
      },
    },
    mounted() {
      this.generateNumbers();
    },
  };
  </script>
  
  <style scoped>
  .game-container {
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  .numbers {
    font-size: 2rem;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    gap: 20px; /* Adjusts the spacing between elements */
  }
  .sign {
    margin: 0 20px; /* Adds more space around the ? or sign */
  }
  .buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  .sign-button {
    font-size: 2rem;
    padding: 20px 40px;
    margin: 5px;
    cursor: pointer;
    border: 2px solid grey;
    border-radius: 5px;
  }
  .feedback {
    font-size: 1.2rem;
    margin: 10px 0;
  }
  .correct {
    color: green;
  }
  .incorrect {
    color: red;
  }
  </style>
  