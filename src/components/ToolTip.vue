<template>
  <div
    :style="{ left: `${position}%` }"
    class="tooltip absolute left-0 top-0 h-full w-2 bg-orange-500 transition-all duration-200 ease-out z-10"
    :class="{ 'active' : visible }"
  >
    <div class="absolute text-white bottom-full left-1/2 transform -translate-x-1/2 mb-2 tracking-widest bg-slate-900 bg-opacity-75 rounded-lg px-2 leading-none pt-0.5 select-none">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    position: Number,
    visible: Boolean,
    value: String
  },
  setup() {},
}
</script>

<style lang="postcss" scoped>
.tooltip {
  @apply opacity-0;
}
.tooltip.active {
  @apply opacity-100;
}
</style>