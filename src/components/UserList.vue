<template>
    <main>

        <div v-if="displayedDiv == 0">
            <h3>Zarządzanie użytkownikami</h3>

            <table style="width:100%">
                <tr style="border-bottom: 1px solid black;">
                    <td> ID </td>
                    <td> Nazwa </td>
                    <td> Rola </td>
                    <td> Wygasanie hasła </td>
                    <td> Musi zmienić hasło </td>
                    <td> Włączone ograniczenia hasła </td>
                    <td> Zablokowany </td>
                    <td colspan="2"> Akcje </td>
                </tr>
                <tr v-for="(user, key) in userData" :key="key" style="border-bottom: 1px solid black;">
                    <td> {{ user.id }} </td>
                    <td> {{ user.name }} </td>
                    <td> {{ user.roleId }} </td>
                    <td> {{ user.passwordExpiration }} </td>
                    <td> {{ user.mustChangePassword }} </td>
                    <td> {{ user.passwordRestrictionsEnabled }} </td>
                    <td> {{ user.isBlocked }} </td>
                    <td><button @click="editOn(key)"> Edytuj </button></td>
                    <td><button @click="deleteOn(key)"> Skasuj </button></td>
                </tr>
            </table>

            <button @click="addUser"> Dodaj użytkownika </button>
        </div>
        <div v-if="displayedDiv == 1">
            <UserEdit :currentUser="currentUser"/>
        </div>
        <div v-if="displayedDiv == 2">
            <UserDelete :currentUser="currentUser"/>
        </div>
        <div v-if="displayedDiv == 3">
            <UserAdd/>
        </div>

    </main>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import UserEdit from '@/components/UserEdit.vue';
import UserDelete from '@/components/UserDelete.vue';
import UserAdd from '@/components/UserAdd.vue';

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

    components: {
        UserEdit,
        UserDelete,
        UserAdd,
    },

    setup(){

        const userData = ref<User[]>([]);
        const displayedDiv = ref(0);
        const currentUser = ref<User>();

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

        function editOn(key: number){
            currentUser.value = userData.value[key];
            displayedDiv.value = 1;
        }

        function deleteOn(key: number){
            currentUser.value = userData.value[key];
            displayedDiv.value = 2;
        }

        function addUser(){
            displayedDiv.value = 3;
        }

        return {
            userData,
            displayedDiv,
            currentUser,
            editOn,
            deleteOn,
            addUser,
        }
    }
}
</script>