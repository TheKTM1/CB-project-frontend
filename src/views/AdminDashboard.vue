<template>
     <div class="d-flex justify-content-center mt-5">
        <div class="rounded border p-4 bg-light">
            <div v-if="!clicked">
                <h4 class="h4 mb-3 text-center mb-4">Panel administratora</h4>
                <button class="btn btn-primary w-100 py-2" @click="showUserList">Zarządzanie użytkownikami</button>
                <a href="/dashboard">
                    <button class="btn btn-primary w-100 py-2 mt-2">Powrót do panelu użytkownika</button>
                </a>
            </div>
            <div v-else>
                <UserList/>
            </div>
        </div>
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
