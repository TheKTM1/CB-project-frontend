<template>

    <h3 class="h3 mb-3 text-center mb-4">Dodawanie użytkownika</h3>

    <form class="d-flex flex-column" @submit.prevent="">

        <label class="fw-bold mt-2">Nazwa</label>
        <input style="width: 400px;" type="text"/>

        <button class="btn btn-primary w-100 py-2 mt-3" type="submit">Dodaj użytkownika</button>

    </form>

</template>

<script lang="ts">

export default {
    setup(){
        return {
            
        }
    },
}
</script>