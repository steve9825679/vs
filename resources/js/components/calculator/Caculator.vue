<script setup>
    import { ref } from 'vue';
    
    let current_reihe = ref(2);

    const choose_reihe = (reihe) => {
        current_reihe.value = reihe;
        make_calculation();
    }

    let ok = ref(false);
    let nok = ref(false);

    let m1 = ref(0);
    let m2 = ref(0);
    let results = ref([]);

    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const shuffle = (array) => {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    const make_calculation = () => {

        m1.value = 0;
        m2.value = 0;

        setTimeout(() => {
            
            m1.value = randomIntFromInterval(1, 10);
            m2.value = current_reihe.value;
    
            results.value = [];
            for (let i = 0; i <= 10; i++) {
                results.value.push(i*current_reihe.value);
            }
    
            shuffle(results.value)

        }, 150);


    }

    const check_result = (chosen_result) => {

        const r1 = parseInt(chosen_result);
        const r2 = parseInt(m1.value * m2.value);

        if (r1 === r2) {
            m2.value = 0;
            ok.value = true;
            setTimeout(() => {
                ok.value = false;
                make_calculation();
            }, 2500);
        } else {
            nok.value = true;
            setTimeout(() => {
                nok.value = false;
            }, 2500);
        }


    }


    make_calculation();
    
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
                <div class="grid place-items-center h-full">
                    <div v-if="m2 === 0" class="text-2xl">
                        Moooooment...
                    </div>
                    <div v-else class="text-6xl">
                        {{ m1 }} &centerdot; {{ m2 }} = 
                    </div>
                </div>
            </div>
            <div class="h-full grid self-center">
                <div class="text-4xl text-pink-400">
                    Das kleine 1x1 😍
                </div>
                <div class="text-4xl bg-green-700 text-white rounded-md p-3 mt-5" v-show="ok">
                    Suuuuuuuuper 👍
                </div>
                <div class="text-4xl bg-slate-700 text-white rounded-md p-3 mt-5" v-show="nok">
                    Oiiiiiiii 😒
                </div>
            </div>
            <div class="h-67 w-72 border-amber-300 border-4 rounded-lg p-2">
                <div class="flex flex-wrap place-content-center h-full">
                    <div v-for="result in results" :key="`result${result}`">
                        <button class="w-12 h-12 border-2 border-sky-800 bg-sky-400 text-slate-800 rounded-md font-semibold text-xl m-2 p-2" @click.prevent="check_result(result)">{{ result }}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

