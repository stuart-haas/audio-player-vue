<template>
  <div 
    @click="handleSelect"
    :class="{ 'active' : currentIndex === index }"
    class="track"
  >
    <span class="text-white tracking-wide text-lg">{{ item.title }}</span>
    <span class="text-white tracking-wide text-lg">{{ item.artist }}</span>
    <span class="space-x-4 justify-self-end">
      <button class="text-slate-100 hover:text-red-400 transition-all duration-200 ease-out"><i class="fa fa-heart" /></button>
      <button class="text-slate-100 hover:text-yellow-400 transition-all duration-200 ease-out"><i class="fa fa-plus" /></button>
    </span>
  </div>
</template>

<script>
import { inject } from 'vue';
import { useSelect } from '@/helpers/composables';

export default {
  props: {
    item: Object,
    index: Number
  },
  setup(props) {
    const index = inject('index');
    const { play, setCurrentTime } = inject('audio');

    function handleSelect() {
      useSelect(index, props.index, () => {
        setCurrentTime(0);
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

<style lang="postcss" scoped>
.track {
  @apply bg-transparent hover:bg-slate-500 hover:bg-opacity-50 transition-all duration-200 ease-in cursor-pointer py-2 px-4 grid grid-cols-3 items-center border border-transparent relative left-0 transform -translate-x-0 rounded-none w-full;
} 
.track.active {
  @apply bg-cyan-500 shadow-lg border-slate-500 border border-opacity-50 left-1/2 transform -translate-x-1/2 rounded-lg;
  width: 105%;
}
</style>