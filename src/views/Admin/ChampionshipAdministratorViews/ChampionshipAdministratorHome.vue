<template>
    <body>
        <div class="main">
            <div class="title">
                <h1>Bem vindo Administrador do {{ this.user.uf }}</h1>
            </div>
        </div>
    </body>
</template>

<script>

    export default {
        data(){
            return{
                user:{}
            }

        },
        methods :{
            async getCurrentUser(){

                
            }
        },
        beforeMount() {
        },

    }
</script>