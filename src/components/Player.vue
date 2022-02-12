<template>
  <audio 
    ref="audioRef"
    :src="currentTrack.source"
    :autoplay="isPlaying"
  >
  </audio>
  <div class="relative h-screen w-screen bg-no-repeat bg-center bg-cover" :style="{ backgroundImage: `url(${currentTrack.image})` }">
    <div class="absolute top-8 left-8 space-y-2">
      <h1 class="text-white text-4xl">{{ currentTrack.title }}</h1>
      <h2 class="text-white text-2xl">{{ currentTrack.artist }}</h2>
    </div>
    <div class="absolute bottom-1/4 w-1/2 left-1/2 transform -translate-x-1/2" ref="playerRef">
      <Tracks />
      <ProgressBar >
        <template #default="{ mousePosition, mouseOver, activeTime }">
          <ToolTip :position="mousePosition" :visible="mouseOver" :value="activeTime" />
        </template>
      </ProgressBar>
      <Controls />
    </div>
  </div>
</template>

<script>
import { computed, provide, ref } from 'vue';
import Tracks from './Tracks.vue';
import ProgressBar from './ProgressBar.vue';
import Controls from './Controls.vue';
import ToolTip from './ToolTip.vue';
import { useAudio, usePlayer, useHandleNext } from '@/helpers/composables';

export default {
  components: {
    Tracks,
    ProgressBar,
    Controls,
    ToolTip
  },
  setup() {
    const index = ref(0);
  
    const data =  ref([
      {
        title: "Norman",
        artist: "Steven Price",
        source: "/tracks/keys-of-moon-flowing-energy.mp3",
        image: "/images/151196.jpg"
      },
      {
        title: "Comsology",
        artist: "Stephen Barton",
        source: "/tracks/maxkomusic-dark-ages.mp3",
        image: "/images/166010.jpg"
      },
      {
        title: "Push Through",
        artist: "Phil Larson",
        source: "/tracks/keys-of-moon-flowing-energy.mp3",
        image: "/images/166013.jpg"
      },
      {
        title: "Battle Cry",
        artist: "Imagine Dragons",
        source: "/tracks/maxkomusic-dark-ages.mp3",
        image: "/images/166017.jpg"
      },
      {
        title: "So Say We All",
        artist: "Audiomachine",
        source: "/tracks/scott-buckley-clarion.mp3",
        image: "/images/166020.jpg"
      }
    ]);

    const player = usePlayer();
    const audio = useAudio({
      next: ({ play }) => useHandleNext(index, data, () => {
        play();
      }
    )});

    const { audioRef, isPlaying } = audio;
    const { playerRef } = player;

    const currentTrack = computed(() => data.value[index.value]);

    provide('player', player);
    provide('audio', audio);
    provide('index', index);
    provide('data', data);

    return {
      playerRef,
      audioRef,
      data,
      index,
      isPlaying,
      currentTrack
    };
  },
}
</script>