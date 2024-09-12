import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {
    authentication,
    createDirectus,
    createItem,
    readItem,
    readItems,
    readMe,
    registerUser,
    rest
} from "@directus/sdk";
import {LocalStorage} from "@/assets/local-storage-service.js";
import {useRouter} from "vue-router";
import axios from "axios";

const storage = new LocalStorage();
const client = createDirectus('https://data.arendz.nl')
    .with(rest())
    .with(authentication('json', {storage}));

export const useAuthStore = defineStore('auth', () => {
    const user = ref()
    const trips = ref()
    const isLoggedIn = ref(false);

    async function init() {
        if (storage.get() !== null) {
            console.log("Credentials found in storage")
            isLoggedIn.value = true;
        }

        if (!isLoggedIn.value) {
            return;
        }

        return await getUser()
            .then((u) => {
                getTrips();
            })
            .catch((e) => console.error(e));
    }

    async function login(email, password) {
        return await client.login(email, password)
            .then((r) => {
                isLoggedIn.value = true;
                return r;
            });
    }

    async function register(email, password, firstName, lastName) {
        return await client.request(registerUser(email, password, {first_name: firstName, last_name: lastName}))
            .then((r) => {
                return r;
            });
    }

    async function logout() {
        return await client.logout()
            .then(() => {
                storage.clear();
                isLoggedIn.value = false;
                user.value = {};
                trips.value = null;
            });
    }

    async function getUser() {
        if (!isLoggedIn.value) {
            return Promise.reject("User not logged in");
        }

        return await client.request(readMe())
            .then((r) => {
                user.value = r
                return r;
            })
            .catch((e) => {
                console.error(e);
                storage.clear();
                isLoggedIn.value = false;
                throw e;
            });
    }

    async function getTrips() {
        return client.request(readItems('trip', {
            fields: ['*', 'quest.*']
        }))
            .then((r) => {
                trips.value = r;
            })
            .catch((e) => {
                console.error(e);
            });
    }

    async function getTrip(id) {
        return client.request(readItem('trip', id, {
            fields: ['*', 'quest.*']
        }))
            .then((r) => {
                return r;
            })
            .catch((e) => {
                throw e;
            });
    }

    async function buyTrip(id, price) {
        return await axios.post('https://data.arendz.nl/flows/trigger/bda4a15a-e7d5-4745-b5e3-eb11884fd380', {}, {
            params: {
                "amount": Number.isInteger(price) ? `${price}.00` : price,
                "city": id,
                "redirect": "https://cityquest.arendz.nl/shop/return",
                "user": user.value.id
            }
        })
            .then((r) => r.data)
            .catch((e) => {
                console.error(e);
                throw e;
            })
    }

    return {user, trips, buyTrip, login, logout, register, getUser, getTrips, getTrip, init, isLoggedIn}
})
