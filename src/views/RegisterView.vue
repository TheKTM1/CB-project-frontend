<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="rounded border p-4 bg-light">
      <form @submit.prevent="submit">
          <h1 class="h3 mb-3 fw-normal text-center">Zarejestruj się</h1>

          <input v-model="data.name" type="text" class="form-control" placeholder="Nazwa" required>
          <input v-model="data.password" type="password" class="form-control mt-1 mb-1 rounded" placeholder="Hasło" required>
          <input v-model="repeatPassword" type="password" class="form-control mt-1 rounded" placeholder="Powtórz hasło" required>

          <button class="btn btn-primary w-100 py-2" type="submit">Zatwierdź</button>
        </form>
      </div>  
    </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const data = reactive({
      name: '',
      password: ''
    });
    const repeatPassword = ref('');

    const router = useRouter()

    const submit = async () => {
      const improperPassword = /(.).*\1/.test(data.password);
      
      if(!improperPassword && (data.password == repeatPassword.value)){
        const response = await fetch('http://localhost:7070/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          console.error('Failed to register.')
        } else {
          await router.push('/login')
        }
      } else if(!improperPassword && data.password != repeatPassword.value) {
        alert(`Pola "Hasło" i "Powtórz hasło" nie zgadzają się.`);
      } else {
        alert("Hasło nie może mieć powtarzających się znaków.");
      }
    }

    return {
      data,
      repeatPassword,
      submit
    }
  }
}
</script>
