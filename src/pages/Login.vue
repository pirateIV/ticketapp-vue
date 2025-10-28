<template>
  <FormWrapper pageType="login">
    <form class="mt-4 space-y-6" @submit="handleSubmit">
      <FormField
        type="email"
        name="email"
        label="Email"
        placeholder="johndoe@gmail.com"
        autocomplete="email"
        :fieldProps="getFieldProps('email')"
      />

      <FormField
        type="password"
        name="password"
        label="Password"
        autocomplete="current-password"
        placeholder="password"
        :fieldProps="getFieldProps('password')"
      />

      <FormSubmit>Login</FormSubmit>

      <FormLink type="signup" />
    </form>
  </FormWrapper>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSession } from '../composables/useSession'
import { useForm } from '../composables/useForm'
import { validationRules } from '../utils/validation-rules'
import FormWrapper from '../components/Form/FormWrapper.vue'
import FormField from '../components/Form/FormField.vue'
import FormSubmit from '../components/Form/FormSubmit.vue'
import FormLink from '../components/Form/FormLink.vue'

const router = useRouter()
const { login, setUser } = useSession()

const loginSchema = {
  email: [validationRules.email, validationRules.required],
  password: [
    validationRules.password,
    validationRules.required,
    validationRules.minLength(6),
    validationRules.maxLength(30),
  ],
}

const { formData, getFieldProps, validateForm } = useForm(loginSchema, {
  email: '',
  password: '',
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  const validation = validateForm()

  if (validation.isValid) {
    const { success, user, message } = await login(formData.value)

    if (success) {
      setUser(user)
      router.push('/dashboard')
    } else {
      console.log(message)
    }
  }
}
</script>
