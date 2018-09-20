<template>
    <div>
      <h6>Welcome {{ text }}</h6>
      <button v-on:click="test()">Get</button>
      <router-link to="/login"><img alt="Quasar logo" src="~assets/quasar-logo-full.svg"></router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserHome',
  data () {
    return {
      error: false
    }
  },
  computed: {
    text () {
      if (this.error) {
        return 'failed'
      } else {
        return this.isNeedUserStepper()
      }
    }
  },
  methods: {
    test () {
      this.$axios.fetchApi({
        url: '/v1/users/me'
      }).then(r => {
        this.error = false
      }).catch(reason => {
        this.error = true
      })
    },
    ...mapGetters('account', ['isNeedUserStepper'])
  }
}
</script>

<style scoped>

</style>
