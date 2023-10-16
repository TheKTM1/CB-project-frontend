<template>
  <div v-if="!clicked">
      <button @click="showUserList">Zarządzanie użytkownikami</button>
      <a href="/dashboard">
          <button>Powrót do panelu użytkownika</button>
      </a>
  </div>
  <div v-else>
      <UserList/>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import UserList from '../components/UserList.vue'

export default {

components: {
  UserList,
},

setup() {
  const store = useStore();
  const clicked = ref(false);

  onMounted(async () => {
      try {
          const response = await fetch('http://localhost:7070/api/user', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
          });

          if ( response.status == 200 ) {

          await store.dispatch('setAuth', true);
          
          }
      } catch (e) {

          await store.dispatch('setAuth', false);

      }
  });

  function showUserList() {
      clicked.value = !clicked.value;
  }

  return {
      clicked,
      showUserList,
  }
}
}
</script>
