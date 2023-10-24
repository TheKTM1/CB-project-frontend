<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="rounded border p-4 bg-light">
      <h3 class="h3 fw-normal text-center">
      {{ message }}
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const message = ref('You are not logged in.');
    const store = useStore();

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:7070/api/user', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();

        if ( response.status == 200 ) {

          message.value = `Welcome, ${content.name}! Your role is: ${content.roleId}.`;

          await store.dispatch('setAuth', true);
          
        }
      } catch (e) {

        await store.dispatch('setAuth', false);

      }
    });

    return {
      message
    }
  }
}
</script>
