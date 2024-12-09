<template>
    <div id="app">
      <h1>Additons Raster</h1>
      <div class="game-container">
        <!-- 3x3 Feld mit Zahlen -->
        <div class="grid">
          <div
            v-for="(cell, index) in grid.flat()" 
            :key="'cell-' + index" 
            class="cell">
            {{ cell }}
          </div>
        </div>

  
        <!-- Eingabefelder für die Zeilensummen -->
        <div class="row-sums">
          <div v-for="(sum, index) in userRowSums" :key="'row-sum-' + index">
            <input type="number" v-model="userRowSums[index]" />
          </div>
        </div>
      </div>
  
      <!-- Eingabefelder für die Spaltensummen -->
      <div class="col-sums">
        <div v-for="(sum, index) in userColSums" :key="'col-sum-' + index">
          <input type="number" v-model="userColSums[index]" />
        </div>
      </div>
  
      <button @click="checkAnswers">Überprüfen</button>
      <p>{{ message }}</p>
    
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        grid: [],
        correctRowSums: [],
        correctColSums: [],
        userRowSums: Array(3).fill(""), // Eingaben standardmäßig leer
        userColSums: Array(3).fill(""), // Eingaben standardmäßig leer
        message: "",
      };
    },
    methods: {
      // Generiert ein neues Spielfeld und berechnet die korrekten Summen
      generateGrid() {
        this.grid = Array.from({ length: 3 }, () =>
          Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1)
        );
  
        // Korrekte Zeilensummen berechnen
        this.correctRowSums = this.grid.map((row) =>
          row.reduce((sum, num) => sum + num, 0)
        );
  
        // Korrekte Spaltensummen berechnen
        this.correctColSums = [0, 1, 2].map((colIndex) =>
          this.grid.reduce((sum, row) => sum + row[colIndex], 0)
        );
  
        // Eingabefelder zurücksetzen
        this.userRowSums = Array(3).fill("");
        this.userColSums = Array(3).fill("");
        this.message = "";
      },
  
      // Überprüft die Eingaben des Nutzers
      checkAnswers() {
        // Überprüfung der Zeilensummen
        const colsCorrect = this.userRowSums.every((sum, index) => {
           console.log(Number(sum), this.correctRowSums[index]);
          // Summe explizit in Zahl umwandeln
          return Number(sum) === this.correctRowSums[index];
        });

        // Überprüfung der Spaltensummen
        const rowsCorrect = this.userColSums.every((sum, index) => {
          console.log(Number(sum), this.correctColSums[index]);
          // Summe explizit in Zahl umwandeln
          return Number(sum) === this.correctColSums[index];
        });

        if (rowsCorrect && colsCorrect) {
          this.message = "Suuuuuuuuper 👍";
          setTimeout(() => {
            this.generateGrid(); // Regeneriert das Spielfeld nach der Verzögerung
            this.message = ""; // Entfernt die Nachricht
          }, 3000);
        } else {
          this.message = "Oiiiiiiii 😒";
          setTimeout(() => {
            this.message = ""; // Entfernt die Nachricht
          }, 3000);
        }
      }

    },
    mounted() {
      // Spielfeld beim Start generieren
      this.generateGrid();
    },
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
  }
  
  .game-container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 60px);
    gap: 5px;
  }
  
  .cell {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    font-size: 18px;
  }
  
  .row-sums {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .col-sums {
    display: grid;
    grid-template-columns: repeat(3, 60px);
    gap: 5px;
    justify-content: center;
    margin-left: -70px;
    margin-top: 10px;
  }
  
  input {
    width: 60px;
    height: 60px;
    text-align: center;
    font-size: 18px;
  }
  
  button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
  }
  
  p {
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
  }
  
  </style>
  