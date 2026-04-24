<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'
import TodoItem from '@/components/TodoItem.vue'

const store = useTodoStore()
const inputValue = ref('')
</script>

<template>
  <div class="container">
    <h1>TodoList</h1>
    <div class="input-area">
      <button @click="store.status = 'all'" :class="{ selected: store.status == 'all' }">全部</button>
      <button @click="store.status = 'done'" :class="{ selected: store.status == 'done' }">已完成</button>
      <button @click="store.status = 'pending'" :class="{ selected: store.status == 'pending' }">未完成</button>
      <input
        v-model="inputValue"
        @keyup.enter="store.addTodo(inputValue); inputValue = ''"
        placeholder="添加待办事项"
      />
    </div>
    <ul class="todo-list">
 <TodoItem
  v-for="todo in store.filterTodos"
  :key="todo.id"
  :todo="todo"
/>
    </ul>
    <p>未完成：{{ store.remaining }}</p>
    <button @click="store.clearDone">清除已完成</button>
  </div>
</template>

<style scoped>
.selected {
  background: #409eff;
  color: #fff;
}
.container {
  width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
}
.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.input-area input {
  flex: 1;
  height: 36px;
  padding: 0 10px;
  font-size: 14px;
}
.input-area button {
  padding: 0 16px;
}
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

</style>