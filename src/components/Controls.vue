<template>
  <div class="relative top-8 w-full flex justify-center">
    <div class="space-x-8 text-xl bg-slate-900 bg-opacity-75 px-4 py-2 rounded-lg flex justify-between items-center shadow border border-slate-500 border-opacity-50">
      <button @click="handleShuffle" class="button" :class="{ 'active' : isShuffled }"><i class="fa fa-random" /></button>
      <button @click="handleRepeat" class="button" :class="{ 'active' : isRepeating }"><i class="fa fa-sync" /></button>
      <button @click="handlePrevious" class="button"><i class="fa fa-backward" /></button>
      <button v-if="isPlaying" @click="pause" class="button"><i class="fa fa-pause" /></button>
      <button v-else @click="play" class="button"><i class="fa fa-play" /></button>
      <button @click="handleNext" class="button"><i class="fa fa-forward" /></button>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import { useHandleNext, useHandlePrevious } from '@/helpers/composables';

export default {
  setup() {
    const { play, pause, isPlaying, repeat, isRepeating, shuffle, isShuffled } = inject('audio');
    const index = inject('index');
    const data = inject('data');

    function handleNext() {
      useHandleNext(index, data, () => {
        play();
      }, isRepeating);
    }

    function handlePrevious() {
      useHandlePrevious(index, data, () => {
        play();
      }, isRepeating);
    }

    function handleRepeat() {
      repeat(!isRepeating.value);
    }

    function handleShuffle() {
      shuffle(!isShuffled.value);
    }

    return {
      play,
      pause,
      isPlaying,
      handleNext,
      handlePrevious,
      handleRepeat,
      handleShuffle,
      isRepeating,
      isShuffled,
    };
  },
}
</script>

<style lang="postcss" scoped>
.button {
  @apply text-white hover:text-cyan-500 transition-all duration-200 ease-out bg-opacity-75;
}
.button.active {
  @apply text-cyan-500;
}
.button i {
  @apply align-middle;
}
</style>