<template>
  <div class="column">
    <h4>{{ $t('caption.userConfirmationStepper') }}</h4>

    <q-stepper
      v-model="currentStep"
      ref="stepper"
      color="primary"
      alternative-labels
    >
      <q-step
        name="clarify"
        :title="$t('confirmationStepper.clarify.title')"
        icon="settings"
        :disable="hasUserRole()"
      >
        <update-user-settings/>

        <q-stepper-navigation>
          <q-btn
            color="primary"
            @click="$refs.stepper.next()"
            :label="$t('button.next')"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        name="confirm"
        :title="$t('confirmationStepper.confirm.title')"
        icon="email"
        :error="emailConfirmation.error"
        :disable="hasUserRole()"
      >
        <div class="flex-center column">
          <div class="q-subheading q-pb-md">
            {{ $t('confirmationStepper.confirm.body1') }}
          </div>
          <div class="q-subheading q-pb-md">
            {{ $t('confirmationStepper.confirm.body2') }}
          </div>
          <q-btn
            color="primary"
            icon-right="send"
            :label="$t('button.send')"
            :disable="emailConfirmation.buttonDisabled"
            @click="sendConfirmationEmail"
          />
          <div class="q-body-1 q-pt-sm">
            {{emailConfirmation.timeoutLabel}}
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn
            color="primary"
            @click="$refs.stepper.previous()"
            :label="$t('button.previous')"
          />
          <q-btn
            color="primary"
            @click="checkEmailConfirmation()"
            :label="$t('button.next')"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        name="objects"
        :title="$t('confirmationStepper.objects.title')"
        icon="store_mall_directory"
        :disable="hasCooperativeRole()"
      >
        <div>TBD</div>

        <q-stepper-navigation>
          <q-btn
            color="primary"
            @click="$refs.stepper.previous()"
            :label="$t('button.previous')"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UpdateUserSettings from '../UpdateUserSettings'

export default {
  name: 'UserConfirmationStepper',
  components: {UpdateUserSettings},
  data () {
    return {
      currentStep: this.hasUserRole() ? 'objects' : 'clarify',
      emailConfirmation: {
        error: false,
        buttonDisabled: false,
        timeoutLabel: ''
      }
    }
  },
  methods: {
    checkEmailConfirmation () {
      this.$q.loading.show()

      const accessToken = this.getAccessToken()
      const refreshToken = this.getRefreshToken()

      this.authenticate({accessToken, refreshToken}).then(r => {
        this.$q.loading.hide()
        if (this.hasUserRole()) {
          this.emailConfirmation.error = false
          this.$refs.stepper.next()
        } else {
          this.emailConfirmation.error = true
        }
      })
    },
    sendConfirmationEmail () {
      this.$q.loading.show()
      this.$axios.fetchApi({
        url: '/v1/users/' + this.getUser().id + '/send-email-confirmation',
        method: 'POST'
      }).then(response => {
        if (response.status === 200) {
          this.emailConfirmation.buttonDisabled = true

          const start = Date.now()
          const timerId = setInterval(() => {
            const number = Date.now()
            const remaining = 5 * 60 - Math.ceil((number - start) / 1000)
            console.log(remaining)
            this.emailConfirmation.timeoutLabel = 'Повторная отправка возможна через.. ' + remaining + ' с'
          }, 1000)

          setTimeout(() => {
            clearInterval(timerId)
            this.emailConfirmation.timeoutLabel = ''
            this.emailConfirmation.buttonDisabled = false
          }, 5 * 60 * 1000)
        } else {
          console.error(response)
        }
        this.$q.loading.hide()
      }).catch(err => {
        this.$q.loading.hide()
        this.$q.notify({
          message: this.$t('notify.negative.custom', {error: err.status})
        })
      })
    },
    ...mapGetters('account', ['getUser', 'hasUserRole', 'hasCooperativeRole', 'getAccessToken', 'getRefreshToken']),
    ...mapActions('account', ['authenticate'])
  }
}
</script>

<style scoped>

</style>
