<template>
  <div>
    <h1>Admin Dashboard</h1>
    <ul>
      <li v-for="file in files" :key="file._path">
        <button @click="editPage(file._path)">{{ file._path }}</button>
      </li>
    </ul>
  </div>
</template>
<script setup>
  const { data: files } = await useAsyncData(() => queryContent().only(['_path']).find())

  // Navigate to editor when clicking on a file
  const router = useRouter()
  const editPage = (path) => {
    router.push(`/admin/editor?file=${path.replace('/content/', '')}`)
  }
</script>
