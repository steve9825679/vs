<template>
    <div>
      <h1>Multiplikationsreihe Spiel</h1>
      <p>Runde: {{ roundCounter }}</p>
      <button v-if="!numbers.length" @click="generateNumbers">Starte das Spiel</button>
  
      <div v-if="numbers.length">
        <h2>Wähle die Zahlen, die nicht zur {{ selectedSeries }}er Reihe gehören:</h2>
        <div class="numbers">
          <button
            v-for="(number, index) in numbers"
            :key="index"
            :class="{ selected: selectedNumbers.includes(number) }"
            @click="selectNumber(index)"
          >
            {{ number }}
          </button>
        </div>
      </div>
  
      <div v-if="selectedNumbers.length">
        <button @click="checkSelection">Überprüfen</button>
      </div>
  
      <div v-if="resultMessage">
        <h3>{{ resultMessage }}</h3>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        seriesOptions: [2, 5, 10], // Verfügbare Multiplikationsreihen
        selectedSeries: null, // Zufällig ausgewählte Reihe
        numbers: [], // Generierte Zahlen
        selectedNumbers: [], // Vom Benutzer ausgewählte Zahlen
        resultMessage: null, // Nachricht für das Ergebnis
        roundCounter: 0, // Rundenzähler
      };
    },
    methods: {
      // Funktion zur Generierung zufälliger Zahlen und Auswahl der Reihe
      generateNumbers() {
        this.selectedNumbers = []; // Zurücksetzen der Auswahl
        this.resultMessage = null; // Zurücksetzen der Nachricht
        this.selectedSeries =
          this.seriesOptions[
            Math.floor(Math.random() * this.seriesOptions.length)
          ]; // Zufällige Reihe auswählen
  
        const inSeriesNumbers = Array.from({ length: 5 }, () =>
          this.selectedSeries * (Math.floor(Math.random() * 10) + 1)
        ); // Zahlen, die zur Reihe gehören
  
        const outOfSeriesNumbers = Array.from({ length: 5 }, () => {
          let num;
          do {
            num = Math.floor(Math.random() * 100) + 1;
          } while (num % this.selectedSeries === 0); // Zahlen generieren, die nicht zur Reihe gehören
          return num;
        });
  
        this.numbers = [...inSeriesNumbers, ...outOfSeriesNumbers].sort(
          () => Math.random() - 0.5
        ); // Mischen der Zahlen
  
        // Erhöhe den Rundenzähler, wenn das Spiel gestartet oder neu gestartet wird
        this.roundCounter++;
      },
      // Prüfen, ob eine Zahl in der Multiplikationsreihe ist
      isInSeries(number) {
        return number % this.selectedSeries === 0;
      },
      // Auswahl der Nummer hinzufügen oder entfernen
      selectNumber(index) {
        const number = this.numbers[index];
        const idx = this.selectedNumbers.indexOf(number);
        if (idx > -1) {
          this.selectedNumbers.splice(idx, 1); // Entfernen der Nummer
        } else {
          this.selectedNumbers.push(number); // Hinzufügen der Nummer
        }
      },
      // Überprüfung der Auswahl
            checkSelection() {
        // Alle Zahlen, die NICHT zur Reihe gehören
        const incorrectNumbers = this.numbers.filter(
            (num) => !this.isInSeries(num)
        );

        // Prüfen, ob die Auswahl genau mit den falschen Zahlen übereinstimmt
        const isCorrect =
            this.selectedNumbers.length === incorrectNumbers.length &&
            incorrectNumbers.every((num) => this.selectedNumbers.includes(num));

        if (isCorrect) {
            this.resultMessage = "Richtig! Das Spiel wird neu gestartet...";
            setTimeout(() => {
            this.generateNumbers(); // Neues Spiel nach kurzer Verzögerung starten
            }, 2000); // 2 Sekunden Verzögerung für die Rückmeldung
        } else {
            this.resultMessage = "Falsch! Versuche es erneut.";
        }
        }

    },
  };
  </script>
  
  <style>
  .numbers {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  button {
    padding: 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button.selected {
    background-color: #d4edda;
    color: #155724;
  }
  button:hover {
    background-color: #f0f0f0;
  }
  </style>
  