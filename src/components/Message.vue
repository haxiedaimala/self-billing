<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
  autoClose: {
    type: Boolean,
    default: true,
  },
  autoCloseDelay: {
    type: Number,
    default: 3
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'success',
    validator: (value: string) => ['success', 'error'].indexOf(value) >= 0
  }
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();
const close = () => emits('update:modelValue', false);
if (props.autoClose) {
  setTimeout(() => {
    close();
  }, props.autoCloseDelay * 1000);
}
const classStyle = computed(() => {
  return [
    `message-type-${props.type}`,
  ];
});
</script>

<template>
  <div class="message message-top" :class="classStyle" v-if="modelValue">
    <slot/>
    <div class="message-close" v-if="showClose" @click="close"/>
  </div>
</template>

<style lang="scss">
@mixin toastType($typeColor) {
  border: 1px solid $typeColor;
  color: #fff;
  background-color: $typeColor;
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.message {
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 1.8;
  padding: 0.3em 1em;
  border-radius: 4px;

  &.message-top {
    top: 1em;
    left: 50%;
    transform: translateX(-50%);
    animation: 250ms slide-up;
  }

  &.message-type-success {
    @include toastType(#67c23a);
  }

  &.message-type-error {
    @include toastType(#f56c6c);
  }

  &-close {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1em;
    width: 1em;
    height: 1em;
    cursor: pointer;

    &::after,
    &::before {
      content: '';
      width: 1px;
      height: 0.8em;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(135deg);
    }
  }
}
</style>