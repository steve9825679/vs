<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const exercise = ref({});
const correctCount = ref(0);
const wrongCount = ref(0);
const shakeScreen = ref(false);
const flashRed = ref(false);
const difficulty = ref(1);

const _0xeeac8a=_0x1efc;function _0x2bef(){const _0x17b094=['16pLZRgK','2829834BUrcpf','2089000qWwCAE','362478quURji','7AMIfSn','131688bxhmGE','671783PezSZY','c2stZUNSOExRRW42Vkt1TVJqT1U2QTJUM0JsYmtGSjlMNWNZYkFvRmxuclZXcVlqbzc3','2489877bSIzma','386145XobYto'];_0x2bef=function(){return _0x17b094;};return _0x2bef();}function _0x1efc(_0x73d25,_0x4d17de){const _0x2befab=_0x2bef();return _0x1efc=function(_0x1efc12,_0x16f99c){_0x1efc12=_0x1efc12-0x17b;let _0x1ec6de=_0x2befab[_0x1efc12];return _0x1ec6de;},_0x1efc(_0x73d25,_0x4d17de);}(function(_0x10e45f,_0x55cb71){const _0x27eb81=_0x1efc,_0x2842b6=_0x10e45f();while(!![]){try{const _0x140ed2=-parseInt(_0x27eb81(0x181))/0x1+parseInt(_0x27eb81(0x180))/0x2+parseInt(_0x27eb81(0x183))/0x3+parseInt(_0x27eb81(0x17b))/0x4*(-parseInt(_0x27eb81(0x184))/0x5)+-parseInt(_0x27eb81(0x17e))/0x6*(parseInt(_0x27eb81(0x17f))/0x7)+parseInt(_0x27eb81(0x17d))/0x8+parseInt(_0x27eb81(0x17c))/0x9;if(_0x140ed2===_0x55cb71)break;else _0x2842b6['push'](_0x2842b6['shift']());}catch(_0x2034f7){_0x2842b6['push'](_0x2842b6['shift']());}}}(_0x2bef,0x690a2));const apiKey=atob(_0xeeac8a(0x182));

const EXERCISE_PROMPT = `Erstelle eine Mathematikaufgabe mit Schwierigkeit 1-10. Gib nur valides JSON in exakt dieser Struktur zurück:
Schwierigkeit = 1 => {
  "question": "5 Fische treffen eine Gruppe von 3 Fischen. Wie viele Fische sind es insgesamt?",
  "options": ["6 Fische", "7 Fische", "8 Fische", "9 Fische"],
  "correct": "8 Fische"
}
Schwierigkeit = 10 => {
  "question": "Ein Auto bewegt sich mit einer konstanten Beschleunigung von 3m/s^2, welche Strecke in Metern hat es zurückgelegt, wenn es 30km/h schnell ist?",
  "options": ["11.56m", "13.21m", "15.98m", "2.5m"],
  "correct": "11.56m"
}
Anforderungen:
- Schwierigkeit: {{difficulty}}
- Die Frage muss eine mathematische Frage passend zur Schwierigkeit sein
- Genau 4 numerische Antwortmöglichkeiten
- Eine Option MUSS die korrekte Antwort sein
- Denk dir die kreativste Frage überhaupt aus
- Keine Leerzeichen oder Formatierung im JSON`;

const fetchExercise = async () => {
  loading.value = true;
  console.log('prompt: ', EXERCISE_PROMPT.replace('{{difficulty}}', difficulty.value))
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: EXERCISE_PROMPT.replace('{{difficulty}}', difficulty.value)
        }],
        temperature: 1.0
      })
    });

    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Ungültige API-Antwort');
    }

    exercise.value = JSON.parse(data.choices[0].message.content);
    console.log('answer: ', exercise.value);
    exercise.value.options = exercise.value.options.sort(() => Math.random() - 0.5);
    if (!exercise.value.options.includes(exercise.value.correct)) {
      throw new Error('Korrekte Antwort ist bereits in den Optionen enthalten');
    }
  } catch (error) {
    console.error('Fehler beim Laden der Aufgabe:', error);
    exercise.value = {
      question: 'Was ist 2 + 3?',
      options: [3, 4, 5, 6],
      correct: 5
    };
  } finally {
    loading.value = false;
  }
};

const checkAnswer = (option) => {
  if (option === exercise.value.correct) {
    correctCount.value++;
    fetchExercise();
  } else {
    wrongCount.value++;
    flashRed.value = true;
    shakeScreen.value = true;
    setTimeout(() => {
      flashRed.value = false;
      shakeScreen.value = false;
    }, 500);
  }
};

onMounted(fetchExercise);
</script>

<template>
    <div class="left-3 top-3">
      <label for="difficulty">Schwierigkeit: </label>
      <input type="range" id="difficulty" min="1" max="10" v-model="difficulty">
      <span>{{ difficulty }}</span>
    </div>
  <div 
    class="game-container p-6 max-w-2xl mx-auto"
    :class="{ 'shake': shakeScreen, 'flash-red': flashRed }"
  >    
    <div v-if="loading" class="text-2xl font-bold animate-pulse">
      Neue Aufgabe wird geladen...
    </div>
    
    <div v-else class="space-y-8">
      <div class="text-xl font-medium">
        {{ exercise.question }}
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <button
          v-for="(option, index) in exercise.options"
          :key="index"
          @click="checkAnswer(option)"
          class="p-4 text-xl bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
        >
          {{ option }}
        </button>
      </div>
      
      <div class="text-xl">
        <span class="text-green-600">Richtig: {{ correctCount }}</span>
        <span class="mx-2">/</span>
        <span class="text-red-600">Falsch: {{ wrongCount }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

.flash-red {
  animation: flash 0.5s ease-out;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

@keyframes flash {
  0% { background-color: transparent; }
  50% { background-color: rgba(254, 202, 202, 0.5); }
  100% { background-color: transparent; }
}
</style>