<template>
    <div v-if="!clicked">
        <div>{{ message }}</div>
        <button @click="showSettings">Ustawienia konta</button>
        <a v-if="userRole == 1" href="/admin/dashboard">
            <button>Panel administratora</button>
        </a>
    </div>
    <div v-else>
        <AccountSettings :isLoggedIn="isLoggedIn" :userName="userName" :userRestrictions="userRestrictions"/>
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
    const userRole = ref(0);
    const userRestrictions = ref(false);

    onMounted(async () => {
        try {
            const response = await fetch('http://localhost:7070/api/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
            });

            const content = await response.json();

            if ( response.status == 200 ) {

            isLoggedIn.value = true;
            userName.value = content.name;
            userRole.value = content.roleId;
            userRestrictions.value = content.passwordRestrictionsEnabled;

            if(content.mustChangePassword == true){
                message.value = `Witaj, ${content.name}. W celu dalszego korzystania z tej strony musisz zmienić hasło.`;
            } else {
                message.value = `Witaj, ${content.name}!`;
            }

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
        userRole,
        userRestrictions,
        showSettings,
    }
}
}
</script>
  