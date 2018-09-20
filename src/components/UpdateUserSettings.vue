<template>
  <div class="flex flex-center">
    <user-settings
      v-bind="getUser()"
      v-on:update:user="updateUser($event)"
      :fields="['email', 'phone', 'firstName', 'middleName', 'lastName']"
      :buttonLabel="$q.i18n.label.update"
    />
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import UserSettings from './UserSettings'

export default {
  name: 'UpdateUserSettings',
  components: {UserSettings},
  methods: {
    updateUser (userModel) {
      this.$q.loading.show()
      const user = this.getUser()
      this.$axios.fetchApi({
        url: '/v1/users/' + user.id,
        method: 'PUT',
        data: {
          id: user.id,
          version: user.version,
          email: userModel.email,
          phone: userModel.phone,
          firstName: userModel.firstName,
          middleName: userModel.middleName,
          lastName: userModel.lastName,
          authorities: user.authorities
        }
      }).then(r => {
        if (r.status === 200) {
          this.setUser(r.data)
          this.$q.notify({
            type: 'positive',
            message: this.$t('notify.positive.updated')
          })
        } else {
          console.error(r)
        }
        this.$q.loading.hide()
      }).catch(e => {
        if (e.status === 400 && e.data.errorCode && e.data.errorCode === 'uk-constraint: email') {
          // TODO handle phone and others
          this.$q.notify({
            type: 'warning',
            message: this.$t('notify.negative.emailDuplicate')
          })
        } else {
          // ToDo handle user update if optimistic lock occurred
          this.$q.notify({
            message: this.$t('notify.negative.custom', {error: e.status})
          })
        }
        this.$q.loading.hide()
      })
    },
    ...mapGetters('account', ['getUser', 'hasUserRole', 'hasCooperativeRole']),
    ...mapMutations('account', ['setUser'])
  }
}
</script>

<style scoped>

</style>
