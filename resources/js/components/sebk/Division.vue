<template>
    <div class="division-component">
      <div class="task-area">
        <p>{{ task }}</p>
      </div>
      <div class="feedback-area" :class="feedbackClass">
        <p>{{ feedback }}</p>
      </div>
      <div class="choices-area">
        <button v-for="choice in choices" :key="choice" @click="checkAnswer(choice)" class="choice-button">
          {{ choice }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        divisors: [2, 3, 4, 5],  // Beispiel-Divisoren
        dividend: 0,
        divisor: 0,
        task: '',
        choices: [],
        feedback: '',
        feedbackClass: ''
      };
    },
    created() {
      this.generateTask();
    },
    methods: {
      generateTask() {
        this.divisor = this.divisors[Math.floor(Math.random() * this.divisors.length)];
        this.dividend = this.divisor * Math.floor(Math.random() * 10 + 1);
        this.task = `${this.dividend} / ${this.divisor} = ?`;
        this.generateChoices
        </script>





