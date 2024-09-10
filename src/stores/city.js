import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {cities as jsonCities} from "@/assets/cities.js";

export const useCityStore = defineStore('city', () => {
    const cities = jsonCities
    const city = ref(null)
    const stepNumber = ref(0)

    function selectCity(id) {
        city.value = cities.find((s) => s.id === id);
        restore();
    }

    function hasCity(id) {
        return cities.find((s) => s.id === id) !== undefined;
    }

    function increaseStep(amount) {
        stepNumber.value += amount;
        localStorage.setItem(`step-number-${city.value.id}`, stepNumber.value);
    }

    function nextStep() {
        increaseStep(1);
    }

    function previousStep() {
        increaseStep(-1)
    }

    function restore() {
        const keyName = `step-number-${city.value.id}`;

        if (localStorage.getItem(keyName)) {
            stepNumber.value = parseInt(localStorage.getItem(keyName));
        }
    }

    const step = computed(() => city.value.steps[stepNumber.value]);

    return {cities, stepNumber, step, city, selectCity, restore, hasCity, increaseStep, nextStep, previousStep}
})
