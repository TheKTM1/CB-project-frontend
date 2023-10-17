<template>
    <form @submit.prevent="submit">
        <h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>

        <input v-model="data.name" type="text" class="form-control" placeholder="Name" required>
        <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>

        <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    </form>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup () {
    const data = reactive({
        name: '',
        password: '',
        roleId: '',
    })

    const router = useRouter();
    const store = useStore();

    const submit = async () => {
        const response = await fetch('http://localhost:7070/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            console.error('Failed to login.');

            if(response.status == 403)
                alert("To konto zostało zablokowane.");
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
        submit,
    }
  }
}
</script>
