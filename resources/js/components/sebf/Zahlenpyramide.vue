<template>
  <div class="pyramide-container">
    <div class="pyramide">
      <h2>Zahlenpyramide</h2>

      <div class="grid">
        <div 
          v-for="(row, rowIndex) in pyramid" 
          :key="'row-' + rowIndex" 
          class="row"
        >
          <div 
            v-for="(cell, colIndex) in row" 
            :key="'cell-' + colIndex"
            class="cell"
            :class="{ 'readonly': cell.readonly, 'error': cell.error }"
            @drop="handleDrop($event, rowIndex, colIndex)"
            @dragover.prevent
          >
            <span v-if="cell.readonly">{{ cell.value }}</span>
            <input 
              v-else 
              type="text" 
              inputmode="numeric" 
              readonly
              :value="cell.value"
              :class="{ 'error': cell.error }"
            />
          </div>
        </div>
      </div>

      <div class="feedback" v-if="feedback">
        <p :class="{ 'success': isCorrect, 'error': !isCorrect }">{{ feedback }}</p>
      </div>

      <button @click="checkPyramid">Prüfen</button>
      <button @click="resetPyramid" :disabled="!isCorrect">Neue Pyramide erstellen</button>
    </div>

    <div class="options">
      <h3>Antwortmöglichkeiten (Drag & Drop):</h3>
      <div class="options-grid">
        <div 
          v-for="option in options" 
          :key="option"
          class="option"
          draggable="true"
          @dragstart="handleDragStart(option)"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pyramid: [],
      feedback: '',
      isCorrect: false,
      options: [],
      draggedValue: null,
    };
  },
  created() {
    this.resetPyramid();
  },
  methods: {
    resetPyramid() {
      this.feedback = '';
      this.isCorrect = false;

      // Generiere zufällige Zahlen für die Basis der Pyramide
      const randomBase = Array.from({ length: 4 }, () => Math.floor(Math.random() * 20) + 1);

      // Erstelle die Struktur der Pyramide mit Platzhaltern
      this.pyramid = [
        [{ value: '', readonly: false }],
        [{ value: '', readonly: false }, { value: '', readonly: false }],
        [{ value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }],
        randomBase.map(value => ({ value, readonly: true })),
      ];

      // Berechnung der korrekten Summen
      const correctOptions = this.calculateCorrectValues(randomBase);

      // Hinzufügen von falschen Optionen für mehr Herausforderung
      const wrongOptions = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 5);

      // Mischen und Optionen ohne Duplikate
      this.options = [...correctOptions, ...wrongOptions]
        .filter((value, index, self) => self.indexOf(value) === index) // Duplikate entfernen
        .sort(() => Math.random() - 0.5);
    },
    calculateCorrectValues(base) {
      // Berechne die dritte Reihe
      const row3 = [
        base[0] + base[1],
        base[1] + base[2],
        base[2] + base[3]
      ];

      // Berechne die zweite Reihe
      const row2 = [
        row3[0] + row3[1],
        row3[1] + row3[2]
      ];

      // Berechne die oberste Reihe
      const row1 = [
        row2[0] + row2[1]
      ];

      // Rückgabe aller korrekten Antworten als Array
      return [...row1, ...row2, ...row3];
    },
    handleDragStart(value) {
      this.draggedValue = value;
    },
    handleDrop(event, rowIndex, colIndex) {
      if (!this.pyramid[rowIndex][colIndex].readonly) {
        this.pyramid[rowIndex][colIndex].value = this.draggedValue;
      }
      this.draggedValue = null;
    },
    checkPyramid() {
      let correct = true;

      // Überprüfen der Summen für jede Zeile
      this.pyramid[2][0].error = (this.pyramid[3][0].value + this.pyramid[3][1].value !== this.pyramid[2][0].value);
      this.pyramid[2][1].error = (this.pyramid[3][1].value + this.pyramid[3][2].value !== this.pyramid[2][1].value);
      this.pyramid[2][2].error = (this.pyramid[3][2].value + this.pyramid[3][3].value !== this.pyramid[2][2].value);
      correct = correct && !this.pyramid[2][0].error && !this.pyramid[2][1].error && !this.pyramid[2][2].error;

      this.pyramid[1][0].error = (this.pyramid[2][0].value + this.pyramid[2][1].value !== this.pyramid[1][0].value);
      this.pyramid[1][1].error = (this.pyramid[2][1].value + this.pyramid[2][2].value !== this.pyramid[1][1].value);
      correct = correct && !this.pyramid[1][0].error && !this.pyramid[1][1].error;

      this.pyramid[0][0].error = (this.pyramid[1][0].value + this.pyramid[1][1].value !== this.pyramid[0][0].value);
      correct = correct && !this.pyramid[0][0].error;

      if (correct) {
        this.feedback = 'Gratulation! Alle Werte sind korrekt!';
        this.isCorrect = true;
      } else {
        this.feedback = 'Es gibt Fehler in der Pyramide. Korrigiere sie bitte.';
        this.isCorrect = false;
      }
    }
  }
};
</script>


<style scoped>
.pyramide-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.pyramide {
  text-align: center;
  flex: 1;
}

.grid {
  display: grid;
  gap: 10px;
  justify-content: center;
}

.row {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.cell {
  width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.cell.error {
  border-color: red;
}

input {
  text-align: center;
  font-size: 18px;
  border: none;
  width: 100%;
  height: 100%;
  background: none;
}

input[type="text"]:read-only {
  pointer-events: none;
}

.options {
  margin-left: 20px;
  width: 300px;
  text-align: center;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.option {
  width: 100%;
  height: 40px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: grab;
}

.feedback {
  margin-top: 20px;
}

.feedback p {
  font-size: 18px;
  font-weight: bold;
}

.feedback .success {
  color: green;
}

.feedback .error {
  color: red;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
