<template>
  <div class="un-show-content">
    <span>抱歉当前没有记录哦~~~</span>
    <router-link :to="{name:'money'}" class="un-show-link">去记账</router-link>
  </div>
</template>

<style lang="scss" scoped>
.un-show-content {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .un-show-link {
    display: block;
    padding: 0.5em 2em;
    margin-top: 2em;
    font-size: 18px;
    background-color: var(--color-selected);
    color: #fff;
    border-radius: 0.8em;
    border: 1px solid var(--color-border);
  }
}
</style>