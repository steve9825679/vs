<template>
    <div>
        <!-- Auswahl der Divisionstabelle als Buttons mit Tailwind-Styling -->
        <div class="flex justify-around my-4 py-4 bg-amber-200">
            <div v-for="reihe in [1,2,3,4,5,6,7,8,9,10]" :key="`reihe-${reihe}`">
                <a 
                    href="#" 
                    @click.prevent="selectRow(reihe)"
                    :class="{'text-amber-800 font-bold border-b-4 border-b-amber-800': reihe === selectedRow}"
                >
                    {{ reihe }}-Reihe
                </a>
            </div>
        </div>

        <!-- Aufgabe und Antwortbereich -->
        <div class="flex justify-between">
            <!-- Aufgabe links -->
            <div 
                class="h-96 w-96 border-amber-300 border-4 rounded-lg p-2 cursor-pointer" 
                @click="generateNextTaskIfCorrect"
            >
                <div class="grid place-items-center h-full text-4xl">
                    <!-- Anzeige "Klick mich!" statt der Aufgabe -->
                    <div v-if="correctAnswerSelected" class="bounce-animation">Klick mich!</div>
                    <div v-else>Wie oft geht {{ task.divisor }} in {{ task.dividend }}?</div>
                </div>
            </div>

            <!-- Ergebnis und Feedback -->
            <div class="h-full grid self-center text-center">
                <div class="text-2xl mb-4">
                    Runde {{ round }}
                </div>
                <!-- Fester Bereich für Feedback-Meldungen -->
                <div class="h-16 flex items-center justify-center">
                    <!-- Zufällige positive Meldungen -->
                    <div v-show="ok" class="text-4xl bg-green-700 text-white rounded-md py-3 px-8">
                        {{ currentPositiveMessage }}
                    </div>
                    <!-- Zufällige motivierende Meldungen bei falscher Antwort -->
                    <div v-show="nok" class="text-4xl bg-slate-700 text-white rounded-md py-3 px-8">
                        {{ currentNegativeMessage }}
                    </div>
                </div>
            </div>

            <!-- Antwortmöglichkeiten rechts -->
            <div class="h-96 w-96 border-amber-300 border-4 rounded-lg p-2">
                <div class="flex flex-wrap place-content-center h-full">
                    <div v-for="answer in shuffledAnswers" :key="`answer-${answer}`">
                        <button 
                            @click.prevent="checkAnswer(answer)"
                            class="w-20 h-20 border-2 border-sky-800 bg-sky-400 text-slate-800 rounded-md font-semibold text-4xl m-2 p-2 hover:bg-sky-600 transition"
                        >
                            {{ answer }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const selectedRow = ref(1);
        const task = ref({ divisor: 0, dividend: 0, solution: 0 });
        const ok = ref(false);
        const nok = ref(false);
        const round = ref(0);
        const shuffledAnswers = ref([]);
        const correctAnswerSelected = ref(false);
        const currentPositiveMessage = ref("");
        const currentNegativeMessage = ref("");

        // Positive und motivierende Nachrichten erweitern
        const positiveMessages = [
            "Fantastisch!", "Super gemacht!", "Bravo!", "Das war klasse!", "Genial!",
            "Ausgezeichnet!", "Weiter so!", "Perfekt getroffen!", "Das sitzt!", "Meisterhaft!"
        ];
        const negativeMessages = [
            "Versuch's nochmal!", "Du schaffst das!", "Weiter so!", 
            "Gib nicht auf!", "Das klappt gleich!", "Schon fast da!", 
            "Noch einmal!", "Ganz nah dran!", "Bleib dran!"
        ];

        const getRandomMessage = (messagesArray) => messagesArray[Math.floor(Math.random() * messagesArray.length)];

        const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

        const shuffleArray = (array) => {
            let currentIndex = array.length;
            while (currentIndex !== 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        };

        const generateTask = () => {
            const divisor = selectedRow.value;
            const multiplier = randomIntFromInterval(1, 10);
            const dividend = divisor * multiplier;
            task.value = { divisor, dividend, solution: multiplier };

            shuffledAnswers.value = shuffleArray(Array.from({ length: 10 }, (_, i) => i + 1));
            round.value++;
            ok.value = nok.value = false;
            correctAnswerSelected.value = false;
        };

        const generateNextTaskIfCorrect = () => {
            if (correctAnswerSelected.value) {
                generateTask();
            }
        };

        const selectRow = (reihe) => {
            selectedRow.value = reihe;
            generateTask();
        };

        const checkAnswer = (answer) => {
            if (answer === task.value.solution) {
                ok.value = true;
                nok.value = false;
                correctAnswerSelected.value = true;
                currentPositiveMessage.value = getRandomMessage(positiveMessages);
            } else {
                nok.value = true;
                ok.value = false;
                correctAnswerSelected.value = false;
                currentNegativeMessage.value = getRandomMessage(negativeMessages);
                setTimeout(() => (nok.value = false), 2500);
            }
        };

        generateTask();

        return {
            selectedRow,
            task,
            ok,
            nok,
            round,
            shuffledAnswers,
            correctAnswerSelected,
            currentPositiveMessage,
            currentNegativeMessage,
            selectRow,
            checkAnswer,
            generateNextTaskIfCorrect
        };
    }
};
</script>

<style scoped>
.bounce-animation {
    animation: bounce 1s infinite ease-in-out;
    font-size: 2rem;
    font-weight: bold;
    color: #FF5722;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-20px) scale(1.1);
    }
}
</style>
