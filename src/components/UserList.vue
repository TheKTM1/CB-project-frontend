<template>
    <main>

        <h3>Zarządzanie użytkownikami</h3>

        <table style="width:100%">
            <tr>
                <td> ID </td>
                <td> Nazwa </td>
                <td> Rola </td>
                <td> Wygasanie hasła </td>
                <td> Musi zmienić hasło </td>
                <td> Włączone ograniczenia hasła </td>
                <td> Zablokowany </td>
                <td colspan="2"> Akcje </td>
            </tr>
            <tr v-for="user in userData" :key="user.id">
                <td> {{ user.id }} </td>
                <td> {{ user.name }} </td>
                <td> {{ user.roleId }} </td>
                <td> {{ user.passwordExpiration }} </td>
                <td> {{ user.mustChangePassword }} </td>
                <td> {{ user.passwordRestrictionsEnabled }} </td>
                <td> {{ user.isBlocked }} </td>
                <td> Edytuj </td>
                <td> Skasuj </td>
            </tr>
        </table>

    </main>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface User {
    id: number,
    name: string,
    roleId: number,
    passwordExpiration: number,
    mustChangePassword: boolean,
    passwordRestrictionsEnabled: boolean,
    isBlocked: boolean,
}

export default {
    setup(){

        const userData = ref<User[]>([]);

        onMounted(async () => {
        try {
            const response = await fetch('http://localhost:7070/api/users', {
            headers: {'Content-Type': 'application/json'},
            // credentials: 'include'
            });

            const content = await response.json();

            if ( response.status == 200 ) {

                userData.value = content;
            }
        } catch (e) {
            console.error(e);
        }
    });

        return {
            userData,
        }
    }
}
</script>