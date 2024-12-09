<template>
    <div>
      <div class="flex justify-around my-4 py-4 bg-amber-200">
        <div v-for="reihe in [2,3,4,5,6,7,8,9,10]" :key="`reihe-${reihe}`">
          <a 
            href="#" 
            @click.prevent="selectRow(reihe)"
            :class="{'text-amber-800 font-bold border-b-4 border-b-amber-800': reihe === selectedRow}"
          >
            {{ reihe }}-Reihe
          </a>
        </div>
      </div>
  
      <div class="flex justify-between">
        <div 
          class="h-96 w-1/3 border-amber-300 border-4 rounded-lg p-2 cursor-pointer" 
          @click="generateNextTaskIfCorrect"
        >
          <div class="grid place-items-center h-full text-4xl">
            <div v-if="allCorrectSelected" class="bounce-animation">Klick mich!</div>
            <div v-else>
              <span>Wie oft geht {{ task.divisor }} in {{ task.dividend }}?</span>
            </div>
          </div>
        </div>
  
        <div class="h-96 w-1/3 grid self-center text-center">
          <div class="text-2xl mb-4">Runde {{ round }}</div>
          <div class="h-16 flex items-center justify-center">
            <div v-show="ok" class="text-4xl bg-green-700 text-white rounded-md py-3 px-8">
              {{ currentPositiveMessage }}
            </div>
            <div v-show="nok" class="text-4xl bg-slate-700 text-white rounded-md py-3 px-8">
              {{ currentNegativeMessage }}
            </div>
          </div>
  
          <div class="flex flex-wrap place-content-center h-full">
            <div v-for="answer in shuffledAnswers" :key="`answer-${answer}`">
              <button 
                @click.prevent="checkAnswer(answer)"
                :disabled="isLocked"
                class="w-20 h-20 border-2 border-sky-800 bg-sky-400 text-slate-800 rounded-md font-semibold text-4xl m-2 p-2 hover:bg-sky-600 transition"
              >
                {{ answer }}
              </button>
            </div>
          </div>
        </div>
  
        <div 
          class="h-96 w-1/3 border-amber-300 border-4 rounded-lg p-2"
          :class="{'bg-gray-200': !correctAnswerSelected, 'bg-white': correctAnswerSelected}"
        >
          <div class="flex flex-col items-center h-full">
            <label class="text-2xl mb-2">Wähle den Rest:</label>
            <div v-if="!correctAnswerSelected" class="text-red-600 text-xl mb-4">
              Wähle zuerst die richtige Antwort!
            </div>
            <div class="flex flex-wrap justify-center h-full">
              <div v-for="remainder in filteredRemainders" :key="`remainder-${remainder}`">
                <button 
                  @click.prevent="checkRemainder(remainder)"
                  :disabled="!correctAnswerSelected || isLocked"
                  :class="{
                    'w-20 h-20 border-2 border-sky-800 rounded-md font-semibold text-4xl m-2 p-2': true,
                    'bg-gray-400 text-gray-600': !correctAnswerSelected,
                    'bg-sky-400 text-slate-800 hover:bg-sky-600 transition': correctAnswerSelected
                  }"
                >
                  {{ remainder }}
                </button>
              </div>
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
      const task = ref({ divisor: 0, dividend: 0, solution: 0, remainder: 0 });
      const ok = ref(false);
      const nok = ref(false);
      const round = ref(0);
      const shuffledAnswers = ref([]);
      const correctAnswerSelected = ref(false);
      const correctRemainderSelected = ref(false);
      const allCorrectSelected = ref(false);
      const currentPositiveMessage = ref("");
      const currentNegativeMessage = ref("");
      const isLocked = ref(false);
      const possibleRemainders = ref([]);
      const userAnswer = ref(null);
      const userRemainder = ref(null);
  
      const filteredRemainders = computed(() => possibleRemainders.value.filter((r) => r !== 0));
  
      const positiveMessages = [
        "Fantastisch!", "Super gemacht!", "Bravo!", "Das war klasse!", "Genial!",
        "Ausgezeichnet!", "Weiter so!", "Perfekt getroffen!", "Das sitzt!", "Meisterhaft!"
      ];
      const negativeMessages = [
        "Versuch's nochmal!", "Du schaffst das!", "Weiter so!", 
        "Gib nicht auf!", "Das klappt gleich!", "Schon fast da!", 
        "Probiers nochmal!", "Fast!", "Bleib dran!", "Nächstes Mal!"
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
        const dividend = divisor * multiplier + randomIntFromInterval(1, divisor - 1);
  
        task.value = { divisor, dividend, solution: multiplier, remainder: dividend % divisor };
        shuffledAnswers.value = shuffleArray(Array.from({ length: 10 }, (_, i) => i + 1));
        round.value++;
        resetSelections();
      };
  
      const resetSelections = () => {
        ok.value = nok.value = false;
        correctAnswerSelected.value = false;
        correctRemainderSelected.value = false;
        allCorrectSelected.value = false;
        isLocked.value = false;
        userAnswer.value = null;
        userRemainder.value = null;
        possibleRemainders.value = Array.from({ length: task.value.divisor }, (_, i) => i);
      };
  
      const generateNextTaskIfCorrect = () => {
        if (allCorrectSelected.value) {
          generateTask();
        }
      };
  
      const selectRow = (reihe) => {
        selectedRow.value = reihe;
        generateTask();
      };
  
      const checkAnswer = (answer) => {
        if (answer === task.value.solution) {
          userAnswer.value = answer;
          correctAnswerSelected.value = true;
        } else {
          showNegativeFeedback("Falsche Antwort!");
        }
      };
  
      const checkRemainder = (remainder) => {
        if (!correctAnswerSelected.value) {
          showNegativeFeedback("Wähle zuerst die richtige Antwort!");
          return;
        }
  
        if (remainder === task.value.remainder) {
          userRemainder.value = remainder;
          correctRemainderSelected.value = true;
          checkIfComplete();
        } else {
          showNegativeFeedback("Falscher Rest!");
        }
      };
  
      const showNegativeFeedback = (message) => {
        nok.value = true;
        currentNegativeMessage.value = message;
        setTimeout(() => (nok.value = false), 2500);
      };
  
      const checkIfComplete = () => {
        if (correctAnswerSelected.value && correctRemainderSelected.value) {
          ok.value = true;
          allCorrectSelected.value = true;
          isLocked.value = true;
          currentPositiveMessage.value = getRandomMessage(positiveMessages);
        }
      };
  
      generateTask();
  
      return {
        selectedRow, task, ok, nok, round, shuffledAnswers,
        correctAnswerSelected, correctRemainderSelected, allCorrectSelected,
        currentPositiveMessage, currentNegativeMessage, isLocked, 
        filteredRemainders, userAnswer, userRemainder,
        selectRow, checkAnswer, generateNextTaskIfCorrect, checkRemainder
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
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.1); }
  }
  </style>
  