<script setup>
import { useTodoStore } from '@/stores/todo';
import { RouterLink, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue';


const todoStore = useTodoStore()
const route = useRoute()
const todoId = ref()

onMounted(async () => {
    await todoStore.loadTodo(route.params.id)
    todoId.value = parseInt(route.params.id)
    console.log(todoStore.selectedTodo)
})

const editTodo = async (selectedTodo) => {
    try {
        const bodyData = {
            name: selectedTodo.name,
            status: selectedTodo.status
        }
        await todoStore.editTodo(bodyData, todoId.value)
    } catch (error) {
        console.log('error', error)
    }

}

</script>

<template>
    <div>
        <RouterLink :to="{name: 'todolist'}">
            Back
        </RouterLink>
        Edit {{ todoId }}
        <div>To-do
            <input type="text" v-model="todoStore.selectedTodo.name">
        </div>
        <div>Status
            <select v-model="todoStore.selectedTodo.status">
                <option v-for="status in todoStore.statuses" :value="status"> {{ status }}
                </option>
            </select>
            <div>
                <button @click="editTodo(todoStore.selectedTodo)">Edit</button>
            </div>
        </div>
    </div>
</template>