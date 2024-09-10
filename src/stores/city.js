import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {cities as jsonCities} from "@/assets/cities.js";

export const useCityStore = defineStore('city', () => {
    const cities = ref([])
    const city = ref(null)
    const stepNumber = ref(0)

    function setCities(data) {
        cities.value = data;
    }

    function setCity(data) {
        city.value = data;
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

    return {setCities, cities, stepNumber, step, city, setCity, restore, hasCity, increaseStep, nextStep, previousStep}
})
