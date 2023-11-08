<template>
    <v-footer class="d-flex flex-column my-footer">
        <div class="bg-orange d-flex w-100 align-center px-4">
            <strong>Entre em contato conosco através de nossas redes sociais!</strong>

            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="plain" size="small"></v-btn>
        </div>

        <div class="py-2 bg-orange text-center w-100">
            {{ new Date().getFullYear() }} — <strong>ArranqueForte.Bet</strong>
        </div>
    </v-footer>
</template>
<script>
export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),
}
</script>
<style scoped>
.my-footer{
    background-color: black;
    margin: 0;
    padding: 0;
    
}


</style>