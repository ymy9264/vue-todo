<template>
  <h1>项目1</h1>
  <nav>
    <router-link to="/">首页</router-link>
    <router-link to="/todo">Todo</router-link>
  </nav>
  <p>当前路由：{{ $route.fullPath }}</p>
  <router-view />
</template>

<script setup></script>

<style scoped></style>