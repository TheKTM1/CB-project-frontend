<template>

    <h3 class="h3 mb-3 text-center mb-4">Dodawanie użytkownika</h3>

    <form class="d-flex flex-column" @submit.prevent="submit">

        <label class="fw-bold mt-2">Nazwa</label>
        <input style="width: 400px;" type="text" v-model="user.name"/>

        <label class="fw-bold mt-2">Hasło</label>
        <input style="width: 400px;" type="password" v-model="user.password"/>

        <label class="fw-bold mt-2">Rola</label>
        <input style="width: 400px;" type="number" v-model="user.roleId"/>

        <label class="fw-bold mt-2">Czas wygaśnięcia hasła</label>
        <input style="width: 400px;" type="datetime-local" v-model="user.passwordExpiration"/>

        <div class="mt-2">
            <label class="fw-bold me-2">Powinien zmienić hasło</label>
            <input type="checkbox" v-model="user.passwordRestrictionsEnabled"/>
        </div>

        <div class="mt-2">
            <label class="fw-bold me-2">Ograniczenia hasła</label>
            <input type="checkbox" v-model="user.passwordRestrictionsEnabled"/>
        </div>

        <div class="mt-2">
            <label class="fw-bold me-2">Zablokowany</label>
            <input type="checkbox" v-model="user.isBlocked"/>
        </div>

        <label class="fw-bold mt-2">Czas wygaśnięcia sesji</label>
        <input style="width: 400px;" type="number" v-model="user.sessionTimeMinutes"/>

        <button class="btn btn-primary w-100 py-2 mt-3" type="submit">Dodaj użytkownika</button>

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
            isBlocked: false,
            badLoginBlockExpirationTime: null,
            sessionTimeMinutes: 15,
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