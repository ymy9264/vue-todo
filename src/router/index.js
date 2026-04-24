import {createRouter,createWebHistory} from 'vue-router'
import Todo from '../views/Todo.vue'
import Home from '../views/Home.vue'
const routes = [
    {
        path:'/',
        component:Home
    },
    {
        path:'/todo',
        component:Todo
    }]

    const router = createRouter({
        history:createWebHistory(import.meta.env.BASE_URL),
        routes
    })

    export default router

