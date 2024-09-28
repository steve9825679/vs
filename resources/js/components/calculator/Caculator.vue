<script setup>
    import { ref } from 'vue'
    
    const counter = ref(0)
    
</script>

<template>
    <div>
        <div class="flex justify-between">

            <div class="h-64 w-64 border-amber-300 border-4 rounded-lg p-2">
                Calculator
            </div>
            <div class="h-full grid self-center text-4xl text-pink-400">
                Das kleine 1x1
            </div>
            <div class="h-64 w-64 border-amber-300 border-4 rounded-lg p-2">
                Results
            </div>
        </div>

        <button
            type="button"
            @click="counter++"
            class="p-2 text-white bg-gray-500 rounded"
        >
            Counter is: {{ counter }}
        </button>
    </div>
</template>

