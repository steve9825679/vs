<script setup>
import { ref, onMounted } from 'vue';

let randNumber = ref(0);

let round = ref(1)

const numbers = ref(Array.from({ length: 100 }, (_, i) => i + 1));
let ok = ref(false)

let nok = ref(false)

const randomNumber = (min, max) => {
  randNumber.value = Math.floor(Math.random() * (max - min + 1) + min);
};

function generateAddNew() {
    randomNumber(1, 100)
}
function checkNumber(number) {
  if (number === randNumber.value) {
    ok.value = true
    round.value++
    randomNumber(1, 100)
    setTimeout(() => {
      ok.value = false
    }, 2000)
  } else {
    nok.value = true
    setTimeout(() => {
      nok.value = false
    }, 2000)
  }
}

onMounted(() => {
  randomNumber(1, 100);
});
</script>
<template>
  <div id="app">
    <div>
        <h1 class="number">Drücke auf {{randNumber}};</h1>
        <h1 >Runde {{ round }}</h1>
        <div class="text-4xl bg-green-700 text-white rounded-md py-3 px-8" v-show="ok">
                    Suuuuuuuuper 👍
                </div>
                <div class="text-4xl bg-slate-700 text-white rounded-md py-3 px-8" v-show="nok">
                    Oiiiiiiii 😒
                </div>
    </div>
    <div class="grid">
      <div v-for="number in numbers" :key="number" @click="checkNumber(number)" class="bg-amber-200 text-amber-800 font-bold border-b-4 cursor-pointer grid-item">
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

.number{
  font-size: 2em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 5px;
}

.grid-item {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}
.grid-item:hover {
  background-color: #ddd;
}
</style>