<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="false"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          v-if="isAuthenticated()"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon v-if="leftDrawerOpen" name="keyboard_arrow_left" />
          <q-icon v-else name="menu" />
        </q-btn>

        <q-toolbar-title>
          Coopel
          <!--<div slot="subtitle">v{{ $q.version}}</div>-->
        </q-toolbar-title>

        <!--<q-search inverted v-model="search" color="none" />-->

      </q-toolbar>
    </q-layout-header>

    <drawer v-model="leftDrawerOpen"></drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Drawer from './Drawer'

export default {
  name: 'MyLayout',
  components: { Drawer },
  data () {
    return {
      shouldBeOpened: false,
      leftDrawerOpen: false
    }
  },
  watch: {
    shouldBeOpened: {
      handler () {
        this.leftDrawerOpen = this.shouldBeOpened && this.authenticated
      }
    },
    authenticated (newVal, oldVal) {
      this.leftDrawerOpen = this.shouldBeOpened && newVal
    }
  },
  computed: {
    authenticated () {
      return this.isAuthenticated()
    }
  },
  methods: {
    ...mapGetters('account', ['isAuthenticated'])
  },
  mounted () {
    this.shouldBeOpened = this.$q.platform.is.desktop
  }
}
</script>

<style>
</style>
