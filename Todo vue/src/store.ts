import { createStore } from 'vuex'

export const store = createStore({
    state: {
        todos : [],
        token: {},
        tasks: [],
        list: {},
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos
        },
        setToken(state, token){
            state.token = token
        },
        setTasks(state, tasks) {
            state.tasks = tasks
        },
        setList(state, list) {
            state.list = list
        }
    },
    getters: {
        getTodos(state) {
            return state.todos
        },
        getToken(state) {
            return state.token
        },
        getTasks(state) {
            return state.tasks
        },
        getList(state) {
            return state.list
        }
    },
    actions: {
        loadTodos(context, token) {
            return fetch('http://localhost:7000/api/v1/lists', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`
                },
                method: 'GET'
            }).then(
                response => context.commit('setTodos', response.json())
            )
        },
        loadTasks(context, token) {
            return fetch('http://localhost:7000/api/v1/tasks', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`
                },
                method: 'GET'
            }).then(
                response => context.commit('setTasks', response.json())
            )
        },
        login (context, user) {
            return fetch('http://localhost:7000/api/v1/users/login', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(user),
                method: 'POST'
            }).then(
                response => context.commit('setToken', response.json())
            )
        },
        register (context, user) {
            return fetch('http://localhost:7000/api/v1/users/register', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(user),
                method: 'POST'
            }).then(
                response => context.commit('setToken', response.json())
            )
        },
        createList(context, obj) {
            console.log(obj)
            return fetch('http://localhost:7000/api/v1/lists', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${obj.token}`
                },
                body: JSON.stringify({"title":obj.list.title}),
                method: 'POST'
            }).then(
                response => context.commit('setList', response.json())
            )
        },
        createTask(context, obj) {
            return fetch('http://localhost:7000/api/v1/tasks', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${obj.token}`
                },
                body: JSON.stringify({"title":obj.task.title, "list":obj.listId}),
                method: 'POST'
            })
        },
        deleteList(context, obj) {
            return fetch(`http://localhost:7000/api/v1/lists/${obj.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${obj.token}`
                },
                method: 'DELETE'
            })
        },
        updateTask(context, obj){
            return fetch(`http://localhost:7000/api/v1/tasks/${obj.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${obj.token}`
                },
                body : JSON.stringify({'title': obj.title}),
                method: 'PUT'
            })
        },
        updateList(context, obj) {
            return fetch(`http://localhost:7000/api/v1/lists/${obj.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${obj.token}`
                },
                body : JSON.stringify({'title': obj.title}),
                method: 'PUT'
            })
        },
    }
})