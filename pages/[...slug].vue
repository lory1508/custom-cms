<template>
  <div>
    <div v-if="home">
      <ContentRenderer :value="home" />
    </div>
    <div v-else>Home not found</div>
    <div class="flex flex-row gap-4 px-4">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/blog/random-post">RandomPost</NuxtLink>
      <NuxtLink to="/admin/dashboard">Dashboard</NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute()

  const { data: home } = await useAsyncData(() => queryCollection('content').path(route.path).first())

  useSeoMeta({
    title: home.value?.title,
    description: home.value?.description,
  })
</script>
