import { defineStore } from 'pinia'
import axios from 'axios'
//https://mockapi.io/
const BASE_URL = 'https://670b7115ac6860a6c2cc091a.mockapi.io'
export const useTodoStore = defineStore('todo',{
  state: () => ({
    list:[],
    selectedTodo:{},
    statuses:['Pending','Doing', 'Done']
  }),
  actions:{
    async loadTodos (){
      try{
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
      } catch (error){
        console.log('error', error)
      }
    },
    async loadTodo (id){
      try{
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
      } catch (error){
        console.log('error', error)
      }
    },
    async addTodo(todoText){
      //base data
      const bodyData = {
        name: todoText,
        status: 'Pending'
      }
      try{
        const response = await axios.post(`${BASE_URL}/todos`, bodyData)
        console.log('add complete')
      }catch(error){
        console.log('error', error)
      }
    },
    async editTodo (todoData, id){
      try{
        const bodyData = {
          name: todoData.name,
          status: todoData.status
        }
        const response = await axios.put(`${BASE_URL}/todos/${id}`, bodyData)
        console.log('edit complete')
      }catch(error){
        console.log('error', error)
      }
    },
    async deleteTodo (id) {
      try{
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log('delete complete')
      }catch(error){
        console.log('deleting error todo', error)
      }
    },

  }

})
