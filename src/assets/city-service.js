import axios from 'axios';

export async function fetchQuests() {
    return await axios.get('https://data.arendz.nl/items/quest')
        .then((r) => r.data)
        .catch((e) => {
            console.error(e);
            throw new Error("Could not fetch quests");
        });
}

export async function fetchQuest(id) {
    return await axios.get(`https://data.arendz.nl/items/quest/${id}?fields=*,steps.*,steps.item.*.*`)
        .then((r) => r.data)
        .catch((e) => {
            console.error(e);
            throw new Error("Could not fetch quest");
        })
}

export async function fetchIntro() {
    return await axios.get(`https://data.arendz.nl/items/intro/?fields=*,steps.*,steps.item.*.*`)
        .then((r) => r.data)
        .catch((e) => {
            console.error(e);
            throw new Error("Could not fetch intro");
        })
}
