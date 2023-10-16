<template>

    <h3>Usuwanie użytkownika</h3>

    <div>

        {{ user }}

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

        return {
            user,
        }
    },
}
</script>