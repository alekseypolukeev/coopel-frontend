<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$q.notify.setDefaults({
      type: 'negative',
      position: 'top',
      timeout: 3000,
      actions: [{ icon: 'close' }]
    })
  }
}
</script>

<style>
</style>
