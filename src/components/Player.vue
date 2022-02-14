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
      <h3 class="text-white text-lg">{{ index + 1 }} of {{ data.length }}</h3>
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
import { computed, provide, ref, unref } from 'vue';
import Tracks from './Tracks.vue';
import ProgressBar from './ProgressBar.vue';
import Controls from './Controls.vue';
import ToolTip from './ToolTip.vue';
import { useAudio, usePlayer, useHandleNext, useShuffle } from '@/helpers/composables';

export default {
  components: {
    Tracks,
    ProgressBar,
    Controls,
    ToolTip
  },
  setup() {
    const index = ref(0);
  
    let data =  ref([
      {
        title: "The Lost Chord",
        artist: "Arthur Sullivan",
        source: "/tracks/1 Sullivan The Lost Chord, Seated one day at the organ.mp3",
        image: "/images/151196.jpg"
      },
      {
        title: "Death and the Maiden",
        artist: "Franz Schubert",
        source: "/tracks/3 Schubert String Quartet No 14 in D minor Death and the Maiden, D810 - Movement 3 Scherzo Allegro molto.mp3",
        image: "/images/166010.jpg"
      },
      {
        title: "Vaet Videns Dominus",
        artist: "Jacobus Vaet",
        source: "/tracks/1 Vaet Videns Dominus.mp3",
        image: "/images/166013.jpg"
      },
      {
        title: "The Lay of the Last Minstrel",
        artist: "Hamish MacCun",
        source: "/tracks/18 MacCunn The Lay of the Last Minstrel - Part 2 Final chorus O Caledonia! stern and wild.mp3",
        image: "/images/166017.jpg"
      },
      {
        title: "Un poco andante",
        artist: "Muzio Clementi",
        source: "/tracks/14 Clementi Piano Sonata in D major, Op 25 No 6 - Movement 2 Un poco andante.mp3",
        image: "/images/166020.jpg"
      },
      {
        title: "We Confidently Go To Victory",
        artist: "Alex MakeMusic",
        source: "tracks/we-confidently-go-to-victory-12006.mp3",
        image: "/images/166017.jpg"
      },
      {
        title: "Out of Time",
        artist: "ZakharValaha",
        source: "tracks/out-of-time-15474.mp3",
        image: "/images/166017.jpg"
      },
      {
        title: "Single Moment",
        artist: "RomanBelov",
        source: "tracks/single-moment-15284.mp3",
        image: "/images/166017.jpg"
      },
      {
        title: "Sacred Garden",
        artist: "GuilhermeBernardes",
        source: "tracks/sacred-garden-10377.mp3",
        image: "/images/166017.jpg"
      },
      {
        title: "Knights of Camelot",
        artist: "TommyMutiu",
        source: "tracks/knights-of-camelot-8038.mp3",
        image: "/images/166017.jpg"
      }
    ]);

    const dataCopy = ref([...data.value]);

    const player = usePlayer();
    const audio = useAudio({
      autoplay: true,
      shuffled: true,
      repeatable: true,
      shuffleAction: (value) => {
        if(value) {
          data.value = useShuffle(data.value);
        } else {
          data.value = [...dataCopy.value];
        }
      },
      next: ({ play, isRepeating }) => useHandleNext(index, data, () => {
        play();
      }, isRepeating)
    });

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