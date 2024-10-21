<script setup>
import { ref, onMounted } from 'vue';

let randNumber = ref(0);

const numbers = ref(Array.from({ length: 100 }, (_, i) => i + 1));

const randomNumber = (min, max) => {
  randNumber.value = Math.floor(Math.random() * (max - min + 1) + min);
};

function generateAddNew() {
    randomNumber(1, 100)
}
function handleClick(number) {
  if (number === randNumber.value) {
    alert("Correct");
    randomNumber(1, 100)
  } else {
    alert("Wrong, try again!");
  }
}

onMounted(() => {
  randomNumber(1, 100);
});
</script>
<template>
  <div id="app">
    <div>
        Clicken Sie {{randNumber}};
    </div>
    <div class="grid">
      <div v-for="number in numbers" :key="number" @click="handleClick(number)" class="grid-item">
        {{ number }}
      </div>
    </div>
  </div>
</template>
<style scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr); /* 10 columns */
  gap: 5px;
}

.grid-item {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}
.grid-item:hover {
  background-color: #ddd;
}
</style>
>