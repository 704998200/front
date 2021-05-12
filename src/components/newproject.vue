<template>

  <div class="q-pa-md">
    <q-btn
      @click="showdialog"
      color="primary"
      label="NEW"
    />
  </div>


</template>

<script>
import {useQuasar} from 'quasar'
import newprojectA from "./newprojectA";

export default {
  name: "Newproject",
  data() {
    const $q = useQuasar()
    return {
      $q
    }
  },
  methods: {
    showdialog() {
      $q.dialog({
        component: newprojectA,
        componentProps: {}
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }
  }
}
</script>
