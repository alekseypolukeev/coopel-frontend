<template>
  <q-tab-pane name="account">
    <update-user-settings/>
  </q-tab-pane>
</template>

<script>
import UpdateUserSettings from '../UpdateUserSettings'

export default {
  name: 'AccountTab',
  components: {UpdateUserSettings}
}
</script>

<style scoped>

</style>
