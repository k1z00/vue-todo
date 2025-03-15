<script setup lang="ts">
  import TodoInput from './todo-input.vue'
  import TodoItem from './todo-item.vue'
  import { useLocalStorage } from '../utils/useLocalStorage' // Импортируем хук
  import { onMounted } from 'vue'

  const { data: todos, saveData } = useLocalStorage('todos')

  const addTodo = (text: string) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        title: text,
        completed: false,
      }
      const updatedTodos = [...todos.value, newTodo]
      saveData(updatedTodos)
    }
  }

  onMounted(async () => {
    if (todos.value.length === 0) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        const data = await response.json()
        saveData(data.map((todo) => ({ ...todo, completed: false })))
      } catch (e) {
        console.log(e)
      }
    }
  })

  const handleDelete = (id: number) => {
    const updatedTodos = todos.value.filter((todo) => todo.id !== id)
    saveData(updatedTodos)
  }

  const handleEdit = (id: number) => {
    const newText = prompt('Введите новый текст')
    if (newText) {
      const updatedTodos = todos.value.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo,
      )
      saveData(updatedTodos)
    }
  }

  const handleCheked = (id: number) => {
    const updatedTodos = todos.value.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    )
    saveData(updatedTodos)
  }
</script>

<template>
  <div class="todo">
    <TodoInput @add-todo="addTodo" />
    <transition-group name="fade" tag="div">
      <TodoItem
        @delete="handleDelete"
        @edit="handleEdit"
        @check="handleCheked"
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
      />
    </transition-group>
  </div>
</template>

<style scoped>
  .todo {
    width: 100%;
    max-width: 1000px;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
    background-color: #ecebeb;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
