<template>
  <div
    class="flex flex-col items-center justify-center w-screen h-screen gap-4 bg-gradient-to-br from-zinc-500 to-zinc-200"
  >
    <div class="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-lg h-fit w-fit">
      <n-form ref="formRef" :label-width="80" :model="formValue">
        <n-form-item label="Username" path="user.username">
          <n-input v-model:value="formValue.username" />
        </n-form-item>
        <n-form-item label="Password" path="user.password">
          <n-input v-model:value="formValue.password" type="password" show-password-on="click" />
        </n-form-item>
        <n-form-item>
          <n-button class="w-full" type="primary" @click="login"> Login </n-button>
        </n-form-item>
      </n-form>
      <n-alert v-if="failedAuth" title="Autenticazione fallita" type="error"> Controllare username e password </n-alert>
    </div>
  </div>
</template>

<script setup>
  import { NForm, NAlert, NFormItem, NInput, NButton } from 'naive-ui'

  import users from '~/private/users.json'
  import bcrypt from 'bcryptjs'

  const userCookie = useCookie('user')
  const router = useRouter()

  const failedAuth = ref(false)
  const formRef = ref(null)
  const formValue = ref({
    username: '',
    password: '',
  })

  const login = () => {
    const user = users.find((u) => u.username === formValue.value.username)
    if (!user || !bcrypt.compareSync(formValue.value.password, user.password)) {
      failedAuth.value = true
      return
    }

    userCookie.value = {
      ...user,
      expiration: 7,
      lastLogin: new Date().toISOString(),
    }
    failedAuth.value = false
    router.push('/admin/dashboard')
  }
</script>
