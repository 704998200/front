<template>
  <div class="q-pa-md">
    <q-btn color="primary" label="NEW"/>
    <q-space/>
  </div>
  <q-separator></q-separator>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered separator padding
            class="rounded-borders" style="max-width: 100%">
      <q-item v-for="link in links1" :key="link.text">
        <q-item-section avatar>
          <q-avatar icon="folder" color="primary" text-color="white" q/>
        </q-item-section>

        <q-item-section v-ripple clickable>
          <q-item-label>{{ link.text }}</q-item-label>
          <q-item-label caption>{{ link.createtime }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" color=""/>
        </q-item-section>
        <q-btn color="primary" label="Delte"/>
        <q-separator></q-separator>
      </q-item>

    </q-list>
  </div>
</template>
<script>
export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: false,
      search: '',
      links1: [
        {icon: 'home', text: 'Home'},
        {icon: 'whatshot', text: 'Trending'},
        {icon: 'subscriptions', text: 'Subscriptions'}
      ],
    }
  },
}
</script>
