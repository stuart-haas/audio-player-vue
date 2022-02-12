<template>
  <div class="relative">
    <div class="absolute text-white transform top-full left-2 mt-2 tracking-widest">{{ currentTimeToReadable }}</div>
    <div class="w-full h-4 bg-slate-500 bg-opacity-50 cursor-pointer rounded-lg relative overflow-hidden shadow border border-slate-300 border-opacity-50" @click="handleSeek">
      <div class="h-full absolute bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all ease-out duration-200" :style="{ width: `${progress}%` }"></div>
    </div>
    <div class="absolute text-white transform top-full right-2 mt-2 tracking-widest">{{ remainingTimeToReadable }}</div>
  </div>
</template>

<script>
import { inject, computed } from 'vue';
import { useSecondsToTime } from '@/helpers/hooks';

export default {
  setup() {
    const player = inject('player');
    const { audioRef, duration, progress, currentTime, remainingTime, play } = inject('audio');

    function handleSeek(e) {
      const target = e.currentTarget;
      const position = (e.pageX - target.offsetLeft - player.value.offsetLeft / 2) / target.offsetWidth;

      audioRef.value.currentTime = position * duration.value;
      play();
    }

    const currentTimeToReadable = computed(() => useSecondsToTime(currentTime.value));
    const remainingTimeToReadable = computed(() => useSecondsToTime(remainingTime.value));

    return {
      handleSeek,
      progress,
      currentTime,
      remainingTime,
      currentTimeToReadable,
      remainingTimeToReadable
    };
  },
}
</script>