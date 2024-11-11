<template>
    <div class="game-container" :class="{ 'shake': shakeScreen }">
      <h2 class="text-4xl">Klicke die Zahl am Zahlenstrahl an!</h2>
      <div class="number-display">
        <span>{{ number }}</span>
      </div>
      <div class="score">
        Punkte: {{ correctCount }} / {{ totalCount }}<br>
      </div>
      <div class="number-line" @click="handleClick($event)">
        <div class="line"></div>
        <div class="end-markers">
          <span>0</span>
          <span>100</span>
        </div>
        <transition name="marker">
          <div v-if="markerVisible" class="marker" :style="{ left: `${markerPosition}%` }">
            <span class="marker-number">{{ selectedNumber }}</span>
          </div>
        </transition>
        <transition name="marker">
          <div v-if="markerVisible" class="marker actual" :style="{ left: `${actualPosition}%` }">
            <span class="marker-number">{{ number }}</span>
          </div>
        </transition>
        <div v-for="ripple in ripples" :key="ripple.id" class="ripple" :style="ripple.style"></div>
      </div>
      <div v-if="feedback" class="feedback" :class="feedbackClass">
        {{ feedback }}
      </div>
      <div v-if="flashRed" class="flash-red"></div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: `${progress}%`, backgroundColor: progressColor }"></div>
        <div class="emoji">{{ progressEmoji }}</div>
        <div class="message">{{ progressMessage }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import JSConfetti from 'js-confetti';

  export default {
    setup() {
      const number = ref(generateRandomNumber());
      const correctCount = ref(0);
      const totalCount = ref(0);
      const feedback = ref('');
      const feedbackClass = ref('');
      const markerVisible = ref(false);
      const markerPosition = ref(0);
      const actualPosition = ref(0);
      const selectedNumber = ref(0);
      const threshold = ref(5); // Configurable threshold
      const shakeScreen = ref(false);
      const flashRed = ref(false);
      const ripples = ref([]);
      const jsConfetti = new JSConfetti();

      const handleClick = (event) => {
        const line = event.currentTarget;
        const rect = line.getBoundingClientRect();
        const clickPosition = ((event.clientX - rect.left) / rect.width) * 100;
        selectedNumber.value = Math.round((clickPosition / 100) * 100);
  
        markerPosition.value = clickPosition;
        actualPosition.value = (number.value / 100) * 100;
        markerVisible.value = true;

        // Add ripple effect
        const rippleId = Date.now();
        ripples.value.push({
          id: rippleId,
          style: {
            left: `${clickPosition}%`,
            top: '50%',
          },
        });
        setTimeout(() => {
          ripples.value = ripples.value.filter(ripple => ripple.id !== rippleId);
        }, 1000);
  
        totalCount.value++;
        const difference = Math.abs(selectedNumber.value - number.value);
        if (difference === 0) {
          correctCount.value += 2;
          feedback.value = 'Perfekt!';
          feedbackClass.value = 'perfect';
          jsConfetti.addConfetti({
            confettiNumber: 1000,
            confettiColors: [
                '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
            ],
          });
        } else if (difference <= threshold.value) {
          correctCount.value++;
          feedback.value = `Gut gemacht! Du hast die Zahl um ${difference} verpasst.`;
          feedbackClass.value = 'close';
          jsConfetti.addConfetti({
            confettiColors: [
                '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
            ],
          });
        } else {
          feedback.value = `Schlecht! Du hast die Zahl um ${difference} verpasst.`;
          feedbackClass.value = 'incorrect';
          flashRed.value = true;
          shakeScreen.value = true;
          setTimeout(() => {
            flashRed.value = false;
            shakeScreen.value = false;
          }, 500);
        }
  
        setTimeout(nextRound, 2000);
      };
      
      const nextRound = () => {
        number.value = generateRandomNumber();
        feedback.value = '';
        markerVisible.value = false;
      };
  
      const progress = computed(() => (correctCount.value / totalCount.value) * 100);
      const progressColor = computed(() => {
        if (progress.value > 75) return 'green';
        if (progress.value > 50) return 'lightgreen';
        if (progress.value > 25) return 'orange';
        return 'red';
      });
      const progressEmoji = computed(() => {
        if (correctCount.value === 0) return '';
        if (progress.value > 75) return '😊';
        if (progress.value > 50) return '🙂';
        if (progress.value > 25) return '😐';
        return '😢';
      });
      const progressMessage = computed(() => {
        if (correctCount.value === 0) return '';
        if (progress.value > 75) return 'Ausgezeichnet!';
        if (progress.value > 50) return 'Gut gemacht!';
        if (progress.value > 25) return 'Nicht schlecht!';
        return 'Gib dir mehr Mühe!';
      });
  
      return {
        number,
        correctCount,
        totalCount,
        feedback,
        feedbackClass,
        markerVisible,
        markerPosition,
        actualPosition,
        selectedNumber,
        handleClick,
        progress,
        progressColor,
        progressEmoji,
        progressMessage,
        threshold,
        shakeScreen,
        flashRed,
        ripples,
      };
    },
  };
  
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  </script>
  
  <style scoped>
  .game-container {
    text-align: center;
    padding: 20px;
    position: relative;
  }
  
  .number-display {
    font-size: 48px;
    font-weight: bold;
    margin: 20px 0;
    color: #4a90e2;
  }
  
  .score {
    font-size: 18px;
    position: absolute;
    top: 1em;
    left: 1em;
  }
  
  .number-line {
    position: relative;
    height: 100px;
    margin: 20px 0;
    cursor: pointer;
  }
  
  .line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background-color: black;
  }
  
  .end-markers {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    font-size: 14px;
  }
  
  .marker {
    position: absolute;
    top: 0;
    width: 2px;
    height: 100px;
    background-color: blue;
    animation: marker-animation 0.5s ease-out;
  }
  
  .marker.actual {
    background-color: red;
  }
  
  .marker-number {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
  }
  
  @keyframes marker-animation {
    from {
      height: 0;
    }
    to {
      height: 100px;
    }
  }
  
  .feedback {
    font-size: 18px;
    position: absolute;
    top: 7px;
    right: 1em;
    max-width: 15em;
    text-align: right;
  }
  
  .perfect {
    color: green;
  }
  
  .close {
    color: lightgreen;
  }
  
  .incorrect {
    color: red;
  }
  
  .progress-bar {
    margin-top: 50px;
    display: flex;
    align-items: center;
  }
  
  .progress {
    height: 20px;
    transition: width 0.5s;
  }
  
  .emoji {
    margin-left: 10px;
    font-size: 24px;
  }
  
  .message {
    margin-left: 10px;
    font-size: 18px;
  }

  .flash-red {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.5);
    z-index: 1000;
    animation: flash-animation 0.5s ease-out;
  }

  @keyframes flash-animation {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .shake {
    animation: shake-animation 0.5s;
  }

  @keyframes shake-animation {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    50% { transform: translateX(10px); }
    75% { transform: translateX(-10px); }
  }

  .ripple {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: blue;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ripple-animation 1s ease-out;
  }

  @keyframes ripple-animation {
    from {
      width: 20px;
      height: 20px;
      opacity: 1;
    }
    to {
      width: 100px;
      height: 100px;
      opacity: 0;
    }
  }
  </style>