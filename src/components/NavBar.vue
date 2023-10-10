<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand" href="#">Home</router-link>
            <div v-if="!auth">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link active" aria-current="page" href="#">Register</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link active" aria-current="page" href="#">Login</router-link>
                    </li>
                </ul>
            </div>
            <div v-if="auth">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link active" aria-current="page" href="#" @click="logout">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { watch, ref } from 'vue';
import { useStore } from 'vuex';


export default {
  setup() {
    const store = useStore();

    const auth = ref(store.state.authenticated);

    watch(() => store.state.authenticated, (newValue) => {
      auth.value = newValue;
    });

    const logout = async () => {
        await fetch('http://localhost:7070/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
    }

    return {
        auth,
        logout
    }
  }
}
</script>
