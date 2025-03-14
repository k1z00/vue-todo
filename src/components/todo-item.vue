<script setup lang="ts">
  interface TodoItemProps {
    todo: {
      id: number
      text: string
    }
  }

  const props = defineProps<TodoItemProps>()

  const emit = defineEmits(['edit', 'delete'])

  const handleEdit = () => {
    emit('edit', props.todo.id)
  }

  const handleDelete = () => {
    emit('delete', props.todo.id)
  }
</script>

<template>
  <div class="todo__list">
    <p class="todo__list-text">{{ todo.text }}</p>
    <div class="todo__list-buttons">
      <button class="todo__list-button todo__list-button--update" @click.stop="handleEdit">
        Изменить
      </button>
      <button class="todo__list-button todo__list-button--delete" @click="handleDelete">
        Удалить
      </button>
    </div>
  </div>
</template>

<style scoped>
  .todo__list {
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
  }

  .todo__list-buttons {
    display: flex;
    gap: 10px;
  }
  .todo__list-text {
    font-size: 18px;
    font-weight: 500;
  }

  .todo__list-button {
    padding: 6px 6px;
    font-size: 13px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .todo__list-button--delete {
    background-color: #ca2525;
  }
</style>
