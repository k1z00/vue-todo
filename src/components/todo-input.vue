<script setup lang="ts">
  import { ref } from 'vue'

  const inputText = ref('')
  const emit = defineEmits(['add-todo'])

  const addTodo = () => {
    if (inputText.value.trim() !== '') {
      emit('add-todo', inputText.value)
      inputText.value = ''
    }
  }
</script>

<template>
  <div class="todo__form">
    <input
      type="text"
      class="todo__input"
      placeholder="Что нужно сделать?"
      v-model="inputText"
      @keyup.enter="addTodo"
    />
    <button class="todo__button" @click="addTodo">Добавить</button>
  </div>
</template>

<style scoped>
  .todo__form {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .todo__input {
    flex-grow: 1;
    padding: 10px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s ease-in-out;
  }

  .todo__input:focus {
    border-color: #007bff;
  }

  .todo__button {
    padding: 10px 16px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .todo__button:hover {
    background-color: #0056b3;
  }

  .todo__button:active {
    background-color: #004085;
  }
</style>
