<script setup lang="ts">
  interface TodoItemProps {
    todo: {
      id: number
      title: string
      completed: boolean
    }
  }

  const props = defineProps<TodoItemProps>()

  const emit = defineEmits(['edit', 'delete', 'check'])

  const handleEdit = () => {
    emit('edit', props.todo.id)
  }

  const handleDelete = () => {
    emit('delete', props.todo.id)
  }

  const handleCheked = () => {
    emit('check', props.todo.id)
  }
</script>

<template>
  <div class="todo__list">
    <div class="todo__list-status">
      <input @change="handleCheked" type="checkbox" :checked="todo.completed" />
      <p :class="todo.completed ? 'todo__list-text-completed' : 'todo__list-text'">
        {{ todo.title }}
      </p>
    </div>
    <div class="todo__list-buttons">
      <button class="todo__list-button todo__list-button--update" @click.stop="handleEdit">
        <img width="17px" height="17px" src="/update.png" alt="" />
      </button>
      <button class="todo__list-button todo__list-button--delete" @click="handleDelete">
        <img width="30px" height="30px" src="/delete.png" alt="" />
      </button>
    </div>
  </div>
</template>

<style scoped>
  .todo__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    position: relative;
  }

  .todo__list:not(:last-child)::before {
    content: '';
    position: absolute;
    top: 87px;
    opacity: 0.6;
    width: 100%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: gray;
  }

  .todo__list-buttons {
    display: flex;
    gap: 5px;
  }

  .todo__list-text {
    font-size: 18px;
    font-weight: 500;
  }

  .todo__list-button {
    padding: 6px 6px;
    font-size: 13px;
    color: #fff;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    background-color: #ecebeb;
  }

  .todo__list-text-completed {
    text-decoration: line-through;
    font-size: 18px;
    font-weight: 500;
    color: green;
  }

  .todo__list-status {
    display: flex;
    text-align: center;
    gap: 10px;
  }
</style>
