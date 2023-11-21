<template>
    <main>

        <div v-if="displayedDiv == 0">
            <h3 class="h3 mb-3 text-center mb-4">Zarządzanie użytkownikami</h3>

            <table class="table table-striped" style="width:100%">
                <thead>
                    <tr>
                        <th scope="col"> ID </th>
                        <th scope="col"> Nazwa </th>
                        <th scope="col"> Rola </th>
                        <th scope="col"> Data wygaśnięcia hasła </th>
                        <th scope="col"> Musi zmienić hasło </th>
                        <th scope="col"> Włączone ograniczenia hasła </th>
                        <th scope="col"> Zablokowany </th>
                        <th scope="col" colspan="3"> Akcje </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, key) in userData" :key="key">
                        <th scope="row"> {{ user.id }} </th>
                        <td> {{ user.name }} </td>
                        <td> {{ user.roleId }} </td>
                        <td> {{ user.passwordExpiration.toLocaleDateString() }} </td>
                        <td> {{ user.mustChangePassword }} </td>
                        <td> {{ user.passwordRestrictionsEnabled }} </td>
                        <td> {{ user.isBlocked }} </td>
                        <td><button class="btn btn-primary w-100 p-1 m-0" @click="editOn(key)"> Edytuj </button></td>
                        <td><button class="btn btn-warning w-100 p-1 m-0" @click="logOn(key)"> Logi </button></td>
                        <td><button class="btn btn-danger w-100 p-1 m-0" @click="deleteOn(key)"> Skasuj </button></td>
                    </tr>
                </tbody>
            </table>

            <button class="btn btn-primary w-100 py-2" @click="addUser"> Dodaj użytkownika </button>
        </div>
        <div v-if="displayedDiv == 1">
            <UserEdit :currentUser="currentUser"/>
        </div>
        <div v-if="displayedDiv == 2">
            <UserLogs :currentUser="currentUser"/>
        </div>
        <div v-if="displayedDiv == 3">
            <UserDelete :currentUser="currentUser"/>
        </div>
        <div v-if="displayedDiv == 4">
            <UserAdd/>
        </div>

    </main>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import UserEdit from '@/components/UserEdit.vue';
import UserLogs from '@/components/UserLogs.vue';
import UserDelete from '@/components/UserDelete.vue';
import UserAdd from '@/components/UserAdd.vue';

interface User {
    id: number,
    name: string,
    roleId: number,
    passwordExpiration: Date,
    mustChangePassword: boolean,
    passwordRestrictionsEnabled: boolean,
    isBlocked: boolean,
    sessionTimeMinutes: number,
}

export default {

    components: {
        UserEdit,
        UserLogs,
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
                });

                const content = await response.json();

                if ( response.status == 200 ) {

                    userData.value = content.map((user: User) => ({
                        ...user,
                        passwordExpiration: new Date(user.passwordExpiration)
                    }));
                }
            } catch (e) {
                console.error(e);
            }
        });

        function editOn(key: number){
            currentUser.value = userData.value[key];
            displayedDiv.value = 1;
        }

        function logOn(key: number){
            currentUser.value = userData.value[key];
            displayedDiv.value = 2;
        }

        function deleteOn(key: number){
            currentUser.value = userData.value[key];
            displayedDiv.value = 3;
        }

        function addUser(){
            displayedDiv.value = 4;
        }

        return {
            userData,
            displayedDiv,
            currentUser,
            editOn,
            logOn,
            deleteOn,
            addUser,
        }
    }
}
</script>