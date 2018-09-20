<template>
  <q-page class="flex flex-center">
    <user-confirmation-stepper v-if="isNeedConfirmationStepper()"/>
    <user-home v-else/>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'
import UserHome from '../components/home/UserHome'
import UserConfirmationStepper from '../components/home/UserConfirmationStepper'

export default {
  name: 'PageIndex',
  components: {UserHome, UserConfirmationStepper},
  methods: {
    ...mapGetters('account', ['isNeedConfirmationStepper'])
  }
}
</script>
