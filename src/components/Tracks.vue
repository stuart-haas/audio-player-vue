<template>
  <div class="grid grid-cols-3 px-4 py-2">
    <span class="text-white text-lg">Title</span>
    <span class="text-white text-lg">Artist</span>
  </div>
  <div class="mb-8 bg-slate-900 rounded-lg shadow bg-opacity-75 border border-slate-500 border-opacity-50">
    <Track v-for="(item, index) in data" :key="index" :item="item" :index="index" />
  </div>
</template>

<script>
import { inject } from 'vue';
import Track from './Track.vue';

export default {
  components: {
    Track
  },
  setup() {
    const data = inject('data');
    
    return {
      data
    };
  },
}
</script>