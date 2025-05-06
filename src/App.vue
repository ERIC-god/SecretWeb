<script setup>

import { message } from './libs/message/index.js';
message('success', 'Welcome！', 3000)
console.log();


</script>

<template>


  <!-- 一级路由出口 -->
  <router-view></router-view>


  


</template>

<style scoped></style>
