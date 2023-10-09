<template>
    <form @submit.prevent="submit">
        <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

        <div class="form-floating">
            <input v-model="data.name" type="text" class="form-control" placeholder="Name">
        </div>
        <div class="form-floating">
            <input v-model="data.password" type="password" class="form-control" placeholder="Password">
        </div>

        <button class="btn btn-primary w-100 py-2" type="submit">Submit</button>
        <p class="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
    </form>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const data = reactive({
      name: '',
      password: ''
    })

    const router = useRouter()

    const submit = async () => {
      const response = await fetch('http://localhost:7070/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        console.error('Failed to register.')
      } else {
        await router.push('/login')
      }
    }

    return {
      data,
      submit
    }
  }
}
</script>
