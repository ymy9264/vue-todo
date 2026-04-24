import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const saved = localStorage.getItem('todos')
  const todos = ref(saved ? JSON.parse(saved) : [
    { id: 1, text: '学习vue3', done: false },
    { id: 2, text: '写TodoList', done: true }
  ])
  const status = ref('all')

  function addTodo(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    todos.value.push({ id: Date.now(), text: trimmed, done: false })
  }

  function removeTodo(id) {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  function toggleTodo(id) {
    const target = todos.value.find(todo => todo.id === id)
    if (target) target.done = !target.done
  }

  function clearDone() {
    todos.value = todos.value.filter(todo => !todo.done)
  }

  const remaining = computed(() => {
    return todos.value.filter(todo => !todo.done).length
  })

  const filterTodos = computed(() => {
    if (status.value === 'done') return todos.value.filter(todo => todo.done)
    if (status.value === 'pending') return todos.value.filter(todo => !todo.done)
    return todos.value
  })

  watch(todos, (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  }, { deep: true })

  return { todos, status, remaining, filterTodos, addTodo, removeTodo, toggleTodo, clearDone }
})