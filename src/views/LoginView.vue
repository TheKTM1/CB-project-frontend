<template>
    <div class="d-flex justify-content-center mt-5">
        <div class="rounded border p-4 bg-light">
            <form @submit.prevent="submit">
                <h3 class="h3 mb-3 fw-normal text-center">Zaloguj się</h3>

                <input v-model="username.name" type="text" class="form-control" placeholder="Nazwa" required>
                <button class="btn btn-primary w-100 py-2" @click="verify">Weryfikuj</button>
                
                <input v-model="data.password" type="password" class="form-control mt-1 rounded" placeholder="Hasło" required>

                <button class="btn btn-primary w-100 py-2" type="submit">Zaloguj</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup () {
    const username = reactive({
        name: '',
    })

    const data = reactive({
        name: username.name,
        password: '',
        roleId: '',
    })

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
            console.log("error tba");
        }

        console.log(response.json());
    }

    const submit = async () => {
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
                console.log(`Value: ${store.getters.getUserRole}`);
                await router.push('/dashboard');
            } catch(e) {
                console.error('whoops');
            }
        }
    }

    return {
        data,
        username,
        submit,
        verify,
    }
  }
}
</script>
