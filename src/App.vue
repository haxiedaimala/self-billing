<template>
  <router-view/>
  <hr>
  <nav>
    <router-link to="/details">明细</router-link>
    |
    <router-link to="/billing">账单</router-link>
    |
    <router-link to="/money">记账</router-link>
    |
    <router-link to="/category">类别</router-link>
    |
    <router-link to="/statistics">统计</router-link>
    |
  </nav>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
