<template>
  <div 
    @click="handleSelect"
    :class="{ 'bg-cyan-500 bg-opacity-75' : currentIndex === index }"
    class="py-2 px-4 hover:bg-cyan-500 transition-all duration-200 ease-out cursor-pointer grid grid-cols-2 hover:bg-opacity-75"
  >
    <span class="text-white tracking-wide text-lg">{{ item.title }}</span>
    <span class="text-white tracking-wide text-lg">{{ item.artist }}</span>
  </div>
</template>

<script>
import { inject } from 'vue';
import { useSelect } from '@/helpers/hooks';

export default {
  props: {
    item: Object,
    index: Number
  },
  setup(props) {
    const index = inject('index');
    const { play, audioRef } = inject('audio');

    function handleSelect() {
      useSelect(index, props.index, () => {
        audioRef.value.currentTime = 0;
        play();
      });
    }

    return {
      handleSelect,
      currentIndex: index
    };
  },
}
</script>