<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const add = () => count.value++
</script>

<template>
  <div class="text-center mt-12">
    This is home page
  </div>
</template>
