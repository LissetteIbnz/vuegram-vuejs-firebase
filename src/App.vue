<template>
  <div id="app">
    <Navigation v-if="currentUser"/>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navigation from '@/components/shared/Navigation';

export default {
  name: 'Navigation',
  components: { Navigation },
  computed: {
    ...mapState(['currentUser']),
  },
};
</script>
