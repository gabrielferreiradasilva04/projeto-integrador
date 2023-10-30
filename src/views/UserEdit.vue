<template>
    <div class="main">
        <div class="title-box">
            <h1>Perfil de Usuário</h1>
        </div>
        <div class="profile-details">
            <form action="" class="user-form">
                <label for="userId"><strong>Código do usuário</strong></label>
                <label for="" id="userId">{{ user.id }}</label>

                <label for="userName"><strong>Nome</strong></label>
                <input type="text" name="userName" id="userName" v-model="this.user.name">

                <label for="userMail"><strong>E-mail</strong></label>
                <input type="text" name="userEmail" id="userMail" v-model="this.user.email">

                <label for="userPhone"><strong>Telefone para contato</strong></label>
                <input type="text" name="userPhone" id="userPhone" v-model="this.user.phone">

                <label for="userDocument"><strong>CPF</strong></label>
                <input type="text" name="userDocument" id="userDocument" v-model="this.user.document">

                <label for="registerDate"><strong>Data de ingresso</strong></label>
                <input type="text" name="userRegisterDate" id="registerDate" v-model="this.user.registerDate">

                <label for="userType"><strong>Tipo de usuário</strong></label>
                <input type="text" name="UserType" id="userType" v-model="this.user.userType">
                <div class="button-box">
                    <input type="submit" @click="this.updateUser" value="Finalizar">
                    <input type="submit" @click="this.deleteUser" value="Deletar">
                </div>

            </form>

        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            user: {
                name: '',
                document: '',
                email: '',
                password: '',
                phone: '',
                registerDate: '',
                userType: ''
            }
        }
    },
    methods: {
        async getUser() {
            await fetch('http://localhost:8081/User/' + this.$route.params.id)
                .then(res => res.json())
                .then(data => {

                    this.user = data;

                })
        },

        async updateUser(e) {

            e.preventDefault();


            await fetch('http://localhost:8081/User/' + this.$route.params.id, {

                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(this.user)

            }).then(res => {
                if (res.status === 200) {
                    alert("Usuário atualizado")
                } else {
                    alert("Erro ao atualizar usuário")
                }

            })

        },

        async deleteUser(e) {

            e.preventDefault();


            await fetch('http://localhost:8081/User/' + this.$route.params.id, {

                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                if (res.status === 200) {
                    alert("Usuário deletado")

                    this.$router.push('/home')


                } else {
                    alert("Erro ao deletar usuário")
                }

            })

        }
    },
    beforeMount() {

        this.getUser();
    }

}


</script>

<style scoped>
.profile-details {

    gap: 20px;
    display: flex;
    flex-direction: column;
    width: 60%;
}

.user-form {
    padding: 20px;
    gap: 10px;
    display: flex;
    flex-direction: column;
}

.user-form input {
    border-bottom: 1px black solid;
}

.button-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
</style>