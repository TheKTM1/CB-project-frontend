<template>

    <h3 class="h3 mb-3 text-center mb-4">Logi użytkownika</h3>

    <table class="table table-striped" style="width:100%">
        <thead>
            <tr>
                <th scope="col"> Użytkownik </th>
                <th scope="col"> Data </th>
                <th scope="col"> Akcja </th>
                <th scope="col"> Status </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(log, key) in logs" :key="key">
                <td> {{ log.name }} </td>
                <td> {{ log.date }} </td>
                <td> {{ log.action }} </td>
                <td> {{ log.status }} </td>
            </tr>
        </tbody>
    </table>

</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

interface Log {
    name: string,
    date: string,
    action: string,
    status: string,
}

export default {
    props: {
        currentUser: Object,
    },
    setup(props: any){

        const user = ref(props.currentUser);
        let logs = ref<Log[]>([]);

        onMounted(async () => {
            try {
                const response = await fetch('http://localhost:7070/api/fetch-logs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user.value)
                });

                logs.value = await response.json();

                if (!response.ok) {
                    console.error('Nie udało się pobrać logów tego użytkownika.');
                }
            } catch (e) {
                console.error(e);
            }
        });

        return {
            user,
            logs,
        }
    },
}
</script>