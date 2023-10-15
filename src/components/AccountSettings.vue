<template>
    <main>

        <h1>Ustawienia</h1>
        <div v-if="!isLoggedIn">Zaloguj się, aby mieć dostęp do zawartości.</div>
        <div v-else>
            <button v-if="!clicked" @click="showPasswordChange">Zmień hasło</button>
            <div v-else>
                <form @submit.prevent="submit">
                    <h3>Zmiana hasła</h3>
                    <label>Nowe hasło:</label><input v-model="data.newPassword" type="password"/>
                    <label>Stare hasło dla potwierdzenia:</label><input v-model="data.oldPassword" type="password"/>
                    <button type="submit">Zatwierdź</button>
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
    },
    setup(props: any){

        const message = ref('You are not logged in.');
        const clicked = ref(false);
        const router = useRouter();
        const data = reactive({
            userName: props.userName,
            newPassword: '',
            oldPassword: '',
        });

        function showPasswordChange(){
            clicked.value = !clicked.value;
        }

        const submit = async () => {
            const response = await fetch('http://localhost:7070/api/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                console.error('Nie udało się zmienić hasła.')
            } else {
                await router.push('/login')
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