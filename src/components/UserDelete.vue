<template>

    <h3>Usuwanie użytkownika</h3>

    <div>

        <p>Czy chcesz usunąć użytkownika {{ user.name }}?</p>
        <button class="btn btn-danger w-100 py-2" @click="dropUser">Tak</button>
        <button class="btn btn-secondary w-100 py-2 mt-2">Nie</button>

    </div>

</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    props: {
        currentUser: Object,
    },
    setup(props: any){

        const user = ref(props.currentUser);

        const dropUser = async () => {
            const response = await fetch('http://localhost:7070/api/drop-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user.value)
            })

            if (!response.ok) {
                console.error('Nie udało się usunąć konta użytkownika.')
            } else {
                alert("Użytkownik usunięty.");
                window.location.reload();
            }
        }

        return {
            user,
            dropUser,
        }
    },
}
</script>