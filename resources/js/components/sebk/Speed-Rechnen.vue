<script setup>
import { ref, computed } from 'vue';

let question = ref({ num1: 0, num2: 0, operator: '' });
let answerOptions = ref([]);
let correctAnswers = ref(0);
let wrongAnswers = ref(0);
let highScore = ref(0);
let timer = ref(60);
let gameActive = ref(false);
let gameOver = ref(false);
let highScoreBeaten = ref(false);

// Funktion zum Starten des Spiels
const startGame = () => {
    resetGame();
    gameActive.value = true;
    generateQuestion();
    startTimer();
};

// Timer starten
const startTimer = () => {
    const countdown = setInterval(() => {
        if (timer.value > 0 && gameActive.value) {
            timer.value--;
        } else {
            clearInterval(countdown);
            gameOver.value = true;
            gameActive.value = false;

            // Highscore aktualisieren
            const currentScore = finalScore.value;
            if (currentScore > highScore.value) {
                highScore.value = currentScore;
                highScoreBeaten.value = true;
            }
        }
    }, 1000);
};

// Spiel zurücksetzen
const resetGame = () => {
    timer.value = 60;
    correctAnswers.value = 0;
    wrongAnswers.value = 0;
    gameOver.value = false;
    highScoreBeaten.value = false;
};

// Neue Aufgabe generieren
const generateQuestion = () => {
    const num1 = randomIntFromInterval(10, 90);
    const num2 = randomIntFromInterval(1, 10);
    const operator = Math.random() > 0.5 ? '+' : '-';
    const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

    question.value = { num1, num2, operator };
    answerOptions.value = generateAnswerOptions(correctAnswer);
};

// Zufällige Antwortoptionen generieren
const generateAnswerOptions = (correctAnswer) => {
    const options = new Set([correctAnswer]);
    while (options.size < 9) {
        options.add(randomIntFromInterval(correctAnswer - 10, correctAnswer + 10));
    }
    return Array.from(options).sort((a, b) => a - b);
};

// Antwort prüfen
const checkAnswer = (chosenAnswer) => {
    if (!gameActive.value) return; // Nur erlauben, wenn das Spiel aktiv ist

    const correctAnswer = question.value.operator === '+' ? question.value.num1 + question.value.num2 : question.value.num1 - question.value.num2;

    if (chosenAnswer === correctAnswer) {
        correctAnswers.value++;
        generateQuestion();
    } else {
        wrongAnswers.value++;
    }
};

// Hilfsfunktionen für Zufallszahlen
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Endergebnis berechnen
const finalScore = computed(() => Math.max(correctAnswers.value - wrongAnswers.value, 0)); // Score kann nicht negativ werden

</script>

<template>
    <div>
        <!-- Start Button -->
        <div v-if="!gameActive && !gameOver" class="text-center my-4">
            <button @click="startGame" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Start</button>
        </div>

        <!-- Timer, Counter und Highscore -->
        <div v-if="gameActive || gameOver" class="flex justify-between items-center mb-4">
            <!-- Linke Spalte: Rechenaufgabe -->
            <div class="w-1/3 border-2 border-gray-300 rounded-lg p-4 text-3xl text-center">
                <p v-if="gameActive">{{ question.num1 }} {{ question.operator }} {{ question.num2 }} = ?</p>
            </div>

            <!-- Mittlere Spalte: Timer, Counter und Highscore -->
            <div class="w-1/3 flex flex-col items-center">
                <!-- Runde Uhr -->
                <div class="timer-circle">
                    <svg class="timer-svg" viewBox="0 0 36 36">
                        <path class="timer-bg" d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"></path>
                        <path
                            class="timer-progress"
                            :style="{ strokeDasharray: `${(timer / 60) * 100}, 100` }"
                            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                        ></path>
                    </svg>
                    <div class="timer-text">{{ timer }}s</div>
                </div>

                <!-- Counter -->
                <div class="text-center mt-4">
                    <p class="text-xl font-bold" style="color:#4caf50">Richtig: {{ correctAnswers }}</p>
                    <p class="text-xl font-bold" style="color:red">Falsch: {{ wrongAnswers }}</p>
                </div>
            </div>

            <!-- Rechte Spalte: Antwortmöglichkeiten -->
            <div class="w-1/3 border-2 border-gray-300 rounded-lg p-4 grid grid-cols-3 gap-4 text-center">
                <button 
                    v-for="answer in answerOptions" 
                    :key="answer" 
                    @click="checkAnswer(answer)"
                    class="p-4 bg-green-500 hover:bg-green-600 text-white rounded-md text-2xl transition"
                >{{ answer }}</button>
            </div>
        </div>

        <!-- Anzeige für Ablauf der Zeit -->
        <div v-if="gameOver" class="text-center mt-8">
            <h2 class="text-2xl font-bold mb-4">Zeit ist aus!</h2>
            <p class="text-xl font-bold mt-2">Score: {{ finalScore }}</p>
            <p class="text-xl font-bold mt-2">Highscore: {{ highScore }}</p>
            <p v-if="highScoreBeaten" class="text-green-500 font-bold text-lg mt-4">
                🎉 Du hast den Highscore geknackt! 🎉
            </p>
            <button @click="startGame" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Nochmal spielen</button>
        </div>
    </div>
</template>

<style scoped>
/* Stile für das Timer-Design */
.timer-circle {
    position: relative;
    width: 120px;
    height: 120px;
    margin: auto;
}

.timer-svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
}

.timer-bg {
    fill: none;
    stroke: #e6e6e6;
    stroke-width: 2.8;
}

.timer-progress {
    fill: none;
    stroke: #4caf50;
    stroke-width: 2.8;
    stroke-linecap: round;
    transition: stroke-dasharray 1s linear;
}

.timer-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    color: #333;
}
</style>
