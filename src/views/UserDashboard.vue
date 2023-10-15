<template>
    <div v-if="!clicked">
        <button @click="showSettings">Ustawienia konta</button>
        <!-- {{ message }} -->
    </div>
    <div v-else>
        <AccountSettings :isLoggedIn="isLoggedIn" :userName="userName"/>
    </div>
</template>
  
<script lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import AccountSettings from '../components/AccountSettings.vue';

export default {

components: {
    AccountSettings,
},

setup() {
    const message = ref('You are not logged in.');
    const store = useStore();
    const clicked = ref(false);
    const isLoggedIn = ref(false);
    const userName = ref('');

    onMounted(async () => {
        try {
            const response = await fetch('http://localhost:7070/api/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
            });

            const content = await response.json();

            if ( response.status == 200 ) {

            message.value = `Welcome, ${content.name}! Your role is: ${content.roleId}.`;

            isLoggedIn.value = true;
            userName.value = content.name;

            await store.dispatch('setAuth', true);
            
            }
        } catch (e) {

            await store.dispatch('setAuth', false);

        }
    });

    function showSettings() {
        clicked.value = !clicked.value;
    }

    return {
        message,
        clicked,
        isLoggedIn,
        userName,
        showSettings,
    }
}
}
</script>
  