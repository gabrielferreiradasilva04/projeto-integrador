import { reactive } from 'vue'

export const url = 'http://localhost:8081/'

const state = reactive({
    usersList: [],
    teamsList: [],
    carsList: [],
    pilotsList: [],
    preparersList: [],
    championshipsList: [],
    wallet: {
    },
    user: {
    },
    movements: [],
    balance: '',
    paymentTypes: [],
    betTypes:[],
    placesList:[],
    championshipTypes:[]

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
    },
    async getChampionships() {
        await fetch(url + 'Championship', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    state.championshipsList = data;
                })
            }
        }).catch(res => {
            console.log('Erro ao carregar campeonatos')
        })
    },

    async getCurrentUser() {
        const ObjectToken = {
            token: ''
        };
        ObjectToken.token = localStorage.getItem("token")
        var jsonToken = JSON.stringify(ObjectToken);

        fetch('http://localhost:8081/User/find-by-token', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: jsonToken
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    state.user = (data)
                    methods.getUserWallet(state.user.id);

                })
            }
            if (res.status === 404) {
                this.$router.push('/')
            }

        })
    },

    async getUserWallet(userId) {
        await fetch('http://localhost:8081/Wallet/findby-user?userid=' + userId, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    state.wallet = data;
                    state.balance = state.wallet.balance.toFixed(2);
                    methods.getMovements(state.wallet.id);
                })
            }
        })

    },
    async getMovements(wallet_id) {
        await fetch('http://localhost:8081/movement/findby-wallet?wallet_id=' + wallet_id, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    state.movements = data;
                    console.log(state.movements)
                })
            }
        })
    },
    async getPaymentTypes() {
        await fetch('http://localhost:8081/PaymentType', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    state.paymentTypes = data;
                })
            }
        })
    },
    async getBetTypes() {
        await fetch('http://localhost:8081/BetType', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    state.betTypes = data;
                })
            }
        })
        
    },
    async getPlaces() {
        await fetch('http://localhost:8081/Place', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    state.placesList = data;
                })
            }
        })
        
    },
    async getChampionshipTypes() {
        await fetch('http://localhost:8081/ChampionshipType', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    state.championshipTypes = data;
                })
            }
        })
        
    }
    
    

}



export default {
    state,
    methods
}