<template>
  <q-tab-pane class="flex flex-center row" name="security">

    <div class="col-5 q-pt-md q-body-1">{{ $t('settings.security.changePassword') }}</div>
    <div class="col-6 q-pt-md">
      <q-btn
        color="primary"
        icon-right="send"
        :label="$t('button.send')"
        @click="sendPasswordRecoveryEmail"
      />
    </div>

    <div class="col-5 q-pt-md q-body-1">{{ $t('settings.security.revokeSessions') }}</div>
    <div class="col-6 q-pt-md">
      <q-btn
        color="primary"
        :label="$q.i18n.label.reset"
        @click="revokeSessions"
      />
    </div>

  </q-tab-pane>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SecurityTab',
  methods: {
    sendPasswordRecoveryEmail () {
      this.$q.loading.show()
      this.$axios.fetchPublicApi({
        url: '/public/v1/users/send-password-recovery',
        method: 'POST',
        data: this.getUser().email
      }).then(r => {
        if (r.status === 200) {
          this.$q.dialog({
            title: this.$t('dialog.success'),
            message: this.$t('label.passwordRecovered.success'),
            color: 'positive',
            ok: true,
            preventClose: true
          })
        } else {
          console.error(r)
        }
        this.$q.loading.hide()
      }).catch(e => {
        this.$q.notify({
          message: this.$t('notify.negative.custom', {error: e.status})
        })
        this.$q.loading.hide()
      })
    },

    revokeSessions () {
      this.$q.dialog({
        title: this.$t('dialog.info'),
        message: this.$t('label.revokeSessions.success'),
        color: 'info',
        ok: true,
        cancel: true
      }).then(r => {
        this.$q.loading.show()
        this.$axios.fetchApi({
          url: '/v1/users/me/revoke-sessions',
          method: 'POST'
        }).then(r => {
          if (r.status === 200) {
            this.doLogout(true)
          } else {
            console.error(r)
          }
          this.$q.loading.hide()
        }).catch(e => {
          this.$q.notify({
            message: this.$t('notify.negative.custom', {error: e.status})
          })
          this.$q.loading.hide()
        })
      })
    },

    ...mapGetters('account', ['getUser']),
    ...mapActions('account', ['doLogout'])
  }
}
</script>

<style scoped>

</style>
