<template>

    <h3>Dodawanie użytkownika</h3>

    <form @submit.prevent="submit">

        <label>Nazwa</label>
        <input type="text" v-model="user.name"/>

        <label>Hasło</label>
        <input type="text" v-model="user.password"/>

        <label>Rola</label>
        <input type="number" v-model="user.roleId"/>

        <label>Czas wygaśnięcia hasła</label>
        <input type="datetime-local" v-model="user.passwordExpiration"/>

        <label>Powinien zmienić hasło</label>
        <input type="checkbox" v-model="user.passwordRestrictionsEnabled"/>

        <label>Ograniczenia hasła</label>
        <input type="checkbox" v-model="user.passwordRestrictionsEnabled"/>

        <label>Zablokowany</label>
        <input type="checkbox" v-model="user.isBlocked"/>

        <button type="submit">Dodaj użytkownika</button>

    </form>

</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    setup(){

        const user = ref({
            name: '',
            password: '',
            roleId: 2,
            passwordExpiration: new Date('2023-12-31'),
            mustChangePassword: true,
            passwordRestrictionsEnabled: true,
            isBlocked: false
        });

        const submit = async () => {
            const improperPassword = /(.).*\1/.test(user.value.password);

            if(!improperPassword){
                const response = await fetch('http://localhost:7070/api/add-account', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user.value)
                })

                if (!response.ok) {
                    console.error('Nie udało się dodać konta użytkownika.')
                } else {
                    alert("Dodano użytkownika!");
                    window.location.reload();
                }
            } else {
                alert("Hasło nie może mieć powtarzających się znaków.");
            }
        }

        return {
            user,
            submit,
        }
    },
}
</script>