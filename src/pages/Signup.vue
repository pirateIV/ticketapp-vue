<template>
  <FormWrapper pageType="signup">
    <form class="mt-4 space-y-6" @submit="handleSubmit">
      <FormField
        type="text"
        name="username"
        label="Username"
        placeholder="Choose a username"
        autocomplete="username"
        :fieldProps="getFieldProps('username')"
      />

      <FormField
        type="email"
        name="email"
        label="Email address"
        placeholder="Enter your email"
        autocomplete="email"
        :fieldProps="getFieldProps('email')"
      />

      <FormField
        type="password"
        name="password"
        label="Password"
        placeholder="Create a strong password"
        autocomplete="new-password"
        :fieldProps="getFieldProps('password')"
      />

      <FormSubmit>Create your account</FormSubmit>

      <FormLink type="login" />
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
const { signup } = useSession()

const signupSchema = {
  username: [validationRules.required, validationRules.minLength(3)],
  email: [validationRules.required, validationRules.email],
  password: [
    validationRules.required,
    validationRules.minLength(6),
    validationRules.maxLength(30),
    validationRules.password,
  ],
}

const { formData, getFieldProps, validateForm } = useForm(signupSchema, {
  username: '',
  email: '',
  password: '',
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  const validation = validateForm()

  if (validation.isValid) {
    const { success, message } = await signup(formData.value)

    if (success) {
      router.push('/auth/login')
    } else {
      console.log(message)
    }
  }
}
</script>
