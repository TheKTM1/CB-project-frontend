<template>
    {{ message }}
</template>
  
<script lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
setup() {
    let message = ref('You are not logged in.');
    const store = useStore();

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:7070/api/user', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();
        message.value = 'ah';
        if ( response.status == 200 && content.roleId === 1 ) {

          await store.dispatch('setAuth', true);
          message.value = 'Verified!'
          
        } else {
          await store.dispatch('setAuth', true);
          message.value = "huh?";
        }
      } catch (e) {

        await store.dispatch('setAuth', false);
        message.value = 'bruh';

      }
    });

    return {
        message
    }
}
}
</script>
