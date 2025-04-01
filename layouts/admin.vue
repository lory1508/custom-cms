<template>
  <div class="flex flex-row h-screen text-white bg-gradient-to-br from-indigo-950 to-indigo-500">
    <div class="w-1/6 p-2 bg-indigo-300 border-r border-white backdrop-blur-3xl bg-opacity-5 border-opacity-10">
      <div class="flex flex-col h-full">
        <!-- <NuxtLink class="mb-4 text-lg font-semibold" to="/admin/dashboard">Dashboard</NuxtLink> -->

        <div class="flex flex-col justify-between h-full">
          <div class="flex flex-col gap-2">
            <NuxtLink
              class="flex flex-row items-center gap-2"
              to="/admin/dashboard"
              :class="{
                'text-amber-400 transition-all duration-300': path == '/admin/dashboard',
              }"
            >
              <Icon icon="solar:laptop-bold-duotone" width="32" />
              <span>Dashboard</span>
            </NuxtLink>
            <NuxtLink
              class="flex flex-row items-center gap-2"
              to="/admin/pages"
              :class="{
                'text-amber-400 transition-all duration-300': path == '/admin/pages',
              }"
            >
              <Icon icon="solar:document-text-bold-duotone" width="32" />
              <span>Pagine</span>
            </NuxtLink>
            <NuxtLink
              class="flex flex-row items-center gap-2"
              to="/admin/media"
              :class="{
                'text-amber-400 transition-all duration-300': path == '/admin/media',
              }"
            >
              <Icon icon="solar:wallpaper-line-duotone" width="32" />
              <span>Media</span>
            </NuxtLink>
            <NuxtLink
              class="flex flex-row items-center gap-2"
              to="/admin/users"
              :class="{
                'text-amber-400 transition-all duration-300': path == '/admin/users',
              }"
            >
              <Icon icon="solar:users-group-two-rounded-bold-duotone" width="32" />
              <span>Utenti</span>
            </NuxtLink>
          </div>
          <div>
            <NuxtLink
              class="flex flex-row items-center gap-2"
              to="/admin/settings"
              :class="{
                'text-amber-400 transition-all duration-300': path == '/admin/settings',
              }"
            >
              <Icon icon="solar:settings-bold-duotone" width="32" />
              <span>Impostazioni</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="w-5/6 p-2">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'

  const route = useRoute()
  const path = computed(() => route.path)
</script>
