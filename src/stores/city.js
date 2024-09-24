import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useCityStore = defineStore('city', () => {
    const cities = ref()
    const city = ref(null)
    const intro = ref(null)
    const stepNumber = ref(null)

    function setIntro(data) {
        intro.value = data;
    }

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

    function checkResumeStep() {
        // if (confirm('Wil je doorgaan waar je was gebleven')) {
            stepNumber.value = parseInt(localStorage.getItem(`step-number-${city.value.id}`));
        // } else {
        //     stepNumber.value = intro.value.steps.length * -1;
        //     localStorage.setItem(`step-number-${city.value.id}`, stepNumber.value);
        // }
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

    const step = computed(() => stepNumber.value >= 0
        ? city.value.steps[stepNumber.value]
        : intro.value ? intro.value.steps[stepNumber.value + intro.value.steps.length] : null);

    const passedIntro = computed(() => stepNumber.value >= 0);

    return {
        setCities,
        setIntro,
        cities,
        intro,
        passedIntro,
        stepNumber,
        step,
        city,
        setCity,
        restore,
        hasCity,
        checkResumeStep,
        increaseStep,
        nextStep,
        previousStep
    }
})
