<template>
    <form @submit.prevent="submit">
        <h1 class="h3 mb-3 fw-normal text-center">Please sign up</h1>

        <input v-model="data.name" type="text" class="form-control" placeholder="Name" required>
        <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>

        <button class="btn btn-primary w-100 py-2" type="submit">Submit</button>
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
