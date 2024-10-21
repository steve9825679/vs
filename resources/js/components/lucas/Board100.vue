<script setup>
</script>

<template>
  <div id="app">
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