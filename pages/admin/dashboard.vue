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
  import { checkUserSessionValid } from '~/utils'

  const router = useRouter()
  const userCookie = useCookie('user')
  console.log(userCookie.value)
  if (!userCookie.value) router.push('/admin/login')
  const { data: files } = await useAsyncData(() => queryContent().only(['_path']).find())

  // Navigate to editor when clicking on a file
  const editPage = (path) => {
    router.push(`/admin/editor?file=${path.replace('/content/', '')}`)
  }

  onMounted(() => {
    checkUserSessionValid()
  })
</script>
