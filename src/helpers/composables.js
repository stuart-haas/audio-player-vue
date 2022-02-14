import { ref, onMounted, watch, watchEffect } from 'vue';

export const usePlayer = () => {
  const playerRef = ref(null);

  return {
    playerRef
  };
}

export const useAudio = (options) => {
  const audioRef = ref(null);
  const duration = ref(null);
  const progress = ref(0);
  const currentTime = ref(0);
  const remainingTime = ref(0);
  const isPlaying = ref(true);
  const isRepeating = ref(false);

  function play() {
    isPlaying.value = true;
  }

  function pause() {
    isPlaying.value = false;
  }

  function repeat(value) {
    isRepeating.value = value;
  }

  function setCurrentTime(value) {
    audioRef.value.currentTime = value;
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
      options.next({ play, isRepeating });
    });
    if(isPlaying.value) {
      audioRef.value.play();
    }
  });

  return { 
    audioRef,
    duration,
    progress,
    currentTime,
    remainingTime,
    play,
    pause,
    repeat,
    isPlaying,
    isRepeating,
    setCurrentTime
  }
};

export const useHandleNext = (index, data, done, isRepeating) => {
  if(index.value === data.value.length - 1 && isRepeating.value) {
    index.value = 0;
    return done();
  }
  if (index.value < data.value.length - 1) {
    index.value += 1;
    done();
  }
}

export const useHandlePrevious = (index, data, done, isRepeating) => {
  if(index.value === 0 && isRepeating.value) {
    index.value = data.value.length - 1;
    return done();
  }
  if(index.value > 0) {
    index.value -= 1;
    done();
  }
}

export const useSelect = (index, newIndex, done) => {
  index.value = newIndex;
  done();
}

export const usePassiveSeek = (e, offset, duration) => {
  const target = e.currentTarget;
  const position = (e.pageX - target.offsetLeft - offset) / target.offsetWidth;
  const time = position * duration;

  return { position, time };
}

export const useActiveSeek = (e, offset) => {
  const target = e.currentTarget;
  const position = (e.pageX - target.offsetLeft - offset) / target.offsetWidth;
  const percent = Math.abs(Math.round(position * 100));
  
  return { position, percent };
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