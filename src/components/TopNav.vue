<script setup lang="ts">
import {useRouter} from 'vue-router';
import Icon from '@/components/Icon.vue';

const props = defineProps<{
  modelValue: '-' | '+',
  toPage?: string
}>();
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();
const router = useRouter();
const goBack = () => {
  if (props.toPage === undefined) {
    router.back();
  } else {
    router.push({
      name: props.toPage
    });
  }
};
const toggle = (value: string) => emits('update:modelValue', value);
</script>

<template>
  <Teleport to="body">
    <div class="nav top">
      <Icon name="left" class="left" @click="goBack"/>
      <span class="title">
        <slot/>
      </span>
      <div class="type">
        <span :class="{selected:modelValue==='-'}" @click="toggle('-')">支出</span>
        <span>/</span>
        <span :class="{selected:modelValue==='+'}" @click="toggle('+')">收入</span>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  font-size: 18px;
  align-items: center;
  padding: 0.8em 2em 2em;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  .left {
    width: 1.5em;
    height: 1.5em;
    margin-left: -1.5em;
    margin-right: 0.3em;
  }

  .title {
    font-weight: bold;
    font-size: 24px;
  }

  .type {
    color: var(--color-unselected);
    margin-left: auto;

    span:not(:first-child) {
      margin-left: 5px;
    }

    .selected {
      font-weight: bold;
      color: #333;
    }
  }
}
</style>