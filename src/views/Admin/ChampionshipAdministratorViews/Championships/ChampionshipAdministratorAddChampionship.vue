<template>
    <body>
        <div class="main">
            <div class="title">
                <h1>Novo Campeonato</h1>
            </div>
            <br>
            <div class="championship-details">
                <form action="" id="championship-form">
                    <input type="text" placeholder="Titulo do campeonato">
                    <input type="text" placeholder="Tamanho da pista">
                    <input type="text" placeholder="Quantidade mínima de pilotos">
                    <input type="text" placeholder="Quantidade máxima de pilotos">
                    <input type="date" id="startDate" placeholder="Data de início">
                    <input type="date" id="endDate" placeholder="Data Fim">

                    <select id="championshipType" v-model="championship.championshipType">
                        <option value="" disabled selected>Tipo de Campeonato</option>
                        <option v-for="championshipType in championshipTypes" :key="championshipType.id">
                        {{championshipType.description }}></option>
                    </select>
                    <select name="" id="championshipPlace" v-model="championship.place">
                        <option value="place.id" v-for="place in places" :key="place.id">
                            {{ place.name }}
                        </option>
                    </select>

                </form>
            </div>
        </div>
    </body>
</template>



<script>

export default {
    data() {
        return {
            places: [],
            championshipTypes: [],
            championship: {}
        }
    },
    methods: {
        async getPlaces() {

            await fetch('http://localhost:8081/Place', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        this.places = data;
                        console.log(this.places)
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
                        this.championshipTypes = data;
                        console.log(this.places)
                    })
                }
            })
        }
    },
    beforeMount() {
        this.getPlaces();
        this.getChampionshipTypes();
    }
}



</script>


<style>
#championship-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

#championship-form input {
    border-bottom: 1px solid black;
}

#championship-form select {
    border-bottom: 1px solid black;
}

.championship-details {
    width: 50%;
}

.main {
    padding-left: 30px;
    padding-top: 20px;
}
</style>