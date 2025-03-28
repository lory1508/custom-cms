<template>
  <div class="flex flex-col gap-12">
    <div>
      <h1>Welcome {{ user.name }}</h1>
      <button @click="logout">Logout</button>
    </div>
    <div class="font-semibold">DASHBOARD</div>
    <input type="text" v-model="pageTitle" />
    <input type="text" v-model="pageContent" />
    <button @click="createPage">CREATE PAGE</button>
  </div>
</template>

<script setup>
  import { saveToGitHub } from '~/utils'
  definePageMeta({
    middleware: ['authenticated'],
  })

  const { user, clear: clearSession } = useUserSession()

  async function logout() {
    await clearSession()
    await navigateTo('/login')
  }
  const pageTitle = ref('')
  const pageContent = ref('')
  const createPage = async () => {
    const pageData = {
      title: pageTitle.value,
      content: pageContent.value,
    }

    // Here you will implement the logic to save the new page as a Markdown file
    const fileName = `content/${pageTitle.value.toLowerCase().replace(/\s+/g, '-')}.md`

    const markdownContent = `# ${pageData.title}\n\n${pageData.content}`

    // Save the Markdown file to your repository or a remote file system here
    console.log('Saving page:', fileName, markdownContent)
    await saveToGitHub(fileName, markdownContent)

    // After saving, reset the form fields
    pageTitle.value = ''
    pageContent.value = ''
  }
</script>
