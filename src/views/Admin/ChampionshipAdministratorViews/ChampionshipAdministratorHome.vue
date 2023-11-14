<template>
    <body>
        <div class="main">
            <div class="title">
                <h1>Bem vindo Administrador do {{ user.uf }} </h1>
            </div>
        </div>
    </body>
</template>

<script>

export default {
    data() {
        return {
            user: {

            }
        }


    },
    methods: {
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
                        this.user = data;
                    })
                }
                if(res.status === 404){
                        this.$router.push('/')
                }

            })
        }
    },
    beforeMount() {
        this.getCurrentUser();
    },

}
</script>