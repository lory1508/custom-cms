<template>
  <div>
    <ContentRenderer v-if="home" :value="home" />
    <div v-else>Home not found</div>
    <div class="flex flex-row px-4 gap-4">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/blog/random-post">RandomPost</NuxtLink>
      <NuxtLink to="/admin">Dashboard</NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute()
  console.log(route)
  const path = ref(route.path)
  const home = ref('')

  onUpdated(async () => {
    const { data } = await useFetch(() => queryCollection('content').path(path.value).first())
    home.value = data
    console.log(home.value)
    useSeoMeta({
      title: home.value?.title,
      description: home.value?.description,
    })
  })
</script>
