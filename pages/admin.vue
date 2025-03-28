<template>
  <div>Redirecting to Admin...</div>
</template>

<script setup>
  const router = useRouter()
  onMounted(() => {
    router.push('/admin/dashboard') // Redirect to the dashboard
  })
</script>
