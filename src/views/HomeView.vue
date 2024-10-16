<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todo';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const todoStore = useTodoStore()
const todoText = ref('')

onMounted(async () => {
    await todoStore.loadTodos()
})

const addTodo = async (todoText) => {
    try {
        await todoStore.addTodo(todoText)
        await todoStore.loadTodos()
    } catch (error) {
        console.log('error', error)
    }
}

const editStatus = async (todoData, todoId) => {
    try {
        const updateData = {
            name: todoData.name,
            status: todoData.status
        }
        await todoStore.editTodo(updateData, todoId)
    } catch (error) {
        console.log('error', error)
    }
}

const deleteTodo = async (todoId) => {
    try {
        await todoStore.deleteTodo(todoId)
        await todoStore.loadTodos()
    } catch (error) {
        console.log('error', error)
    }
}
</script>



<template>
    <div>
        <div>
            <input type="text" v-model="todoText">
            <button @click="addTodo(todoText)">Add</button>
        </div>
        <ul>
            <li v-for="todo in todoStore.list">
                {{ todo.name }}
                <select v-model="todo.status" @change="editStatus(todo.id)">
                    <option v-for="status in todoStore.statuses" :value="status"> {{ status }}
                    </option>
                </select>
                <RouterLink :to="{ name: 'edit', params: { id: todo.id } }">
                    <button>Edit</button>
                </RouterLink>
                <button @click="deleteTodo(todo.id)">Delete</button>
            </li>
        </ul>

    </div>
</template>