<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
  const route = useRoute()
  const layout = route?.path.split('/')[1] == 'admin' ? 'admin' : 'default'
</script>
