<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todo';
import { onMounted } from 'vue';

const todoStore = useTodoStore()
const todoText = ref('')

onMounted(async () => {
    await todoStore.loadTodos()
})

const addTodo = async (todoText) => {
    try{
        await todoStore.addTodo(todoText)
        await todoStore.loadTodos()
    }catch(error){
        console.log('error', error)
    }
}

const editStatus = async (todoId, todoStatus) => {
    try{
        await todoStore.editTodo(todoId, todo)
    }catch(error){
        console.log('error', error)
    }
}

const deleteTodo = async (todoId) => {
    try{
        await todoStore.deleteTodo(todoId)
        await todoStore.loadTodos()
    }catch(error){
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
                <select v-model="todo.status" @change="editStatus(todo.id, todo)">
                    <option>Select</option>
                    <option v-for="status in todoStore.statuses" :value="status"> {{ status }}</option>
                </select>
                <button>Edit</button>  
                <button @click="deleteTodo(todo.Id)">Delete</button>
            </li>
        </ul>

    </div>
</template>