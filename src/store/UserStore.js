import { reactive } from 'vue'

export const url = 'http://localhost:8081/'

const state = reactive({
    usersList: [],
    teamsList: [],
    carsList: [],
    pilotsList: [],
    preparersList: []

})

const methods = {
    async getUsers() {
        await fetch(url + 'User', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    state.usersList = data;
                })

            }
        })
    },
    async getTeams() {
        await fetch(url + 'teams', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {

            if (res.status === 200) {
                res.json().then(data => {
                    state.teamsList = data;
                })
            }
        }).catch(res => {
            console.log('Erro ao carregar equipes')
        })
    },
    async getCars() {
        await fetch(url + 'Car', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {

            if (res.status === 200) {
                res.json().then(data => {
                    state.carsList = data;
                })
            }
        })
    },
    async getPilots() {
        await fetch(url + 'Pilot', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {

            if (res.status === 200) {
                res.json().then(data => {
                    state.pilotsList = data;
                })
            }
        }).catch(res => {
            console.log('Erro ao carregar Pilotos')
        })
    },
    async getPreparers() {
        await fetch(url + 'Preparer', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {

            if (res.status === 200) {
                res.json().then(data => {
                    state.preparersList = data;
                })
            }
        }).catch(res => {
            console.log('Erro ao carregar Preparadores')
        })
    }

}



export default {
    state,
    methods
}