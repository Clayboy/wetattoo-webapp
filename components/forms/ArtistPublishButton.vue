<template>
        <button
            class="btn"
            v-text="active ? activeCta : inactiveCta"
            @click.prevent="toggle">
        </button>
</template>

<script>


    export default {
        props : {
            activeCta:{
                type:String,
                required: false,
                default(){
                    return this.$i18n.t("Dépublier")
                },
            },
            inactiveCta:{
                type:String,
                required: false,
                default(){
                    return this.$i18n.t("Publier")
                },
            },
            artistId:{
                type:Number,
                required:true,
            },
            value:{
                type:Boolean,
                required:false,
            }
        },

        data(){
            return {
                active : this.value
            }
        },

        computed:{
            endpoint(){
                return `/artists/${this.artistId}/published`
            },
        },
        methods:{
            toggle(){
                let action = this.active ? 'delete' : 'put';

                axios[action](this.endpoint)
                    .then((response) => {

                        this.active = !this.active

                        this.$message({
                            message: this.active ? this.$i18n.t("Votre profil est publié") : this.$i18n.t("Votre profil est dépublié"),
                            type: 'success',
                            customClass: 'message-success'
                        })

                        this.$store.dispatch('auth/setProfileProp', {
                            prop : 'published',
                            value : this.active
                        });

                        this.$emit('update', {
                            prop : 'published',
                            value : this.active
                        });
                    })
                    .catch((error) => {
                        console.dir(error);
                        this.$message({
                            type : 'error',
                            message : error.response.data.message,
                            duration : 1500
                        });
                    })
            },
        },

    }
</script>
