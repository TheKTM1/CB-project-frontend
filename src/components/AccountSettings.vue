<template>
    <main>

        <h1 v-if="!clicked" class="mb-3 fw-normal text-center">Ustawienia</h1>
        <div v-if="!isLoggedIn">Zaloguj się, aby mieć dostęp do zawartości.</div>
        <div v-else>
            <button class="btn btn-primary w-100 py-2" v-if="!clicked" @click="showPasswordChange">Zmień hasło</button>
            <div v-else>
                <form class="d-flex flex-column" @submit.prevent="submit">
                    <h1 class="mb-5 fw-normal text-center">Zmiana hasła</h1>
                    <label class="fw-bold">Stare hasło:</label>
                    <input style="width: 400px;" v-model="data.oldPassword" type="password"/>
                    <label class="fw-bold">Nowe hasło:</label>
                    <input style="width: 400px;" v-model="data.newPassword" type="password"/>
                    <button class="btn btn-primary w-100 py-2 mt-3" type="submit">Zatwierdź</button>
                </form>
            </div>
        </div>

    </main>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
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

        let recaptchaInstance = useReCaptcha();

        function showPasswordChange(){
            clicked.value = !clicked.value;
        }

        const recaptcha = async () => {
            await recaptchaInstance?.recaptchaLoaded();
            const token = await recaptchaInstance?.executeRecaptcha('login');
            console.log(token);
            return token;
        }

        const submit = async () => {
            let token = await recaptcha();

            if (token && token.length > 0) {
                const reCaptchaResponse = await fetch('http://localhost:7070/api/verify-recaptcha', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: token }),
                });

                if (reCaptchaResponse) {
                    const isResponseVerified = await reCaptchaResponse.json();
                    
                    if (isResponseVerified) {
                        const improperPassword = /(.).*\1/.test(data.newPassword);

                        if (!improperPassword || (improperPassword && data.userRestrictions === 0)) {
                            const response = await fetch('http://localhost:7070/api/change-password', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data),
                            });

                            if (!response.ok) {
                                console.error('Nie udało się zmienić hasła.');
                            } else {
                                alert('Hasło zmienione!');
                                window.location.reload();
                            }
                        } else {
                            alert('Hasło dla tego konta nie może mieć powtarzających się znaków.');
                        }
                    } else {
                        console.error('ReCaptcha: nie uzyskano weryfikacji.');
                    }
                } else {
                    console.error('Error parsing ReCaptcha response.');
                }
            } else {
                console.error('Nie uzyskano tokenu ReCaptcha.');
            }
        }

        return {
            message,
            clicked,
            isLoggedIn: props.isLoggedIn,
            data,
            recaptcha,
            showPasswordChange,
            submit,
        }
    }
}
</script>