<template>
  <div class="flex">
    <div class="w-full inline-flex items-center justify-end">
      <input
        type="text"
        class="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          h-14
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
          :placeholder="placeholder"
          :value="modelValue" @input="updateValue"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps(['placeholder','modelValue'])
  const emit = defineEmits(['update:modelValue'])

  const updateValue = (event: any) => {
    emit('update:modelValue', event.target.value)
  }

</script>

<style scoped>

</style>