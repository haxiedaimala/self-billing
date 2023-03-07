<script setup lang="ts">
import {ref} from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  note: {
    type: String,
    default: () => ''
  },
  date: {
    type: String,
    default: () => new Date().toISOString()
  },
  account: {
    type: String,
    default: () => '0.00'
  },
});
const emit = defineEmits<{
  (e: 'submit', value: { note: string, account: number, createAt: string }): void
}>();
const output = ref(props.account.toString());
const dateTime = ref(dayjs(props.date).format('YYYY-MM-DD'));
const notes = ref(props.note);
const inputContent = (e: Event) => {
  const input = (e.target as HTMLButtonElement).innerText;
  if (output.value.length >= 16) return;
  if (input === '.') {
    if (output.value.indexOf('+') === -1 && output.value.indexOf('-') === -1) {
      if (output.value !== '0.00' && output.value.indexOf('.') >= 0 && input === '.') return;
    }
    if (output.value.split('-').length >= 2) {
      const arr = output.value.split('-');
      if (arr[1] === '' || arr[1].indexOf('.') === -1) return output.value += input;
      if (arr[1].indexOf('.') >= 0) return;
    }
    if (output.value.split('+').length >= 2) {
      const arr = output.value.split('+');
      if (arr[1] === '' || arr[1].indexOf('.') === -1) return output.value += input;
      if (arr[1].indexOf('.') >= 0) return;
    }
  }

  if (output.value === '0.00' || output.value === '0') {
    if ('0123456789'.indexOf(input) >= 0) return output.value = input;
    if ('+-'.indexOf(input) >= 0) return;
    if (input === '.') return output.value = '0' + input;
  }
  if ('+-'.indexOf(input) >= 0) {
    if (output.value.indexOf('+') >= 0 || output.value.indexOf('-') >= 0) {
      if (output.value.split('+').length === 1) {
        let arr = output.value.split('-');
        output.value = arr[1] === '' ? (arr[0] + input) : (parseFloat(arr[0]) - parseFloat(arr[1])).toString();
      } else {
        let arr = output.value.split('+');
        output.value = arr[1] === '' ? (arr[0] + input) : (parseFloat(arr[0]) + parseFloat(arr[1])).toString();
      }
    }
    return output.value = parseFloat(output.value) + input;
  }
  output.value += input;
};
const remove = () => {
  const number = output.value.slice(0, -1);
  output.value = number.length > 0 ? number : '0.00';
};
const clear = () => {
  output.value = '0.00';
};
const toStart = () => {
  output.value = props.account;
  dateTime.value = dayjs(props.date).format('YYYY-MM-DD');
  notes.value = props.note;
};
const ok = () => {
  if (output.value.indexOf('+') >= 0 || output.value.indexOf('-') >= 0) {
    if (output.value.split('+').length === 1) {
      let arr = output.value.split('-');
      if (arr[1] === '.') arr[1] = '0';
      output.value = (parseFloat(arr[0]) - parseFloat(arr[1])).toString();
    } else {
      let arr = output.value.split('+');
      if (arr[1] === '.') arr[1] = '0';
      output.value = (parseFloat(arr[0]) + parseFloat(arr[1])).toString();
    }
  }
  output.value = parseFloat(output.value).toString();
  if (parseFloat(output.value) < 0 || output.value === '0.00' || output.value === '0') return window.alert('金额需大于0');
  emit('submit', {note: notes.value, account: parseFloat(output.value), createAt: dateTime.value});
  toStart();
};
</script>

<template>
  <div class="numberPanel">
    <div class="panel-info">
      <input class="notes" type="text" placeholder="点击输入备注" v-model="notes">
      <div class="output">￥{{ output }}</div>
    </div>
    <input class="panel-info date" type="date" v-model="dateTime"/>
    <div class="numberPad">
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">-</button>
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">0</button>
      <button @click="inputContent">.</button>
      <button @click="remove">删除</button>
      <button @click="ok">完成</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.numberPanel {
  @extend %innerShadow;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin-top: 1em;
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);

  .panel-info {
    background-color: #fff;
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid var(--color-border);

    .notes {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 0.4em 1em;
      border: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: transparent;
    }

    .output {
      padding-right: 0.8em;
      font-size: 24px;
      font-family: Consolas, monospace;
    }

    &.date {
      display: flex;
      margin-top: 8px;
      padding: 0.4em 1em;
    }
  }


  .numberPad {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    margin-top: 5px;

    button, label {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.2em;
      font-size: 18px;
      margin: 5px 0;
      width: 21%;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background-color: #fff;
      cursor: pointer;
      box-shadow: inset 0 -3px 5px rgba(194, 194, 194, 1);
    }
  }
}
</style>