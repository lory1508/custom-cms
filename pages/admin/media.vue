<template>
  <div class="flex flex-col items-center h-full mx-auto">
    <n-upload
      multiple
      directory-dnd
      :max="5"
      :custom-request="handleCustomRequest"
      accept="image/*, video/*"
      class="w-full"
    >
      <n-upload-dragger class="bg-indigo-300 bg-opacity-25 border-2 rounded-lg hover:border-indigo-500 hover:border-2">
        <div class="flex items-center justify-center w-full mb-3">
          <Icon icon="solar:archive-down-bold-duotone" width="64" class="text-opacity-70 text-amber-500" />
        </div>
        <n-text class="text-base text-white"> Clicca per caricare i file </n-text>
        <n-p depth="3" class="mt-2 text-white"> È vietato caricare file sensibili! </n-p>
      </n-upload-dragger>
    </n-upload>
  </div>
</template>

<script setup>
  import { NUpload, NUploadDragger, NText, NP } from 'naive-ui'
  import { Icon } from '@iconify/vue'
  import { saveMediaToGitHub } from '~/utils/index.js'
  const handleCustomRequest = async ({ file, onSuccess, onError }) => {
    try {
      // Convert file to base64
      const fileContent = await readFileAsBase64(file)

      // Set the file path where it will be stored in the 'public' folder
      const filePath = `public/media/${file.name}`

      // Set commit message
      const message = `Upload file: ${file.name}`

      // Commit the file to GitHub
      const response = await saveMediaToGitHub(filePath, fileContent, message)

      if (response.success) {
        onSuccess(response)
      } else {
        onError(new Error('Failed to upload to GitHub'))
      }
    } catch (error) {
      onError(error)
    }
  }

  // Function to read file as base64
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]) // Extract base64 part
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
</script>
