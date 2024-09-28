<script setup>
    import { ref } from 'vue';
    
    let current_reihe = ref(2);

    const choose_reihe = (reihe) => {
        current_reihe.value = reihe;
    }

    

</script>

<template>
    <div>
        <div class="flex justify-between">
            <div v-for="reihe in [2,3,4,5,6,7,8,9,10]" :key="`r${reihe}`">
                <a 
                    href="#" 
                    @click.prevent="choose_reihe(reihe)"
                    :class="{'text-pink-800 font-bold':reihe == current_reihe}"
                >{{ reihe }}er - Reihe</a>
            </div>
        </div>


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

    </div>
</template>

