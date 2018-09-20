<template>
  <div class="column">
    <slot name="caption"></slot>

    <q-field
      v-if="isFieldVisible('email')"
      class="q-pb-md"
      :error="$v.model.email.$error"
      :error-label="emailError"
      :count="63"
    >
      <q-input
        type="email"
        v-model.trim="model.email"
        :float-label="$t('label.input.email')"
        @blur="$v.model.email.$touch"
      />
    </q-field>

    <q-field
      v-if="isFieldVisible('phone')"
      class="q-pb-md"
      :error="$v.model.phone.$error"
      :error-label="phoneError"
      :count="15"
    >
      <q-input
        type="tel"
        v-model.trim="model.phone"
        :float-label="$t('label.input.phone')"
        @blur="$v.model.phone.$touch"
      />
    </q-field>

    <q-field
      v-if="isFieldVisible('lastName')"
      class="q-pb-md"
      :error="$v.model.lastName.$error"
      :error-label="lastNameError"
      :count="31"
    >
      <q-input
        type="text"
        v-model.trim="model.lastName"
        :float-label="$t('label.input.lastName')"
        @blur="$v.model.lastName.$touch"
      />
    </q-field>

    <q-field
      v-if="isFieldVisible('firstName')"
      class="q-pb-md"
      :error="$v.model.firstName.$error"
      :error-label="firstNameError"
      :count="31"
    >
      <q-input
        type="text"
        v-model.trim="model.firstName"
        :float-label="$t('label.input.firstName')"
        @blur="$v.model.firstName.$touch"
      />
    </q-field>

    <q-field
      v-if="isFieldVisible('middleName')"
      class="q-pb-md"
      :error="$v.model.middleName.$error"
      :error-label="middleNameError"
      :count="31"
    >
      <q-input
        type="text"
        v-model.trim="model.middleName"
        :float-label="$t('label.input.middleName')"
        @blur="$v.model.middleName.$touch"
      />
    </q-field>

    <q-field
      v-if="isFieldVisible('password')"
      class="q-pb-md"
      :error="$v.model.password.$error"
      :error-label="passwordError"
      :count="63"
    >
      <q-input
        type="password"
        v-model="model.password"
        :float-label="$t('label.input.password')"
        @blur="$v.model.password.$touch"
      />
    </q-field>

    <q-field
      v-if="isFieldVisible('password')"
      class="q-pb-md"
      :error="$v.model.passwordConfirm.$error"
      :error-label="passwordConfirmError"
      count
    >
      <q-input
        type="password"
        v-model="model.passwordConfirm"
        :float-label="$t('label.input.passwordConfirm')"
        @blur="$v.model.passwordConfirm.$touch"
      />
    </q-field>

    <q-btn
      color="primary"
      :label="buttonLabel"
      :disabled="!changed"
      @click="doAction"
    />

    <slot name="footer"></slot>
  </div>
</template>

<script>
import {email, maxLength, minLength, required, sameAs} from 'vuelidate/lib/validators'

const trimPhone = (phone) => {
  return phone ? phone.replace(/[^0-9]/g, '') : phone
}

export default {
  name: 'UserSettings',
  props: ['fields', 'buttonLabel', 'email', 'phone', 'firstName', 'middleName', 'lastName'],
  data () {
    return {
      changed: false,
      model: {
        email: this.email,
        phone: this.phone,
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        password: undefined,
        confirmPassword: undefined
      }
    }
  },
  watch: {
    model: {
      handler () {
        this.changed = true
      },
      deep: true
    },
    email (newVal, oldVal) {
      this.model.email = newVal
    },
    phone (newVal, oldVal) {
      this.model.phone = newVal
    },
    firstName (newVal, oldVal) {
      this.model.firstName = newVal
    },
    middleName (newVal, oldVal) {
      this.model.middleName = newVal
    },
    lastName (newVal, oldVal) {
      this.model.lastName = newVal
    }
  },
  validations () {
    const result = {model: {}}
    if (this.isFieldVisible('email')) {
      result.model.email = {
        required,
        maxLength: maxLength(63),
        email
      }
    }
    if (this.isFieldVisible('phone')) {
      result.model.phone = {
        // required,
        maxLength: maxLength(15),
        regexp: (value) => !value || /^7[0-9]{10}$/.test(trimPhone(value))
      }
    }
    if (this.isFieldVisible('lastName')) {
      result.model.lastName = {
        required,
        maxLength: maxLength(31)
      }
    }
    if (this.isFieldVisible('firstName')) {
      result.model.firstName = {
        required,
        maxLength: maxLength(31)
      }
    }
    if (this.isFieldVisible('middleName')) {
      result.model.middleName = {
        maxLength: maxLength(31)
      }
    }
    if (this.isFieldVisible('password')) {
      result.model.password = {
        required,
        maxLength: maxLength(63),
        minLength: minLength(8),
        regexp: (value) => !value || /^(?=.*[a-z])(?=.*[0-9])/i.test(value)
      }
      result.model.passwordConfirm = {
        required,
        sameAs: sameAs('password')
      }
    }
    return result
  },
  computed: {
    emailError () {
      if (!this.$v.model.email.required) {
        return this.$t('label.input.error.required')
      } else if (!this.$v.model.email.maxLength) {
        return this.$t('label.input.error.maxLength', {length: 63})
      }
      // email
      return this.$t('label.input.error.email')
    },
    phoneError () {
      // if (!this.$v.model.phone.required) {
      //   return this.$t('label.input.error.required')
      // } else
      if (!this.$v.model.phone.maxLength) {
        return this.$t('label.input.error.maxLength', {length: 15})
      }
      // regexp
      return this.$t('label.input.error.phone')
    },
    firstNameError () {
      if (!this.$v.model.firstName.required) {
        return this.$t('label.input.error.required')
      } else if (!this.$v.model.firstName.maxLength) {
        return this.$t('label.input.error.maxLength', {length: 31})
      }
      // ToDo check regexp
    },
    lastNameError () {
      if (!this.$v.model.lastName.required) {
        return this.$t('label.input.error.required')
      } else if (!this.$v.model.lastName.maxLength) {
        return this.$t('label.input.error.maxLength', {length: 31})
      }
      // ToDo check regexp
    },
    middleNameError () {
      if (!this.$v.model.middleName.maxLength) {
        return this.$t('label.input.error.maxLength', {length: 31})
      }
      // ToDo check regexp
    },
    passwordError () {
      if (!this.$v.model.password.required) {
        return this.$t('label.input.error.required')
      } else if (!this.$v.model.password.maxLength) {
        return this.$t('label.input.error.maxLength', {length: 63})
      } else if (!this.$v.model.password.minLength) {
        return this.$t('label.input.error.minLength', {length: 8})
      }
      // regexp
      return this.$t('label.input.error.password')
    },
    passwordConfirmError () {
      if (!this.$v.model.passwordConfirm.required) {
        return this.$t('label.input.error.required')
      }
      // sameAs
      return this.$t('label.input.error.passwordConfirm')
    }
  },
  methods: {
    isFieldVisible (field) {
      return this.fields.indexOf(field) > -1
    },
    doAction () {
      this.$v.model.$touch()
      if (!this.$v.model.$error) {
        // remove unnecessary symbols
        this.model.phone = trimPhone(this.model.phone)
        this.$emit('update:user', this.model)
      }
      this.changed = false
    }
  }
}
</script>

<style scoped>

</style>
