<template>
  <div
    :style="{ left: `${position}%` }"
    :class="{ 'opacity-0' : !visible }"
    class="absolute left-0 top-0 h-full w-2 bg-orange-500 transition-all duration-200 ease-out z-10 opacity-100"
  >
    <div class="text-white absolute bottom-full left-1/2 transform -translate-x-1/2 tracking-widest">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    position: Number,
    visible: Boolean,
    value: String
  },
  setup() {
    
  },
}
</script>