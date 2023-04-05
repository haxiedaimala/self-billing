<script setup lang="ts">
import Button from './Button.vue';
import {ref} from 'vue';

const props = defineProps<{
  modelValue: boolean,
  ok: (value: string) => boolean | void,
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();
const data = ref('');
const closeDialog = () => emit('update:modelValue', !props.modelValue);
const onClickOverlay = () => closeDialog();
const onClickOk = () => {
  if (!props.ok) closeDialog();
  if (props.ok && props.ok(data.value) !== false) {
    closeDialog();
  }
};
const onClickCancle = () => closeDialog();
</script>

<template>
  <template v-if="modelValue">
    <Teleport to="body">
      <div class="dialog-overlay" @click="onClickOverlay"/>
      <div class="dialog-wrapper">
        <div class="dialog">
          <header>
            <slot name="header"/>
            <span @click="closeDialog" class="dialog-close"/>
          </header>
          <main>
            <Input :value="data" @input="data=$event.target.value" placeholder="请输入..."/>
          </main>
          <footer>
            <button class="footer-close" @click="onClickCancle">取消</button>
            <button class="footer-confirm" @click="onClickOk">确认</button>
          </footer>
        </div>
      </div>
    </Teleport>
  </template>
</template>

<style lang="scss" scoped>
$radius: 4px;
$border-color: #d9d9d9;
.dialog {
  background: #fff;
  border-radius: $radius;
  box-shadow: 0 0 3px fade-out(black, 0.5);
  min-width: 16em;
  max-width: 90%;

  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: fade-out(black, 0.5);
    z-index: 10;
  }

  &-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }

  > header {
    position: relative;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
  }

  > main {
    padding: 24px 16px;

    input {
      width: 100%;
      height: 2.5em;
      padding: 0 0.5em;

      &:focus {
        outline: none;
      }
    }
  }

  > footer {
    padding: 0 16px 12px;
    text-align: right;

    .footer-close,
    .footer-confirm {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      background-color: #fff;
      padding: 0.5em 1em;
      margin-left: 1em;
    }

    .footer-confirm {
      color: #fff;
      border-color: var(--color-selected);
      background-color: var(--color-selected);
    }
  }

  &-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 16px;
    height: 16px;
    cursor: pointer;

    &::after,
    &::before {
      content: "";
      height: 1px;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      background: black;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
</style>