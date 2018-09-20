<template>
  <q-page class="flex flex-center">
    <user-settings
      v-bind="{}"
      v-on:update:user="setPassword($event)"
      :fields="['password']"
      :buttonLabel="$q.i18n.label.set"
    >
      <template slot="caption">
        <h4>{{ $t('caption.passwordRecovery') }}</h4>
      </template>
    </user-settings>
  </q-page>
</template>

<script>
import UserSettings from '../components/UserSettings'
import {mapActions} from 'vuex'

export default {
  name: 'SetPassword',
  components: {UserSettings},
  methods: {
    setPassword (user) {
      const token = this.$route.query.token
      if (token) {
        this.$q.loading.show()
        this.$axios.fetch({
          url: '/v1/users/me/set-password',
          method: 'POST',
          headers: {
            authorization: 'bearer ' + token
          },
          data: user.password
        }).then(r => {
          if (r.status === 200) {
            this.$q.dialog({
              title: this.$t('dialog.success'),
              message: this.$t('label.passwordSet.success'),
              color: 'positive',
              ok: true,
              preventClose: true
            }).then(r => {
              this.doLogout(false)
              this.$router.push('/login')
            })
          } else {
            console.error(r)
          }
          this.$q.loading.hide()
        }).catch(e => {
          if (e.status === 401) {
            this.$q.dialog({
              title: this.$t('dialog.warning'),
              message: this.$t('label.passwordSet.expired'),
              color: 'warning',
              ok: true,
              preventClose: true
            }).then(r => {
              this.$router.push('/password-recovery')
            })
          } else {
            this.$q.notify({
              message: this.$t('notify.negative.custom', {error: e.status})
            })
          }
          this.$q.loading.hide()
        })
      }
    },
    ...mapActions('account', ['doLogout'])
  }
}
</script>

<style scoped>

</style>
