<script setup>
import { ref } from 'vue';

let current_divisor = ref(2);
let ok = ref(false);
let nok = ref(false);
let counter = ref(0);
let dividend = ref(0);
let divisor = ref(0);
let answerOptions = ref([]);

// Hilfsfunktionen
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const shuffle = (array) => {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
};

// Neue Aufgabe generieren
const generateNewTask = () => {
    dividend.value = 0;
    divisor.value = 0;

    setTimeout(() => {
        counter.value++;
        divisor.value = current_divisor.value;
        dividend.value = divisor.value * randomIntFromInterval(2, 12);

        // Antwortmöglichkeiten erstellen
        const correctAnswer = dividend.value / divisor.value;
        answerOptions.value = generateAnswerOptions(correctAnswer);

        ok.value = false;
        nok.value = false;
    }, 150);
};

// Antwortoptionen generieren mit sechs Optionen
const generateAnswerOptions = (correctAnswer) => {
    const options = new Set([correctAnswer]);
    while (options.size < 6) { // Sechs Optionen anstatt vier
        options.add(randomIntFromInterval(2, 12));
    }
    return Array.from(options).sort((a, b) => a - b);
};

// Ergebnis prüfen
const checkAnswer = (chosenAnswer) => {
    if (chosenAnswer === dividend.value / divisor.value) {
        ok.value = true;
    } else {
        nok.value = true;
        setTimeout(() => {
            nok.value = false;
        }, 2500);
    }
};

// Divisor ändern und neue Aufgabe generieren
const chooseDivisor = (newDivisor) => {
    current_divisor.value = newDivisor;
    generateNewTask();
};

// Startaufgabe generieren
generateNewTask();
</script>

<template>
    <div>
        <!-- Auswahl der Divisionsreihen -->
        <div class="flex justify-around my-4 py-4 bg-amber-200">
            <div v-for="reihe in [2,3,4,5,6,7,8,9,10]" :key="`r${reihe}`">
                <a 
                    href="#" 
                    @click.prevent="chooseDivisor(reihe)"
                    :class="{'text-amber-800 font-bold border-b-4 border-b-amber-800':reihe === current_divisor}"
                >{{ reihe }}er - Reihe</a>
            </div>
        </div>

        <!-- Layout für Aufgabe, Feedback und Antworten -->
        <div class="flex justify-between">
            <!-- Aufgabe links -->
            <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-2">
                <div class="grid place-items-center h-full">
                    <div v-if="divisor === 0" class="text-2xl">
                        Moooooment...
                    </div>
                    <div v-else class="text-8xl">
                        {{ dividend }} : {{ divisor }} = 
                    </div>
                    <!-- Button für die nächste Aufgabe bei richtiger Antwort -->
                    <button 
                        v-if="ok" 
                        @click="generateNewTask"
                        class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Nächste Aufgabe
                    </button>
                </div>
            </div>

            <!-- Feedback in der Mitte -->
            <div class="h-full grid self-center">
                <div class="text-2xl text-center">
                    Runde {{ counter }}
                </div>
                <div class="text-4xl bg-green-600 text-white rounded-md py-3 px-8" v-show="ok">
                    Sehr gut 👍
                </div>
                <div class="text-4xl bg-slate-700 text-white rounded-md py-3 px-8" v-show="nok">
                    Sehr falsch 
                </div>
            </div>

            <!-- Antwortmöglichkeiten rechts -->
            <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-2">
                <div class="flex flex-wrap place-content-center h-full">
                    <div v-for="answer in answerOptions" :key="`answer${answer}`">
                        <button 
                            class="w-20 h-20 border-2 border-sky-800 bg-sky-400 text-slate-800 rounded-md font-semibold text-4xl m-2 p-2 hover:bg-sky-600 transition" 
                            @click.prevent="checkAnswer(answer)"
                        >{{ answer }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Stile für das Layout */
</style>
