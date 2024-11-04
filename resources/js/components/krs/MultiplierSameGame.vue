<template>
    <div class="container">
      <!-- Centered title text above everything -->
      <h2 class="title">Finde die beiden Rechnungen mit demselben Ergebnis!</h2>
  
      <div class="content">
        <!-- Left side: Multiplication problems in 2 rows of 3 -->
        <div class="multiplications">
          <div
            v-for="(problem, index) in shuffledProblems"
            :key="index"
            :style="{ 
              transform: `rotate(${problem.rotation}deg)`, 
              backgroundColor: problem.color 
            }"
            class="multiplication-box"
          >
            {{ problem.text }}
          </div>
        </div>
  
        <!-- Center: Round counter and feedback message -->
        <div class="status">
          <p>Runde: {{ round }}</p>
          <p>{{ feedbackMessage }}</p>
        </div>
  
        <!-- Right side: 3x3 grid of clickable numbers -->
        <div class="grid">
          <div
            v-for="(number, index) in gridNumbers"
            :key="index"
            class="grid-cell"
            @click="checkAnswer(number)"
          >
            {{ number }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        problems: [], // Array for multiplication problems
        gridNumbers: [], // Array for numbers in the 3x3 grid
        correctAnswer: null, // Store the correct answer
        round: 1, // Round counter
        feedbackMessage: "" // Feedback message
      };
    },
    computed: {
      shuffledProblems() {
        return this.problems.map((problem) => ({
          ...problem,
          rotation: (Math.random() - 0.5) * 20, // Rotate between -10 and +10 degrees
          color: this.getRandomColor() // Assign a random color
        }));
      }
    },
    methods: {
        generateMultiplications() {
        const allProblems = [];
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
            allProblems.push({ text: `${i} x ${j}`, result: i * j });
            }
        }

        // Zufällige Auswahl einer Rechnung, die das "doppelte" Ergebnis gibt
        const duplicateProblem = allProblems[Math.floor(Math.random() * allProblems.length)];
        const duplicateResult = duplicateProblem.result;

        // Filtere alle Rechnungen mit dem doppelten Ergebnis heraus und wähle eine weitere aus
        const problemsWithSameResult = allProblems.filter(p => p.result === duplicateResult && p.text !== duplicateProblem.text);
        const secondDuplicateProblem = problemsWithSameResult[Math.floor(Math.random() * problemsWithSameResult.length)];

        // Füge die beiden Rechnungen mit demselben Ergebnis hinzu
        const selectedProblems = [duplicateProblem, secondDuplicateProblem];

        // Filtere alle Rechnungen, die das Ergebnis `duplicateResult` haben, heraus, um eindeutige Ergebnisse zu erhalten
        const uniqueProblems = allProblems.filter(p => p.result !== duplicateResult);

        // Wähle vier weitere Rechnungen mit unterschiedlichen Ergebnissen
        while (selectedProblems.length < 6) {
            const problem = uniqueProblems[Math.floor(Math.random() * uniqueProblems.length)];
            if (!selectedProblems.some(p => p.result === problem.result)) {
            selectedProblems.push(problem);
            }
        }

        // Setze die ausgewählten Probleme und die korrekte Antwort
        this.problems = selectedProblems;
        this.correctAnswer = duplicateResult;
        },
      generateGrid() {
        const gridNumbers = new Set();
        // Generate 8 random numbers between 1 and 100
        while (gridNumbers.size < 8) {
          const randomNum = Math.floor(Math.random() * 100) + 1;
          gridNumbers.add(randomNum);
        }
        // Add the correct answer
        gridNumbers.add(this.correctAnswer);
        // Convert Set to Array and shuffle numbers
        this.gridNumbers = Array.from(gridNumbers).sort(() => Math.random() - 0.5);
      },
      getRandomColor() {
        const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff"];
        return colors[Math.floor(Math.random() * colors.length)];
      },
      checkAnswer(number) {
        if (number === this.correctAnswer) {
          this.feedbackMessage = "Richtig!";
          this.nextRound();
        } else {
          this.feedbackMessage = "Falsch, versuche es noch einmal!";
        }
      },
      nextRound() {
        this.round += 1;
        this.feedbackMessage = ""; // Clear feedback
        this.generateMultiplications();
        this.generateGrid();
      }
    },
    mounted() {
      this.generateMultiplications();
      this.generateGrid();
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  .title {
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 20px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  .multiplications {
    display: grid;
    grid-template-columns: repeat(3, 100px); /* Fixed width for 3 columns */
    gap: 20px; /* Space between "zettelchen" */
  }
  .multiplication-box {
    display: flex;
    align-items: center; /* Center vertically */
    justify-content: center; /* Center horizontally */
    border: 1px solid #000;
    padding: 10px;
    width: 100px;
    height: 60px; /* Fixed height to prevent stretching */
    text-align: center;
    color: #333;
    background-color: #f9f9f9;
    transition: transform 0.2s;
    font-weight: bold;
    border-radius: 5px;
  }
  .status {
    text-align: center;
    font-size: 1.2em;
    margin: 0 20px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .grid-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    width: 60px;
    height: 60px;
    font-size: 1.2em;
    cursor: pointer;
    background-color: #e0e0e0;
    transition: background-color 0.3s;
  }
  .grid-cell:hover {
    background-color: #d0d0d0;
  }
  </style>
  