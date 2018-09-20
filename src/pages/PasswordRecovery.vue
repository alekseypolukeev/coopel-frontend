<template>
  <q-page class="flex flex-center">
    <user-settings
      v-bind="{}"
      v-on:update:user="recoverPassword($event)"
      :fields="['email']"
      :buttonLabel="$q.i18n.label.ok"
    >
      <template slot="caption">
        <h4>{{ $t('caption.passwordRecovery') }}</h4>
      </template>
      <template slot="footer">
        <div class="q-body-1 q-py-md">
          {{ $t('label.newAccount.question') }}
          <router-link to="/join">{{ $t('label.newAccount.link') }}</router-link>
        </div>
      </template>
    </user-settings>
  </q-page>
</template>

<script>
import UserSettings from '../components/UserSettings'

export default {
  name: 'PasswordRecovery',
  components: {UserSettings},
  methods: {
    recoverPassword (userModel) {
      this.$q.loading.show()
      this.$axios.fetchPublicApi({
        url: '/public/v1/users/send-password-recovery',
        method: 'POST',
        data: userModel.email
      }).then(r => {
        if (r.status === 200) {
          this.$q.dialog({
            title: this.$t('dialog.success'),
            message: this.$t('label.passwordRecovered.success'),
            color: 'positive',
            ok: true,
            preventClose: true
          }).then(r => {
            this.$router.push('/login')
          })
        } else {
          console.error(r)
        }
        this.$q.loading.hide()
      }).catch(e => {
        if (e.status === 400) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('notify.negative.userNotFound')
          })
        } else {
          this.$q.notify({
            message: this.$t('notify.negative.custom', {error: e.status})
          })
        }
        this.$q.loading.hide()
      })
    }
  }
}
</script>

<style scoped>

</style>
