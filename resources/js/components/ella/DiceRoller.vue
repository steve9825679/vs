<template>
  <div class="dice-game">
    <!-- Überschrift in der Mitte -->
    <h1 class="title">Wähle die Summe der Augenzahlen!</h1>
    
    <div class="content">
      <!-- Würfel auf der linken Seite -->
      <div class="dice-container">
        <canvas ref="diceCanvas1" width="200" height="200"></canvas>
        <canvas ref="diceCanvas2" width="200" height="200"></canvas>
      </div>

      <!-- Wahlfelder auf der rechten Seite -->
      <div class="right">
        <div class="choices">
          <div
            v-for="(option, index) in answerOptions"
            :key="index"
            @click="selectAnswer(option)"
            :class="['choice', { correct: feedback === 'richtig' && selectedAnswer === option, wrong: feedback === 'falsch' && selectedAnswer === option }]"
          >
            {{ option }}
          </div>
        </div>
        <p v-if="feedback" :class="feedback">{{ feedbackMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dice1: 1, // Augenzahl des ersten Würfels
      dice2: 1, // Augenzahl des zweiten Würfels
      answerOptions: [], // Antwortmöglichkeiten
      correctAnswer: null, // Richtige Antwort (Summe der Augenzahlen)
      selectedAnswer: null, // Gewählte Antwort
      feedback: null, // "richtig" oder "falsch"
    };
  },
  computed: {
    feedbackMessage() {
      if (this.feedback === 'richtig') return 'Korrekt! 🎉';
      if (this.feedback === 'falsch') return 'Leider Falsch, versuche es erneut! 😞';
      return '';
    },
  },
  methods: {
    rollDice() {
      this.dice1 = Math.floor(Math.random() * 6) + 1;
      this.dice2 = Math.floor(Math.random() * 6) + 1;
      this.correctAnswer = this.dice1 + this.dice2;

      // Zufällige Antwortmöglichkeiten generieren
      this.answerOptions = this.generateAnswerOptions(this.correctAnswer);

      this.feedback = null;
      this.selectedAnswer = null;
      this.drawDice(this.$refs.diceCanvas1, this.dice1);
      this.drawDice(this.$refs.diceCanvas2, this.dice2);
    },
    generateAnswerOptions(correctAnswer) {
      const options = new Set();
      options.add(correctAnswer);

      while (options.size < 5) {
        const randomOption = Math.floor(Math.random() * 12) + 2; // Summe zweier Würfel: 2 bis 12
        options.add(randomOption);
      }

      return Array.from(options).sort((a, b) => a - b);
    },
    selectAnswer(option) {
      this.selectedAnswer = option;
      this.feedback = option === this.correctAnswer ? 'richtig' : 'falsch';

      // Nach 2 Sekunden zur nächsten Aufgabe wechseln
      setTimeout(() => {
        this.rollDice();
      }, 500);
    },
    drawDice(canvas, number) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 200, 200);

      // Basisrechteck
      ctx.fillStyle = '#fff';
      ctx.fillRect(20, 20, 160, 160);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 5;
      ctx.strokeRect(20, 20, 160, 160);

      // Punkte zeichnen
      const positions = [
        [100, 100], // 1
        [60, 60, 140, 140], // 2
        [60, 60, 100, 100, 140, 140], // 3
        [60, 60, 60, 140, 140, 60, 140, 140], // 4
        [60, 60, 60, 140, 140, 60, 140, 140, 100, 100], // 5
        [60, 60, 60, 100, 60, 140, 140, 60, 140, 100, 140, 140], // 6
      ];

      ctx.fillStyle = '#000';
      const dots = positions[number - 1];
      for (let i = 0; i < dots.length; i += 2) {
        ctx.beginPath();
        ctx.arc(dots[i], dots[i + 1], 10, 0, 2 * Math.PI);
        ctx.fill();
      }
    },
  },
  mounted() {
    this.rollDice(); // Start mit einer initialen Würfelrunde
  },
};
</script>

<style scoped>
.dice-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  width: 100%;
}
.dice-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin-left: 20px;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  margin-right: 20px;
}
.choices {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.choice {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #000;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
}
.choice:hover {
  background-color: #f0f0f0;
}
.correct {
  background-color: #4caf50;
  color: white;
}
.wrong {
  background-color: #f44336;
  color: white;
}
p.richtig {
  color: #4caf50;
}
p.falsch {
  color: #f44336;
}
</style>
