<template>
    <div class="d-flex justify-content-center mt-5">
        <div class="rounded border p-4 bg-light">
            <form @submit.prevent="submit">
                <h3 class="h3 mb-3 fw-normal text-center">Zaloguj się</h3>

                <input v-model="data.name" type="text" class="form-control" placeholder="Nazwa" required>
                <input v-model="data.password" type="password" class="form-control mt-1 rounded" placeholder="Hasło" required>

                <button class="btn btn-primary w-100 py-2" type="submit">Zaloguj</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup () {
    const data = reactive({
        name: '',
        password: '',
        roleId: '',
        badLoginBlockExpirationTime: '',
    })

    let badLoginCount = ref(0);
    const router = useRouter();
    const store = useStore();

    const submit = async () => {
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
        data,
        submit,
    }
  }
}
</script>
