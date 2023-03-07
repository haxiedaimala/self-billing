<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import {useRouter} from 'vue-router';

defineProps({
  modelValue: {
    type: String,
    default: '-'
  }
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();
const router = useRouter();
const toggle = (value: string) => {
  if (value !== '-' && value !== '+') {
    throw new Error('type is unknown');
  }
  emits('update:modelValue', value);
};
const goBack = () => router.back();
</script>

<template>
  <div class="type-wrapper">
    <Icon name="left" class="left" @click="goBack"/>
    <ul class="type">
      <li :class="{selected:modelValue==='-'}" @click="toggle('-')">支出</li>
      <li :class="{selected:modelValue==='+'}" @click="toggle('+')">收入</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.type-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-size: 18px;
  padding: 1.8em 0.8em;

  .left {
    width: 1.5em;
    height: 1.5em;
  }

  .type {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;

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
}
</style>