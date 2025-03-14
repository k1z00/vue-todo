<script setup lang="ts">
  import { ref } from 'vue'
  import TodoInput from './todo-input.vue'
  import TodoItem from './todo-item.vue'

  interface Todo {
    id: number
    text: string
  }

  const todos = ref<Todo[]>([])

  const handleDelete = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  const handleEdit = (id: number) => {
    const newText = prompt('Введите новый текст')
    if (newText) {
      const todo = todos.value.find((todo) => todo.id === id)
      if (todo) {
        todo.text = newText
      }
    }
  }

  const addTodo = (text: string) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: text,
      }
      todos.value.push(newTodo)
    }
  }
</script>

<template>
  <div class="todo">
    <TodoInput @add-todo="addTodo" />
    <TodoItem
      @delete="handleDelete"
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @edit="handleEdit"
    />
  </div>
</template>

<style scoped>
  .todo {
    width: 100%;
    max-width: 1000px;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
