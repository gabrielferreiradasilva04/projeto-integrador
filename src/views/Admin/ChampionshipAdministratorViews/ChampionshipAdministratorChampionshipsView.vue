<template>
    <body>
        <div class="main">
            <div class="title">
                <h1>Campeonatos da Região</h1>
            </div>
            <div class="championships-table">
                <v-table class="table">
                    <thead>
                        <tr>
                            <th class="text-left">
                                Nome do Campeonato
                            </th>
                            <th class="text-left">
                                Local
                            </th>
                            <th class="text-left">
                                Inicio
                            </th>
                            <th class="text-left">
                                Fim
                            </th>
                            <th class="text-left">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="championship in championships" :key="championship.id">
                            <td>{{ championship.title }}</td>
                            <td>{{ championship.place.name }}</td>
                            <td>{{ championship.startDate }}</td>
                            <td>{{ championship.endDate }}</td>
                            <td>
                                <button>Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <div class="button-div">
                    <button>Novo Campeonato</button>
                </div>
            </div>
        </div>
    </body>
</template>

<script>

export default {
    data() {
        return {
            championships: [],
        }
    }
}

</script>

<style scoped>
.main {
    padding: 20px;
}

.button-div button {
    border: 2px black solid;
    border-radius: 20px;
    width: 250px;
    height: 35px;
    color: orange;
}

.button-div {
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: end;
    padding-top: 40px;
    padding-right: 50px;
}
</style>