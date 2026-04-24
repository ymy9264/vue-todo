<script setup>
import { useTodoStore } from '@/stores/todo'

defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const store = useTodoStore()
</script>

<template>
  <li class="todo-item">
    <span :class="{ done: todo.done }" @click="store.toggleTodo(todo.id)">
      {{ todo.text }}
    </span>
    <button @click="store.removeTodo(todo.id)">删除</button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.done {
  text-decoration: line-through;
  color: #999;
}
</style>