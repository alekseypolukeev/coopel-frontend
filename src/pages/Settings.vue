<template>
  <q-page>
    <q-tabs :inverted="true" :two-lines="true" :no-pane-border="true">

      <q-route-tab
        to="/settings"
        slot="title"
        name="account"
        icon="perm_identity"
        :label="$t('settings.common.title')"
      />
      <q-route-tab
        to="/settings?tab=security"
        slot="title"
        name="security"
        icon="vpn_key"
        :label="$t('settings.security.title')"
      />
      <q-route-tab
        to="/settings?tab=objects"
        count="6"
        slot="title"
        name="objects"
        icon="store_mall_directory"
        :label="$t('settings.objects.title')"
      />

      <account-tab/>
      <security-tab/>
      <objects-tab/>

    </q-tabs>
  </q-page>
</template>

<script>
import AccountTab from '../components/settings/AccountTab'
import SecurityTab from '../components/settings/SecurityTab'
import ObjectsTab from '../components/settings/ObjectsTab'

import { mapGetters } from 'vuex'

export default {
  name: 'Settings',
  components: {AccountTab, SecurityTab, ObjectsTab},
  methods: {
    ...mapGetters('account', ['isNeedConfirmationStepper'])
  }
}
</script>

<style scoped>

</style>
