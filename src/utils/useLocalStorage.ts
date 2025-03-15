
import { ref, onMounted } from 'vue'

interface Todo {
    id: number
    text: string
}


const loadFormLocalStorage = (key: string): Todo[] => {
    const savedData = localStorage.getItem(key)
    return savedData ? JSON.parse(savedData) : []
}


const saveLocalStorage = (key: string, data: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(data))
}


export const useLocalStorage = (key: string) => {
    const data = ref<Todo[]>([])


    onMounted(() => {
        data.value = loadFormLocalStorage(key)
    })


    const saveData = (newData: Todo[]) => {
        saveLocalStorage(key, newData)
        data.value = newData
    }
    return {
        data,
        saveData,
    }
}