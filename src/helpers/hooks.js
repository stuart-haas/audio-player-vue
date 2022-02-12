import { ref, onMounted, watch } from 'vue';

export const useAudio = (options) => {
  const audioRef = ref(null);
  const duration = ref(null);
  const progress = ref(0);
  const currentTime = ref(0);
  const remainingTime = ref(0);
  const isPlaying = ref(false);

  function play() {
    isPlaying.value = true;
  }

  function pause() {
    isPlaying.value = false;
  }

  watch(isPlaying, (value) => {
    if(value) {
      audioRef.value.play();
    } else {
      audioRef.value.pause();
    }
  });

  onMounted(() => {
    audioRef.value.addEventListener('loadedmetadata', () => {
      duration.value = audioRef.value.duration;
    });
    audioRef.value.addEventListener('timeupdate', () => {
      duration.value = audioRef.value.duration;

      currentTime.value = audioRef.value.currentTime;

      remainingTime.value = duration.value - currentTime.value;

      progress.value =  (currentTime.value / duration.value) * 100;
    });
    audioRef.value.addEventListener('ended', () => {
      options.next({ play });
    });
  });

  return { 
    audioRef,
    duration,
    progress,
    currentTime,
    remainingTime,
    play,
    pause,
    isPlaying
  }
};

export const useHandleNext = (index, data, done) => {
  if (index.value < data.value.length - 1) {
    index.value += 1;
    done();
  }
}

export const useHandlePrevious = (index, done) => {
  if(index.value > 0) {
    index.value -= 1;
    done();
  }
}

export const useSelect = (index, newIndex, done) => {
  index.value = newIndex;
  done();
}

export const useSecondsToTime = (value) => {
  let nValue = value;
  if(Number.isNaN(value)) nValue = 0;

  let seconds = Math.floor(nValue % 60);

  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  let minutes = Math.floor(nValue / 60);
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  
  return minutes + ':' + seconds;
}