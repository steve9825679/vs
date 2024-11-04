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
                    <div v-if="correctAnswerSelected">Klick mich!</div>
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
                        {{ randomPositiveMessage }}
                    </div>
                    <!-- Zufällige motivierende Meldungen bei falscher Antwort -->
                    <div v-show="nok" class="text-4xl bg-slate-700 text-white rounded-md py-3 px-8">
                        {{ randomNegativeMessage }}
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
import { ref, computed } from 'vue';

export default {
    setup() {
        const selectedRow = ref(1);
        const task = ref({ divisor: 0, dividend: 0, solution: 0 });
        const ok = ref(false);
        const nok = ref(false);
        const round = ref(0);
        const shuffledAnswers = ref([]);
        const correctAnswerSelected = ref(false);

        // Positive und motivierende Nachrichten erweitern
        const positiveMessages = [
            "Fantastisch!", "Super gemacht!", "Bravo!", "Das war klasse!", "Genial!",
            "Ausgezeichnet!", "Weiter so!", "Perfekt getroffen!", "Das sitzt!", "Meisterhaft!"
        ];
        const negativeMessages = [
            "Fast! Versuch's nochmal!", "Keine Sorge, du schaffst das!", "Weiter so!", 
            "Gib nicht auf!", "Das klappt gleich!", "Schon fast da!", 
            "Noch einmal probieren!", "Du bist ganz nah dran!", "Bleib dran!", "Das nächste Mal schaffst du's!"
        ];

        // Berechnet eine zufällige positive oder negative Nachricht
        const randomPositiveMessage = computed(() => 
            positiveMessages[Math.floor(Math.random() * positiveMessages.length)]
        );
        const randomNegativeMessage = computed(() => 
            negativeMessages[Math.floor(Math.random() * negativeMessages.length)]
        );

        // Zufällige Ganzzahl im Bereich erzeugen
        const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

        // Shuffle-Funktion für Antwortmöglichkeiten
        const shuffleArray = (array) => {
            let currentIndex = array.length;
            while (currentIndex !== 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        };

        // Neue Aufgabe generieren
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

        // Neue Aufgabe generieren, wenn die richtige Antwort gewählt und das Aufgabenfeld geklickt wurde
        const generateNextTaskIfCorrect = () => {
            if (correctAnswerSelected.value) {
                generateTask();
            }
        };

        // Reihe wählen und neue Aufgabe generieren
        const selectRow = (reihe) => {
            selectedRow.value = reihe;
            generateTask();
        };

        // Antwort überprüfen
        const checkAnswer = (answer) => {
            if (answer === task.value.solution) {
                ok.value = true;
                correctAnswerSelected.value = true;
            } else {
                nok.value = true;
                correctAnswerSelected.value = false;
                setTimeout(() => (nok.value = false), 2500);
            }
        };

        generateTask(); // Startet mit einer Aufgabe beim Laden der Komponente

        return {
            selectedRow,
            task,
            ok,
            nok,
            round,
            shuffledAnswers,
            correctAnswerSelected,
            randomPositiveMessage,
            randomNegativeMessage,
            selectRow,
            checkAnswer,
            generateNextTaskIfCorrect
        };
    }
};
</script>

<style scoped>
/* Keine weiteren spezifischen CSS-Anpassungen, da Tailwind-Klassen verwendet werden */
</style>
