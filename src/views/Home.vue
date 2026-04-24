<script setup>
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore()
</script>
<template>
    <h2>首页</h2>
    <h2>今日事项：{{ store.remaining }} / {{ store.todos.length }}</h2>
</template>

<style scoped>
</style>
