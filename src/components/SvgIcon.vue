<template>
  <svg aria-hidden="true" class="svg-icon" :style="style[size]">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  prefix: {type: String,default: 'icon'},
  iconClass: {type: String,required: true},
  color: {type: String,default: ''},
  size:{ type: String, default:'medium'}
})

const style = {
  mini: {
    width: '0.75rem',
    height: '0.75rem'
  },
  small: {
    width:"1.25rem",
    height:"1.25rem"
  },
  medium: {
    width:"2rem",
    height:"2rem"
  },

} as any

const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);
</script>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
