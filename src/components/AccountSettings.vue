<template>
    <main>

        <h1 class="mb-3 fw-normal text-center">Ustawienia</h1>
        <div v-if="!isLoggedIn">Zaloguj się, aby mieć dostęp do zawartości.</div>
        <div v-else>
            <button class="btn btn-primary w-100 py-2" v-if="!clicked" @click="showPasswordChange">Zmień hasło</button>
            <div v-else>
                <form @submit.prevent="submit">
                    <h3>Zmiana hasła</h3>
                    <label>Stare hasło:</label><input v-model="data.oldPassword" type="password"/>
                    <br/><label>Nowe hasło:</label><input v-model="data.newPassword" type="password"/>
                    <button class="btn btn-primary w-100 py-2" type="submit">Zatwierdź</button>
                </form>
            </div>
        </div>

    </main>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: {
        isLoggedIn: Boolean,
        userName: String,
        userRestrictions: Boolean,
    },
    setup(props: any){

        const message = ref('You are not logged in.');
        const clicked = ref(false);
        const router = useRouter();
        const data = reactive({
            userName: props.userName,
            newPassword: '',
            oldPassword: '',
            userRestrictions: props.userRestrictions,
        });

        function showPasswordChange(){
            clicked.value = !clicked.value;
        }

        const submit = async () => {
            const improperPassword = /(.).*\1/.test(data.newPassword);

            if(!improperPassword || (improperPassword && (data.userRestrictions == 0))){
                const response = await fetch('http://localhost:7070/api/change-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })

                if (!response.ok) {
                    console.error('Nie udało się zmienić hasła.')
                } else {
                    alert("Hasło zmienione!");
                    window.location.reload();
                }
            } else {
                alert("Hasło dla tego konta nie może mieć powtarzających się znaków.");
            }
        }

        return {
            message,
            clicked,
            isLoggedIn: props.isLoggedIn,
            data,
            showPasswordChange,
            submit,
        }
    }
}
</script>