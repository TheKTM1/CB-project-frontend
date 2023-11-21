<template>
    <div class="d-flex justify-content-center mt-5">
        <div class="rounded border p-4 bg-light">
            <div v-if="!verified">
                <form @submit.prevent="verify">
                    <h3 class="h3 mb-3 fw-normal text-center">Zaloguj się</h3>

                    <input v-model="username.name" type="text" class="form-control" placeholder="Nazwa" required>
                    <button class="btn btn-primary w-100 py-2" type="submit">Weryfikuj</button>
                </form>
             </div>
            
            <div v-else>
                <form @submit.prevent="submit">
                    <p>{{ username.name }}</p>
                    <p>X = {{ oneTimePasswordX }}</p>
                    <input v-model="data.password" type="password" class="form-control mt-1 rounded" placeholder="Hasło" required>
                    <input v-model="data.oneTimePassword" type="text" class="form-control mt-1 rounded" placeholder="Hasło jednorazowe" required>

                    <button class="btn btn-primary w-100 py-2" type="submit">Zaloguj</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup () {
    const verified = ref(false);
    const oneTimePasswordX = ref("");

    const username = reactive({
        name: '',
    })

    const data = reactive({
        name: '',
        password: '',
        roleId: '',
        oneTimePassword: '',
        badLoginBlockExpirationTime: '',
    })

    let badLoginCount = ref(0);
    const router = useRouter();
    const store = useStore();

    const verify = async () => {
        const response = await fetch('http://localhost:7070/api/verify', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(username)
        })

        if (!response.ok) {
            console.log("Error");
        } else {
            verified.value = !verified.value;
            oneTimePasswordX.value = await response.json();
        }
    }

    const submit = async () => {
        data.name = username.name;
        console.log(`username: ${username.name}, data: ${data.name}`);
        
        const response = await fetch('http://localhost:7070/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(data)
        })
        if(badLoginCount.value < 3){
            const response = await fetch('http://localhost:7070/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                console.error('Failed to login.');

                if(response.status == 403) {
                    alert("To konto zostało zablokowane.");
                } else {
                    badLoginCount.value += 1;
                    alert("Login lub hasło jest niepoprawne.");
                }

            } else {
                const fetchh = await fetch('http://localhost:7070/api/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
                });
                try {
                    const userData = await fetchh.json();
                    await store.dispatch('setAuth', true);
                    await store.dispatch('setUserRole', userData.roleId);
                    await router.push('/dashboard');
                } catch(e) {
                    console.error('whoops');
                }
            }
        } else {
            const badLoginResponse = await fetch('http://localhost:7070/api/block-account', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(data)
            })

            if(!badLoginResponse.ok){
                console.error("Błąd z blokowaniem.");
            }

            alert("Przekroczono dozwoloną próbę logowań.");
        }
    }

    return {
        verified,
        oneTimePasswordX,
        data,
        username,
        submit,
        verify,
    }
  }
}
</script>
