<template>
  <div class="flex flex-col items-center h-full mx-auto">
    <n-upload multiple directory-dnd action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="5" class="w-full">
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
</script>
