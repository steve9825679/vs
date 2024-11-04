<script setup>
    import { ref } from 'vue';
    
    let current_reihe = ref(2);

    const choose_reihe = (reihe) => {
        current_reihe.value = reihe;
        make_calculation();
    }
</script>

<template>
    <div>
        <div class="flex justify-around my-4 py-4 bg-amber-200">
            <div v-for="reihe in [10, 20, 30, 40, 50]" :key="`r${reihe}`">
                <a 
                    href="#" 
                    @click.prevent="choose_reihe(reihe)"
                    :class="{'text-amber-800 font-bold border-b-4 border-b-amber-800':reihe == current_reihe}"
                >{{ reihe }}er - Überschreiten</a>
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>