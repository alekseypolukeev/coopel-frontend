<template>
  <q-layout-drawer
    v-model="open"
    :no-hide-on-route-change="this.$q.platform.is.desktop"
    :no-swipe-open="!isAuthenticated()"
    :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
  >
    <q-list
      no-border
      link
      inset-delimiter
    >
      <q-list-header>
        <q-icon class="q-pr-sm" name="account_circle" color="primary" size="24px"/>
        {{ getUserFullName() }}
      </q-list-header>

      <q-item @click.native="$router.push('/')">
        <q-item-side icon="home"/>
        <q-item-main :label="$t('label.home')"/>
      </q-item>

      <q-item @click.native="$router.push('/messages')">
        <q-item-side icon="message"/>
        <q-item-main :label="$t('label.messages')"/>
      </q-item>

      <q-item @click.native="$router.push('/settings')">
        <q-item-side icon="settings"/>
        <q-item-main :label="$t('label.settings')"/>
      </q-item>

      <q-item @click.native="logout">
        <q-item-side icon="exit_to_app" />
        <q-item-main :label="$t('label.logOut')"/>
      </q-item>
    </q-list>
  </q-layout-drawer>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Drawer',
  props: {
    value: Boolean
  },
  data () {
    return {
      open: this.value
    }
  },
  watch: {
    open: {
      handler () {
        this.$emit('input', this.open)
      }
    },
    value (newVal, oldVal) {
      this.open = newVal
    }
  },
  methods: {
    logout () {
      this.doLogout(false)
      this.$router.push('/login')
    },
    ...mapGetters('account', ['isAuthenticated', 'getUserFullName', 'isNeedConfirmationStepper']),
    ...mapActions('account', ['doLogout'])
  }
}
</script>

<style scoped>

</style>
