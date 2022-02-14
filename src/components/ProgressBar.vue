<template>
  <div
    @mouseover="handleMouseOver"
    @mousemove="handleMouseMove"
    @mouseout="handleMouseOut"
    class="relative"
  >
    <div class="absolute text-white transform top-full left-0 mt-2 tracking-widest bg-slate-900 bg-opacity-75 rounded-lg px-2 leading-none pt-0.5">{{ currentTimeToReadable }}</div>
    <div class="w-full h-4 bg-slate-900 bg-opacity-75 cursor-pointer rounded-lg relative shadow border border-slate-500 border-opacity-50" @click="handleSeek">
      <slot :mousePosition="mousePosition" :mouseOver="mouseOver" :activeTime="activeTime" />
      <div class="h-full absolute bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all ease-out duration-200 rounded-lg" :style="{ width: `${progress}%` }"></div>
    </div>
    <div class="absolute text-white transform top-full right-0 mt-2 tracking-widest bg-slate-900 bg-opacity-75 rounded-lg px-2 leading-none pt-0.5">{{ remainingTimeToReadable }}</div>
  </div>
</template>

<script>
import { inject, computed, ref } from 'vue';
import { useSecondsToTime, useActiveSeek, usePassiveSeek } from '@/helpers/composables';

export default {
  setup() {
    const { playerRef } = inject('player');
    const { duration, progress, currentTime, remainingTime, play, setCurrentTime } = inject('audio');

    const mousePosition = ref(0);
    const mouseOver = ref(false);
    const activeTime = ref('');

    const currentTimeToReadable = computed(() => useSecondsToTime(currentTime.value));
    const remainingTimeToReadable = computed(() => useSecondsToTime(remainingTime.value));
    const offset = computed(() => playerRef.value.offsetLeft * 0.5);

    function handleSeek(e) {
      const { time } = usePassiveSeek(e, offset.value, duration.value);
      setCurrentTime(time);
      play();
    }

    const handleMouseOver = (e) => mouseUpdate(e);

    const handleMouseMove = (e) => mouseUpdate(e);

    function handleMouseOut() {
      mouseOver.value = false;
    }

    function mouseUpdate(e) {
      const { position, percent } = useActiveSeek(e, offset.value);

      if (percent >= 0 && percent <= 100) {
        mouseOver.value = true;
        mousePosition.value = percent;
        activeTime.value = useSecondsToTime(position * duration.value);
      }
    }

    return {
      handleSeek,
      progress,
      currentTime,
      remainingTime,
      currentTimeToReadable,
      remainingTimeToReadable,
      handleMouseOver,
      handleMouseMove,
      handleMouseOut,
      mousePosition,
      mouseOver,
      activeTime
    };
  },
}
</script>