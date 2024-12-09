<template>
    <div class="container">
      <h3>Welche Figur ist das?</h3>
      <div class="svg-container" v-html="randomShape"></div>
      <div class="choices">
        <button v-for="(shape, index) in shapes" :key="index" @click="checkAnswer(shape)">
          {{ shape }}
        </button>
      </div>
      <p v-if="answered !== null">
        <span v-if="answered">Richtig!</span>
        <span v-else>Falsch, versuche es nochmal.</span>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        shapes: ["Quader", "Kugel", "Zylinder", "dreiseitige Pyramide", "vierseitige Pyramide", "Kegel", "Kubus"],
        correctShape: '',
        answered: null,
        randomShape: ''
      };
    },
    methods: {
      generateRandomShape() {
        const randomIndex = Math.floor(Math.random() * this.shapes.length);
        this.correctShape = this.shapes[randomIndex];
        this.randomShape = this.drawShape(this.correctShape);
      },
      drawShape(shape) {
        switch (shape) {
          case "Quader":
            return `<svg width="300" height="300" viewBox="0 0 300 300">
                      <!-- Quader als Gitter -->
                      <line x1="50" y1="50" x2="250" y2="50" stroke="black" stroke-width="3"/>
                      <line x1="50" y1="50" x2="50" y2="200" stroke="black" stroke-width="3"/>
                      <line x1="250" y1="50" x2="250" y2="200" stroke="black" stroke-width="3"/>
                      <line x1="50" y1="200" x2="250" y2="200" stroke="black" stroke-width="3"/>
                      <line x1="50" y1="50" x2="150" y2="20" stroke="black" stroke-width="3"/>
                      <line x1="250" y1="50" x2="350" y2="20" stroke="black" stroke-width="3"/>
                      <line x1="250" y1="200" x2="350" y2="170" stroke="black" stroke-width="3"/>
                      <line x1="50" y1="200" x2="150" y2="170" stroke="black" stroke-width="3"/>
                      <line x1="150" y1="20" x2="150" y2="170" stroke="black" stroke-width="3"/>
                      <line x1="350" y1="20" x2="350" y2="170" stroke="black" stroke-width="3"/>
                      <line x1="150" y1="170" x2="350" y2="170" stroke="black" stroke-width="3"/>
                    </svg>`;
          case "Kugel":
            return `<svg width="300" height="300" viewBox="0 0 300 300">
                      <!-- Kugel als Gitter -->
                      <circle cx="150" cy="150" r="120" fill="none" stroke="black" stroke-width="2"/>
                      <line x1="150" y1="30" x2="150" y2="270" stroke="black" stroke-width="2"/>
                      <line x1="30" y1="150" x2="270" y2="150" stroke="black" stroke-width="2"/>
                      <line x1="150" y1="150" x2="150" y2="30" stroke="black" stroke-width="2"/>
                      <line x1="150" y1="150" x2="30" y2="150" stroke="black" stroke-width="2"/>
                    </svg>`;
          case "Zylinder":
            return `<svg width="300" height="300" viewBox="0 0 300 300">
                      <!-- Zylinder als Gitter -->
                      <ellipse cx="150" cy="50" rx="120" ry="40" fill="none" stroke="black" stroke-width="3"/>
                      <rect x="30" y="50" width="240" height="200" fill="none" stroke="black" stroke-width="3"/>
                      <ellipse cx="150" cy="250" rx="120" ry="40" fill="none" stroke="black" stroke-width="3"/>
                      <line x1="30" y1="50" x2="30" y2="250" stroke="black" stroke-width="3"/>
                      <line x1="30" y1="250" x2="270" y2="250" stroke="black" stroke-width="3"/>
                      <line x1="270" y1="250" x2="270" y2="50" stroke="black" stroke-width="3"/>
                    </svg>`;
          case "dreiseitige Pyramide":
            return `<svg width="300" height="300" viewBox="0 0 300 300">
                      <!-- Dreiseitige Pyramide als Gitter -->
                      <polygon points="100,50 50,150 150,150" fill="none" stroke="black" stroke-width="3"/>
                      <polygon points="50,150 0,250 100,250" fill="none" stroke="black" stroke-width="3"/>
                      <polygon points="150,150 200,250 100,250" fill="none" stroke="black" stroke-width="3"/>
                      <line x1="100" y1="50" x2="0" y2="250" stroke="black" stroke-width="3"/>
                      <line x1="50" y1="150" x2="200" y2="250" stroke="black" stroke-width="3"/>
                    </svg>`;
          case "vierseitige Pyramide":
            return `<svg width="300" height="300" viewBox="0 0 300 300">
  <!-- Basis der vierseitigen Pyramide -->
  <line x1="50" y1="200" x2="250" y2="200" stroke="black" stroke-width="3"/>
  <line x1="50" y1="200" x2="50" y2="100" stroke="black" stroke-width="3"/>
  <line x1="250" y1="200" x2="250" y2="100" stroke="black" stroke-width="3"/>
  <line x1="50" y1="100" x2="250" y2="100" stroke="black" stroke-width="3"/>
  
  <!-- Kanten von der Spitze zu den Ecken der Basis -->
  <line x1="150" y1="50" x2="50" y2="200" stroke="black" stroke-width="3"/>
  <line x1="150" y1="50" x2="250" y2="200" stroke="black" stroke-width="3"/>
  <line x1="150" y1="50" x2="50" y2="100" stroke="black" stroke-width="3"/>
  <line x1="150" y1="50" x2="250" y2="100" stroke="black" stroke-width="3"/>
  
  <!-- Verbindungs-Linien der Basis -->
  <line x1="50" y1="200" x2="250" y2="200" stroke="black" stroke-width="3"/>
  <line x1="50" y1="200" x2="50" y2="100" stroke="black" stroke-width="3"/>
  <line x1="250" y1="200" x2="250" y2="100" stroke="black" stroke-width="3"/>
  <line x1="50" y1="100" x2="250" y2="100" stroke="black" stroke-width="3"/>
</svg>`;
          case "Kegel":
            return `<svg width="300" height="300" viewBox="0 0 300 300">
                      <!-- Kegel als Gitter -->
                      <polygon points="150,50 50,200 250,200" fill="none" stroke="black" stroke-width="3"/>
                      <ellipse cx="150" cy="200" rx="120" ry="40" fill="none" stroke="black" stroke-width="3"/>
                      <line x1="150" y1="50" x2="150" y2="200" stroke="black" stroke-width="3"/>
                      <line x1="50" y1="200" x2="150" y2="50" stroke="black" stroke-width="3"/>
                      <line x1="250" y1="200" x2="150" y2="50" stroke="black" stroke-width="3"/>
                    </svg>`;
          case "Kubus":
            return `<svg width="300" height="300" viewBox="0 0 300 300">
                      <!-- Kubus als Gitter -->
                      <line x1="50" y1="50" x2="150" y2="20" stroke="black" stroke-width="3"/>
                      <line x1="250" y1="50" x2="350" y2="20" stroke="black" stroke-width="3"/>
                      <line x1="250" y1="200" x2="350" y2="170" stroke="black" stroke-width="3"/>
                      <line x1="50" y1="200" x2="150" y2="170" stroke="black" stroke-width="3"/>
                      <line x1="150" y1="20" x2="150" y2="170" stroke="black" stroke-width="3"/>
                      <line x1="350" y1="20" x2="350" y2="170" stroke="black" stroke-width="3"/>
                      <line x1="150" y1="170" x2="350" y2="170" stroke="black" stroke-width="3"/>
                      <line x1="50" y1="50" x2="50" y2="200" stroke="black" stroke-width="3"/>
                      <line x1="250" y1="50" x2="250" y2="200" stroke="black" stroke-width="3"/>
                      <line x1="50" y1="200" x2="250" y2="200" stroke="black" stroke-width="3"/>
                    </svg>`;
          default:
            return '';
        }
      },
      checkAnswer(selectedShape) {
        this.answered = selectedShape === this.correctShape;
        if (this.answered) {
          setTimeout(() => {
            this.generateRandomShape(); // Nächste zufällige Figur nach der richtigen Auswahl
            this.answered = null; // Rücksetzen der Antwortanzeige
          }, 1000);
        }
      }
    },
    mounted() {
      this.generateRandomShape();
    }
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
  }
  
  .svg-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }
  
  .choices {
    margin-top: 20px;
  }
  
  button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
  }
  
  p {
    font-size: 18px;
    font-weight: bold;
  }
  </style>
  