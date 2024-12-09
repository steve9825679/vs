<template>
  <div class="pyramide-container">
    <div class="pyramide">
      <h2>Zahlenpyramide (10 Zeilen)</h2>

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

      // Generiere zufällige Zahlen für die Basis der Pyramide (10 Kästchen)
      const randomBase = Array.from({ length: 10 }, () => Math.floor(Math.random() * 20) + 1);

      // Erstelle die Struktur der Pyramide mit Platzhaltern
      this.pyramid = [
        [{ value: '', readonly: false }],
        [{ value: '', readonly: false }, { value: '', readonly: false }],
        [{ value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }],
        [{ value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }],
        [{ value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }],
        [{ value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }],
        [{ value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }],
        [{ value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }],
        [{ value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }, { value: '', readonly: false }],
        randomBase.map(value => ({ value, readonly: true })),
      ];

      // Berechnung der korrekten Summen
      const correctOptions = this.calculateCorrectValues(randomBase);

      // Hinzufügen von falschen Optionen für mehr Herausforderung
      const wrongOptions = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);

      // Mischen und Optionen ohne Duplikate
      this.options = [...correctOptions, ...wrongOptions]
        .filter((value, index, self) => self.indexOf(value) === index) // Duplikate entfernen
        .sort(() => Math.random() - 0.5);
    },
    calculateCorrectValues(base) {
      let rows = [];
      let currentRow = base;

      while (currentRow.length > 1) {
        const nextRow = currentRow.map((_, i) => currentRow[i] + currentRow[i + 1]).slice(0, -1);
        rows.unshift(nextRow); // Fügt die nächste Zeile oben hinzu
        currentRow = nextRow;
      }

      return rows.flat();
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

      for (let i = 0; i < this.pyramid.length - 1; i++) {
        for (let j = 0; j < this.pyramid[i].length; j++) {
          const expectedValue = this.pyramid[i + 1][j].value + this.pyramid[i + 1][j + 1].value;
          this.pyramid[i][j].error = (this.pyramid[i][j].value !== expectedValue);
          correct = correct && !this.pyramid[i][j].error;
        }
      }

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
