<template>

    <h3>Edycja użytkownika</h3>

    <form @submit.prevent="submit">

        <label>Nazwa</label>
        <input type="text" v-model="user.name"/>

        <label>Rola</label>
        <input type="number" v-model="user.roleId"/>

        <label>Czas wygaśnięcia hasła</label>
        <input type="datetime-local" v-model="user.passwordExpiration"/>

        <label>Ograniczenia hasła</label>
        <input type="checkbox" v-model="user.passwordRestrictionsEnabled"/>

        <label>Zablokowany</label>
        <input type="checkbox" v-model="user.isBlocked"/>

        <button type="submit">Zaktualizuj</button>

    </form>

</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    props: {
        currentUser: Object,
    },
    setup(props: any){

        const user = ref(props.currentUser);

        const submit = async () => {
            const response = await fetch('http://localhost:7070/api/update-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user.value)
            })

            if (!response.ok) {
                console.error('Nie udało się zaktualizować konta użytkownika.')
            } else {
                alert("Zaktualizowano!");
                window.location.reload();
            }
        }

        return {
            user,
            submit,
        }
    },
}
</script>