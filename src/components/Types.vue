<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: '-'
  }
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();
const toggle = (value: string) => {
  if (value !== '-' && value !== '+') {
    throw new Error('type is unknown');
  }
  emits('update:modelValue', value);
};
</script>

<template>
  <ul class="type">
    <li :class="{selected:modelValue==='-'}" @click="toggle('-')">支出</li>
    <li :class="{selected:modelValue==='+'}" @click="toggle('+')">收入</li>
  </ul>
</template>

<style lang="scss" scoped>
.type {
  padding: 0 1.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin: 1em 0;

  li {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 0;
    position: relative;
    color: #878785;

    &.selected {
      color: #1f2324;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        width: 60%;
        height: 4px;
        background-color: var(--color-selected);
      }
    }
  }
}
</style>