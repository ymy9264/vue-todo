<script setup>
  import {ref,computed, watch} from 'vue'
  const inputValue = ref('')
   const saved = localStorage.getItem('todos')

  const todos = ref( saved ? JSON.parse(saved) : [
    {id:1,text:'学习vue3',done:false},
    {id:2,text:'写TodoList',done:true}
  ])

  function addTodo(){
    const text = inputValue.value.trim();
    if(!text) return
    todos.value.push({
      id:Date.now(),
      text,
      done:false
    })
    inputValue.value = ''
  }

  function removeTodo(id){
     todos.value = todos.value.filter(todo=>todo.id !== id)
  }

function toggleTodo(id) {
  const target = todos.value.find(todo => todo.id === id)
  if (target) {
    target.done = !target.done
  }
}

const remaining = computed(()=>{
  return todos.value.filter(todo => !todo.done).length
})

const status = ref('all');
const filterTodos =  computed(()=>{
  if(status.value === 'done'){
      return todos.value.filter(todo=>todo.done)
  }
  if(status.value === 'pending'){
    return todos.value.filter(todo=>!todo.done)
  }

  return todos.value

})

function clearDone(){
  todos.value = todos.value.filter(todo=> !todo.done);
}

 watch(todos,(newVal)=>{
    localStorage.setItem('todos',JSON.stringify(newVal))
 },{deep:true})
</script>

<template>
  <div class="container">
    <h1>TodoList</h1>

    <div class="input-area">
      <button @click="status = 'all'" :class="{ selected: status == 'all' }">
        全部
      </button>
      <button @click="status = 'done'" :class="{ selected: status == 'done' }">
        已完成
      </button>
      <button
        @click="status = 'pending'"
        :class="{ selected: status == 'pending' }"
      >
        未完成
      </button>
      <input
        v-model="inputValue"
        @keyup.enter="addTodo"
        placeholder="添加待办事项"
      />
    </div>
    <ul class="todo-list">
      <li class="todo-item" v-for="todo in filterTodos" :key="todo.id">
        <span :class="{ done: todo.done }" @click="toggleTodo(todo.id)">
          {{ todo.text }}
        </span>
        <button @click="removeTodo(todo.id)">删除</button>
      </li>
    </ul>
    <p>未完成：{{ remaining }}</p>
    <button @click="clearDone">清除已完成</button>
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

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.buttons {
  display: flex;
  gap: 10px;
}

.done {
  text-decoration: line-through;
  color: #999;
}
</style>
