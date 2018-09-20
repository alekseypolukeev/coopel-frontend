<template>
  <q-page class="flex flex-center">
    <div class="column">
      <h4>{{ $t('caption.login') }}</h4>

      <q-field
        class="q-pb-md"
        count
        :error="$v.form.email.$error"
        :error-label="emailError"
      >
        <q-input
          type="email"
          v-model.trim="form.email"
          :float-label="$t('label.input.email')"
          @blur="$v.form.email.$touch"
          @keyup.enter="logIn"
        />
      </q-field>

      <q-field
        class="q-pb-md"
        :error="$v.form.password.$error"
        :error-label="passwordError"
      >
        <q-input
          type="password"
          v-model="form.password"
          :float-label="$t('label.input.password')"
          @keyup.enter="logIn"
        />
      </q-field>

      <div class="q-body-1 q-pb-md text-right">
        <router-link to="/password-recovery">{{ $t('label.passwordRecoveryLink') }}</router-link>
      </div>

      <q-btn
        color="primary"
        :label="$q.i18n.label.ok"
        @click="logIn"
      />

      <div class="q-body-1 q-py-md">
        {{ $t('label.newAccount.question') }}
        <router-link to="/join">{{ $t('label.newAccount.link') }}</router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  validations: {
    form: {
      email: {required, email},
      password: {required}
    }
  },
  computed: {
    emailError () {
      if (!this.$v.form.email.required) {
        return this.$t('label.input.error.required')
      }
      return this.$t('label.input.error.email')
    },
    passwordError () {
      return this.$t('label.input.error.required')
    }
  },
  methods: {
    logIn () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        const email = '@e:' + this.form.email
        const password = this.form.password

        this.$q.loading.show()
        this.$axios.authenticate(email, password).then(response => {
          this.authenticateResponse(response).then(result => {
            this.$q.loading.hide()
            const redirect = this.$route.query.redirect || '/'
            this.$router.replace(redirect)
          }).catch(e => {
            this.$q.notify({
              message: this.$t('notify.negative.custom', {error: e.status})
            })
            this.$q.loading.hide()
          })
        }).catch(err => {
          if (err.status === 400) {
            const data = err.data
            if (data.error && data.error === 'invalid_grant') {
              this.$q.notify({
                type: 'warning',
                message: this.$t('notify.negative.loginBadCredentials')
              })
            }
          } else {
            this.$q.notify({
              message: this.$t('notify.negative.custom', {error: err.status})
            })
          }
          this.$q.loading.hide()
        })
      }
    },
    ...mapActions('account', ['authenticate', 'authenticateResponse']),
    ...mapGetters('account', ['isAuthenticated'])
  },
  created () {
    if (this.isAuthenticated()) {
      this.$router.replace('/')
    } else {
      const refreshToken = this.$q.cookies.get('rt')
      if (refreshToken) {
        this.$q.loading.show()
        const redirect = this.$route.query.redirect || '/'
        const accessToken = this.$q.cookies.get('at') || 'expired-stub'
        this.authenticate({accessToken, refreshToken}).then(() => {
          this.$q.loading.hide()
          this.$router.replace(redirect)
        }).catch(() => {
          this.$q.loading.hide()
          console.info('Stored tokens are outdated')
        })
      }
    }
  }
}
</script>

<style>
</style>
