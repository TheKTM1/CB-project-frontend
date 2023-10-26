<template>

    <h3 class="h3 mb-3 text-center mb-4">Edycja użytkownika</h3>

    <form class="d-flex flex-column" @submit.prevent="submit">

        <label class="fw-bold">Nazwa</label>
        <input style="width: 400px;" type="text" v-model="user.name"/>

        <label class="fw-bold mt-2">Rola</label>
        <input style="width: 400px;" type="number" v-model="user.roleId"/>

        <label class="fw-bold mt-2">Czas wygaśnięcia hasła</label>
        <input style="width: 400px;" type="datetime-local" v-model="user.passwordExpiration"/>

        <div class="mt-2">
            <label class="fw-bold me-2">Ograniczenia hasła</label>
            <input type="checkbox" v-model="user.passwordRestrictionsEnabled"/>
        </div>

        <div class="mt-2">
            <label class="fw-bold me-2">Zablokowany</label>
            <input type="checkbox" v-model="user.isBlocked"/>
        </div>

        <button class="btn btn-primary w-100 py-2 mt-3" type="submit">Zaktualizuj</button>

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