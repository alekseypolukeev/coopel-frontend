<template>
  <q-page class="flex flex-center">
    <user-settings
      v-bind="{}"
      v-on:update:user="createUser($event)"
      :fields="['email', 'firstName', 'lastName', 'password']"
      :buttonLabel="$q.i18n.label.create"
    >
      <template slot="caption">
        <h4>{{ $t('caption.join') }}</h4>
      </template>
      <template slot="footer">
        <div class="q-body-1 q-py-md">
          {{ $t('label.haveAccount.question') }}
          <router-link to="/login">{{ $t('label.haveAccount.link') }}</router-link>
        </div>
      </template>
    </user-settings>
  </q-page>
</template>

<script>
import UserSettings from '../components/UserSettings'

export default {
  name: 'Join',
  components: {UserSettings},
  methods: {
    createUser (user) {
      this.$q.loading.show()
      this.$axios.fetchPublicApi({
        url: '/public/v1/users',
        method: 'POST',
        data: {
          email: user.email,
          lastName: user.lastName,
          firstName: user.firstName,
          password: user.password
        }
      }).then(r => {
        if (r.status === 200) {
          this.$q.dialog({
            title: this.$t('dialog.success'),
            message: this.$t('label.joined.success'),
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
        if (e.status === 400 && e.data.errorCode && e.data.errorCode === 'uk-constraint: email') {
          this.$q.notify({
            type: 'warning',
            message: this.$t('notify.negative.emailDuplicate')
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
