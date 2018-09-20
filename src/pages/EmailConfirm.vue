<template>
  <q-page class="flex flex-center">
  </q-page>
</template>

<script>
export default {
  name: 'EmailConfirm',
  created () {
    const token = this.$route.query.token
    if (token) {
      this.$q.loading.show()
      this.$axios.fetch({
        url: '/v1/users/me/confirm-email',
        method: 'POST',
        headers: {
          authorization: 'bearer ' + token
        }
      }).then(response => {
        if (response.status === 200) {
          this.$q.dialog({
            title: this.$t('dialog.success'),
            message: this.$t('label.emailConfirm.success'),
            color: 'positive',
            ok: true,
            preventClose: true
          }).then(r => {
            this.$router.push('/login')
          })
        } else {
          console.error(response)
        }
        this.$q.loading.hide()
      }).catch(err => {
        if (err.status === 401) {
          this.$q.dialog({
            title: this.$t('dialog.warning'),
            message: this.$t('label.emailConfirm.expired'),
            color: 'warning',
            ok: true,
            preventClose: true
          }).then(r => {
            this.$router.push('/')
          })
        } else {
          this.$q.notify({
            message: this.$t('notify.negative.custom', {error: err.status})
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
